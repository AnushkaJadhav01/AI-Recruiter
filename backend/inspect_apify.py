import os
from dotenv import load_dotenv
from apify_client import ApifyClient
import json

load_dotenv()
api_token = os.getenv("APIFY_API_TOKEN")
client = ApifyClient(api_token)

runs = client.actor("apimaestro/linkedin-profile-detail").runs().list(limit=1)
if runs.items:
    last_run = runs.items[0]
    dataset_id = last_run["defaultDatasetId"]
    items = list(client.dataset(dataset_id).iterate_items())
    if items:
        print("KEYS IN ITEM 0:")
        print(list(items[0].keys()))
        print("\nFIRST ITEM PREVIEW:")
        print(json.dumps(items[0], indent=2, default=str)[:3000])
    else:
        print("Dataset is empty.")
else:
    print("No runs found.")
