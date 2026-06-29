import os
from dotenv import load_dotenv

load_dotenv()

APP_ENV = os.getenv("APP_ENV", "development")
API_BASE_URL = os.getenv("VITE_API_BASE_URL", "http://localhost:8000")
