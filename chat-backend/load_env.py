import os
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

def verify_environment():
    """Verify all required environment variables are set"""
    required_vars = [
        'STACKSPOT_CLIENT_ID',
        'STACKSPOT_CLIENT_SECRET', 
        'STACKSPOT_AGENT_ID'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.error(f"Missing environment variables: {missing_vars}")
        return False
    
    logger.info("All required environment variables are set")
    return True

if __name__ == "__main__":
    verify_environment()