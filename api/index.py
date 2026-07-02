import sys
import os

# Resolve the backend directory robustly for both local dev and Vercel serverless
_here = os.path.dirname(os.path.abspath(__file__))
_backend = os.path.join(_here, "..", "backend")
_backend = os.path.normpath(_backend)

if _backend not in sys.path:
    sys.path.insert(0, _backend)

from app.main import app  # noqa: E402 (type: ignore)
