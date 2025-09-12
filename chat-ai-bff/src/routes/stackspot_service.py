import os
import requests
# import json
# import time
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

class StackSpotAuthService:
    """
    Serviço para gerenciar autenticação e comunicação com a API StackSpot
    """
    
    def __init__(self):
        self.client_id = os.getenv('STACKSPOT_CLIENT_ID')
        self.client_secret = os.getenv('STACKSPOT_CLIENT_SECRET')
        self.auth_url = os.getenv('STACKSPOT_AUTH_URL', 'https://idm.stackspot.com/stackspot/oidc/oauth/token')
        self.api_url = os.getenv('STACKSPOT_API_URL', 'https://genai-inference-app.stackspot.com')
        self.agent_id = os.getenv('STACKSPOT_AGENT_ID')
        
        # Cache do token
        self._access_token: Optional[str] = None
        self._token_expires_at: Optional[datetime] = None
        
        # Validar credenciais
        if not all([self.client_id, self.client_secret, self.agent_id]):
            raise ValueError("Credenciais StackSpot não configuradas adequadamente")
    
    def _is_token_valid(self) -> bool:
        """Verifica se o token atual ainda é válido"""
        if not self._access_token or not self._token_expires_at:
            return False
        
        # Adiciona margem de 5 minutos antes da expiração
        return datetime.now() < (self._token_expires_at - timedelta(minutes=5))
    
    def _authenticate(self) -> str:
        """
        Obtém um novo token de acesso usando OAuth2 Client Credentials
        """
        payload = {
            'client_id': self.client_id,
            'grant_type': 'client_credentials',
            'client_secret': self.client_secret
        }
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        try:
            response = requests.post(
                self.auth_url,
                headers=headers,
                data=payload,
                timeout=10
            )
            
            response.raise_for_status()
            
            token_data = response.json()
            
            # Extrair token e tempo de expiração
            access_token = token_data.get('access_token')
            expires_in = token_data.get('expires_in', 3600)  # Default 1 hora
            
            if not access_token:
                raise ValueError("Token de acesso não encontrado na resposta")
            
            # Atualizar cache
            self._access_token = access_token
            self._token_expires_at = datetime.now() + timedelta(seconds=expires_in)
            
            return access_token
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Erro na autenticação StackSpot: {str(e)}")
        except (KeyError, ValueError) as e:
            raise Exception(f"Erro ao processar resposta de autenticação: {str(e)}")
    
    def get_access_token(self) -> str:
        """
        Obtém um token de acesso válido (reutiliza se ainda válido)
        """
        if not self._is_token_valid():
            return self._authenticate()
        
        return self._access_token
    
    def chat_with_agent(self, user_message: str, streaming: bool = False) -> requests.Response:
        """
        Envia mensagem para o agente StackSpot
        """
        token = self.get_access_token()
        
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'streaming': streaming,
            'user_prompt': user_message,
            'stackspot_knowledge': True,
            'return_ks_in_response': False
        }
        
        agent_url = f"{self.api_url}/v1/agent/{self.agent_id}/chat"
        
        return requests.post(
            agent_url,
            headers=headers,
            json=payload,
            stream=streaming,
            timeout=30 if not streaming else 60
        )
    
    def health_check(self) -> Dict[str, Any]:
        """
        Verifica a saúde do serviço e conectividade
        """
        try:
            # Tenta obter token
            token = self.get_access_token()
            return {
                'status': 'healthy',
                'authenticated': True,
                'token_valid': self._is_token_valid(),
                'agent_id': self.agent_id
            }
        except Exception as e:
            return {
                'status': 'unhealthy',
                'authenticated': False,
                'error': str(e)
            }

# Instância global do serviço
stackspot_service = StackSpotAuthService()