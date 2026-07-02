from fastapi import APIRouter, HTTPException
import os
from pydantic import BaseModel
import random
from apify_client import ApifyClient

router = APIRouter()

class SyncRequest(BaseModel):
    url: str

@router.post("/sync")
def sync_linkedin_profile(request: SyncRequest):
    url = request.url.strip()
    
    api_token = os.getenv("APIFY_API_TOKEN")
    
    if not api_token:
        raise HTTPException(status_code=500, detail="APIFY_API_TOKEN is not configured")

    client = ApifyClient(api_token)
    
    # Changed default to apimaestro/linkedin-profile-detail
    actor_id = os.getenv("APIFY_ACTOR_ID", "apimaestro/linkedin-profile-detail")
    
    # Extract username from URL for apimaestro actor
    # Examples:
    # https://www.linkedin.com/in/williamhgates -> williamhgates
    # williamhgates -> williamhgates
    username = url.rstrip('/').split('/in/')[-1].split('/')[0] if '/in/' in url else url.rstrip('/').split('/')[-1]
    
    run_input = {
        "urls": [url],
        "profileUrls": [url],
        "linkedinUrls": [url],
        "url": url,
        "usernames": [username], # some actors use plural
        "username": username     # apimaestro/linkedin-profile-detail uses singular
    }
    
    try:
        run = client.actor(actor_id).call(run_input=run_input)
        items = list(client.dataset(run["defaultDatasetId"]).iterate_items())
        
        if not items:
            raise HTTPException(status_code=404, detail="No profile data found in Apify dataset.")
            
        data = items[0]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch LinkedIn profile via Apify: {str(e)}")

    basic_info = data.get("basic_info", {})
    
    name = basic_info.get("fullname") or data.get("fullName") or data.get("full_name") or f"{data.get('firstName', '')} {data.get('lastName', '')}".strip()
    if not name:
        name = "Unknown User"
        
    summary = basic_info.get("about") or basic_info.get("headline") or data.get("summary") or data.get("headline") or "No summary provided."
    
    careerHistory = []
    experiences = data.get("experience") or data.get("experiences") or data.get("positions") or []
    for exp in experiences:
        duration = exp.get("duration")
        if not duration:
            # Fallback if duration string isn't provided directly
            start = exp.get("starts_at") or exp.get("start") or exp.get("startDate") or {}
            end = exp.get("ends_at") or exp.get("end") or exp.get("endDate") or {}
            
            if isinstance(start, dict):
                start_year = str(start.get("year", ""))
            else:
                start_year = str(start)[:4] if start else ""
                
            if isinstance(end, dict):
                end_year = str(end.get("year", ""))
            else:
                end_year = str(end)[:4] if end else "Present"
                
            duration_parts = []
            if start_year: duration_parts.append(start_year)
            if end_year: duration_parts.append(end_year)
            duration = " - ".join(duration_parts) if duration_parts else "Present"
            
        careerHistory.append({
            "role": exp.get("title") or exp.get("position") or "Unknown Role",
            "company": exp.get("companyName") or exp.get("company") or "Unknown Company",
            "duration": duration,
            "description": exp.get("description") or ""
        })
        
    endorsements = []
    # apimaestro profile detail sometimes returns skills in basic_info.top_skills or in certifications
    raw_skills = data.get("skills") or basic_info.get("top_skills") or []
    for skill_obj in raw_skills[:10]:
        skill_name = skill_obj.get("name") if isinstance(skill_obj, dict) else str(skill_obj)
        if skill_name:
            # Endorsements count isn't natively returned by this scraper, defaulting to 1 instead of random data
            endorsements.append({
                "skill": skill_name,
                "count": 1,
                "verified": True
            })
    
    # Calculate a real score based on profile completeness instead of random data
    score_factors = 50
    if careerHistory: score_factors += 25
    if endorsements: score_factors += 25
    
    return {
        "name": name,
        "score": score_factors, 
        "summary": summary,
        "growthRate": "Steady upward movement",
        "careerHistory": careerHistory,
        "endorsements": endorsements
    }
