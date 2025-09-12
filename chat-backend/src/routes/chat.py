from flask import Blueprint, request, jsonify
from src.services.stackspot_auth import stackspot_service
import traceback

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    """
    Chat endpoint that receives user messages and forwards them to StackSpot agent
    Expected request body:
    {
      "user_prompt": "string with user message and conversation context"
    }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'JSON body is required'}), 400

        user_prompt = data.get('user_prompt')
        if not user_prompt or not isinstance(user_prompt, str):
            return jsonify({'error': 'user_prompt (string) is required'}), 400
        if not user_prompt.strip():
            return jsonify({'error': 'user_prompt cannot be empty'}), 400

        # Prepare payload according to StackSpot API specification
        agent_payload = {
            "streaming": False,
            "user_prompt": user_prompt,
            "stackspot_knowledge": True,
            "return_ks_in_response": False
        }

        # Send request to StackSpot agent
        try:
            response = stackspot_service.chat_with_agent(agent_payload)
        except Exception as agent_exc:
            # Log detalhado da resposta do agente
            print("Erro na comunicação com o agente:", agent_exc)
            return jsonify({'error': 'Erro na comunicação com o agente', 'message': str(agent_exc)}), 502

        # Retorne apenas o campo 'message'
        if isinstance(response, dict) and "message" in response:
            return jsonify({"message": response["message"]})
        else:
            print("Resposta inesperada do agente:", response)
            return jsonify({'error': 'Invalid response from agent'}), 502

    except ValueError as e:
        return jsonify({'error': f'Validation error: {str(e)}'}), 400
    except Exception as e:
        print("Erro no chat:", traceback.format_exc())
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500