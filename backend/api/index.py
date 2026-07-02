import sys
import os

# Add parent directory of 'api' (which is 'backend') to Python path so that 'app' module can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app  # type: ignore
