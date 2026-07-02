from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import os
import json
import PyPDF2
from io import BytesIO
import google.generativeai as genai

router = APIRouter()

@router.post("/optimize")
async def optimize_resume(
    file: UploadFile = File(...),
    job_description: str = Form(default="")
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported.")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured in .env file")

    genai.configure(api_key=api_key)

    try:
        # Extract text from PDF
        content = await file.read()
        pdf_reader = PyPDF2.PdfReader(BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF. It might be scanned or empty.")

        # Initialize Gemini Model
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""
You are an expert AI Technical Recruiter and ATS (Applicant Tracking System) optimizer.
Your task is to analyze the provided Resume against the provided Target Job Description (if any) and return a strict JSON response.

Target Job Description:
{job_description if job_description else "None provided. Just analyze the resume generally for standard software engineering/tech roles."}

Resume Text:
{text}

Respond ONLY with a valid JSON object (no markdown, no backticks, no code blocks) matching exactly this schema:
{{
  "atsScore": number (0-100),
  "recommendations": [
    {{
      "type": "warning" or "success",
      "category": string (e.g. "Keywords", "Formatting", "Content"),
      "text": string
    }}
  ],
  "highlights": {{
    "experience": string (e.g. "5 Years Total"),
    "education": string (e.g. "B.S. Computer Science"),
    "skills": string (e.g. "React, Node, Python"),
    "contact": string (e.g. "john@email.com")
  }}
}}

Make sure to give at least 4 actionable recommendations.
"""

        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up possible markdown wrappers from LLM
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]

        parsed_data = json.loads(response_text.strip())
        
        # Validate minimal structure
        if "atsScore" not in parsed_data or "recommendations" not in parsed_data:
            raise ValueError("LLM returned malformed JSON")

        return parsed_data

    except json.JSONDecodeError as e:
        print("Failed to parse JSON from Gemini:", response.text)
        raise HTTPException(status_code=500, detail="Failed to parse AI response. Please try again.")
    except Exception as e:
        print("Error during optimization:", str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
