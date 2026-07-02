import os
from dotenv import load_dotenv

# Path to the root .env file (d:\Indiahacks\AI-Recruiter\.env)
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(root_dir, '.env')

load_dotenv(dotenv_path)

APP_ENV = os.getenv("APP_ENV", "development")
API_BASE_URL = os.getenv("VITE_API_BASE_URL", "http://localhost:8000")
