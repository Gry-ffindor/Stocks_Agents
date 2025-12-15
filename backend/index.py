import sys
import os

# Add the parent directory to sys.path so we can import from backend and agent
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from backend.main import app

# This is required for Vercel to find the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
