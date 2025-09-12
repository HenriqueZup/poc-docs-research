import os
import requests
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

class StackSpotAuthService:
    def __init__(self):
        self.client_id = os.getenv('STACKSPOT_CLIENT_ID')
        self.client_secret = os.getenv('STACKSPOT_CLIENT_SECRET')
        self.auth_url = os.getenv('STACKSPOT_AUTH_URL', 'https://idm.stackspot.com/stackspot/oidc/oauth/token')
        self.api_url = os.getenv('STACKSPOT_API_URL', 'https://genai-inference-app.stackspot.com')
        self.agent_id = os.getenv('STACKSPOT_AGENT_ID')
        self._access_token: Optional[str] = None
        self._token_expires_at: Optional[datetime] = None

        if not all([self.client_id, self.client_secret, self.agent_id]):
            raise ValueError("Credenciais StackSpot não configuradas adequadamente")
    
    def _is_token_valid(self) -> bool:
        """Check if the current token is still valid"""
        if not self._access_token or not self._token_expires_at:
            return False
        return datetime.now() < (self._token_expires_at - timedelta(minutes=5))
    
    def _authenticate(self) -> str:
        """Authenticate with StackSpot and get access token"""
        payload = {
            'client_id': self.client_id,
            'grant_type': 'client_credentials',
            'client_secret': self.client_secret
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        
        try:
            response = requests.post(
                self.auth_url,
                headers=headers,
                data=payload,
                timeout=10
            )
            response.raise_for_status()
            
            token_data = response.json()
            access_token = token_data.get('access_token')
            expires_in = token_data.get('expires_in', 3600)
            
            if not access_token:
                raise ValueError("Token de acesso não encontrado na resposta")
            
            self._access_token = access_token
            self._token_expires_at = datetime.now() + timedelta(seconds=expires_in)
            
            return access_token
        except requests.exceptions.RequestException as e:
            raise Exception(f"Erro na autenticação: {str(e)}")

    def get_access_token(self) -> str:
        """Get a valid access token, refreshing if necessary"""
        if not self._is_token_valid():
            return self._authenticate()
        return self._access_token

    def chat_with_agent(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Send a chat request to the StackSpot agent

        Args:
            payload: Dictionary containing the request payload with required fields:
                - streaming: bool
                - user_prompt: str
                - stackspot_knowledge: bool
                - return_ks_in_response: bool

        Returns:
            Dictionary with the agent's response
        """
        token = self.get_access_token()
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        agent_url = f"{self.api_url}/v1/agent/{self.agent_id}/chat"

        try:
            response = requests.post(
                agent_url,
                headers=headers,
                json=payload,
                timeout=30,
            )
            print("Status code:", response.status_code)
            print("Response text:", response.text)

            if response.status_code != 200:
                raise Exception(f"Erro na comunicação com o agente: {response.status_code} - {response.text}")

            try:
                return response.json()
            except ValueError:
                raise Exception(f"Erro na comunicação com o agente: {response.text}")

        except requests.exceptions.RequestException as e:
            raise Exception(f"Erro na comunicação com o agente: {str(e)}")
    
    def health_check(self) -> Dict[str, Any]:
        """Check the health of the StackSpot service"""
        try:
            token = self.get_access_token()
            return {
                'status': 'healthy', 
                'authenticated': True, 
                'agent_id': self.agent_id,
                'token_valid': bool(token)
            }
        except Exception as e:
            return {
                'status': 'unhealthy', 
                'authenticated': False,
                'error': str(e)
            }

# Global instance
stackspot_service = StackSpotAuthService()