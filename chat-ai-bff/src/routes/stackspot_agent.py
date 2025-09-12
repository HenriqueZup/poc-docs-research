import json
from flask import Blueprint, request, jsonify, Response, stream_with_context
from flask_cors import cross_origin
import requests
from .stackspot_service import stackspot_service

stackspot_bp = Blueprint('stackspot', __name__)

@stackspot_bp.route('/chat', methods=['POST', 'OPTIONS'])
@cross_origin()
def chat_with_agent():
    """
    Endpoint para comunicação com o agente StackSpot
    """
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Mensagem é obrigatória'}), 400
        
        user_message = data['message']
        streaming = data.get('streaming', False)
        
        # Usar o serviço de autenticação
        response = stackspot_service.chat_with_agent(user_message, streaming)
        
        if streaming:
            # Para streaming, retornar Server-Sent Events
            def generate():
                try:
                    if response.status_code != 200:
                        yield f"data: {json.dumps({'error': f'Erro na API: {response.status_code}', 'details': response.text})}\n\n"
                        return
                    
                    for line in response.iter_lines(decode_unicode=True):
                        if line:
                            # StackSpot já retorna no formato SSE
                            if line.startswith('data: '):
                                yield f"{line}\n\n"
                            else:
                                yield f"data: {line}\n\n"
                                
                except requests.exceptions.RequestException as e:
                    yield f"data: {json.dumps({'error': f'Erro de conexão: {str(e)}'})}\n\n"
                except Exception as e:
                    yield f"data: {json.dumps({'error': f'Erro interno: {str(e)}'})}\n\n"
            
            return Response(
                stream_with_context(generate()),
                mimetype='text/event-stream',
                headers={
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                }
            )
        else:
            # Para requisições não-streaming, retornar JSON
            if response.status_code == 200:
                return jsonify(response.json())
            else:
                return jsonify({
                    'error': f'Erro na API do StackSpot: {response.status_code}',
                    'details': response.text
                }), response.status_code
                
    except requests.exceptions.RequestException as e:
        return jsonify({
            'error': 'Erro de conexão com o StackSpot',
            'details': str(e)
        }), 500
    except Exception as e:
        return jsonify({
            'error': 'Erro interno do servidor',
            'details': str(e)
        }), 500

@stackspot_bp.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    """
    Endpoint para verificar a saúde do serviço
    """
    try:
        health_status = stackspot_service.health_check()
        status_code = 200 if health_status['status'] == 'healthy' else 500
        return jsonify(health_status), status_code
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

@stackspot_bp.route('/auth/refresh', methods=['POST'])
@cross_origin()
def refresh_token():
    """
    Endpoint para forçar renovação do token (útil para debug)
    """
    try:
        # Limpar cache do token
        stackspot_service._access_token = None
        stackspot_service._token_expires_at = None
        
        # Obter novo token
        token = stackspot_service.get_access_token()
        
        return jsonify({
            'message': 'Token renovado com sucesso',
            'token_valid': stackspot_service._is_token_valid()
        })
    except Exception as e:
        return jsonify({
            'error': 'Erro ao renovar token',
            'details': str(e)
        }), 500