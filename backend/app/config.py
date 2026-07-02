import os
from dotenv import load_dotenv

# Load .env from the repo root when running locally.
# On Vercel/production, the env vars are set in the dashboard and this is a no-op.
try:
    root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    dotenv_path = os.path.join(root_dir, '.env')
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path, override=False)
except Exception:
    pass  # Silently ignore in production/serverless environments

APP_ENV = os.getenv("APP_ENV", "production")
API_BASE_URL = os.getenv("VITE_API_BASE_URL", "")

