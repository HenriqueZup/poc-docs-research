# StackSpot Chat API

API Flask para autenticação e envio de prompts para um agente AI especializado em StackSpot (Docs Journey Helper). Permite integração via HTTP e inclui uma interface web simples para testes.

## Funcionalidades

- Autenticação segura via OAuth2 Client Credentials com StackSpot.
- Endpoint `/api/chat` para envio de mensagens ao agente AI.
- Endpoint `/api/health` para verificação de saúde da API e autenticação.
- Interface web para testes rápidos.
- Suporte a CORS.

## Pré-requisitos

- Python 3.9+ instalado
- Conta e credenciais válidas na StackSpot (Client ID, Client Secret, Agent ID)
- (Opcional) Docker, para deploy em container

## Instalação e Execução Local

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```

2. **Crie um ambiente virtual:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (preencha com suas credenciais):

   ```
   STACKSPOT_CLIENT_ID=seu_client_id
   STACKSPOT_CLIENT_SECRET=seu_client_secret
   STACKSPOT_AGENT_ID=seu_agent_id
   STACKSPOT_AUTH_URL=https://idm.stackspot.com/stackspot/oidc/oauth/token
   STACKSPOT_API_URL=https://genai-inference-app.stackspot.com
   SECRET_KEY=uma_senha_secreta
   ```

5. **Inicie a aplicação:**


```bash
python src/main.py
# ou
python -m src.main
```

6. **Acesse a interface web:**

   - Abra [http://localhost:5000](http://localhost:5000) no navegador.

## Endpoints

- `POST /api/chat`  

  Corpo: `{ "user_prompt": "sua mensagem" }`  
  Resposta: `{ "message": "resposta do agente" }`

- `GET /api/health`  

  Verifica a saúde da API e autenticação.

## Deploy

O backend Flask pode ser deployado em:
- Heroku
- AWS EC2/Lambda
- Google Cloud Run
- DigitalOcean

## Observações de Segurança

- **NUNCA** exponha suas credenciais (Client Secret, Client ID, Agent ID) em repositórios públicos.
- Use variáveis de ambiente para todas as informações sensíveis.
- Em produção, utilize HTTPS e configure um proxy reverso.
- Altere o valor padrão de `SECRET_KEY` para um valor forte e secreto.
- Restrinja o CORS (`flask_cors.CORS`) para domínios confiáveis em produção.
- Monitore e limite o acesso aos endpoints sensíveis.


## Dicas

- Para logs detalhados, ajuste o nível de debug conforme necessário.
- Consulte a [documentação oficial da StackSpot](https://docs.stackspot.com/) para detalhes sobre autenticação e uso do agente.
