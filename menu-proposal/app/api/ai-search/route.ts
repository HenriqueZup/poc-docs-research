import { NextResponse } from 'next/server';

// Garante que a rota seja executada no Edge Runtime para melhor performance
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // 1. Validar e extrair o corpo da requisição
    const { query } = (await req.json()) as { query?: string };

    if (!query) {
      return NextResponse.json(
        { error: 'A consulta (query) é obrigatória.' },
        { status: 400 },
      );
    }

    // 2. Acessar credenciais da API de forma segura a partir de variáveis de ambiente
    const apiKey = process.env.AI_MODEL_API_KEY;
    const apiEndpoint = process.env.AI_MODEL_ENDPOINT_URL;
    //const systemPrompt = process.env.AI_MODEL_SYSTEM_PROMPT || 'Você é um assistente prestativo.';

    if (!apiKey ||!apiEndpoint) {
      return NextResponse.json(
        { error: 'Credenciais da API do modelo de IA não configuradas no servidor.' },
        { status: 500 },
      );
    }

    // 3. Construir o payload para a API do modelo de IA
    // Nota: A estrutura do payload pode variar dependendo do seu provedor de modelo (OpenAI, Anthropic, Google, etc.)
    // Este é um exemplo genérico.
    const payload = {
      model: 'your-model-name', // Substitua pelo nome do seu modelo
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      // Opções adicionais como temperature, max_tokens, etc.
      // stream: false // Para a versão avançada com streaming, isso seria 'true'
    };

    // 4. Realizar a chamada para a API externa usando fetch
    const aiResponse = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!aiResponse.ok) {
      const errorBody = await aiResponse.text();
      console.error('Erro na API de IA:', errorBody);
      return NextResponse.json(
        { error: `Falha na comunicação com a API de IA: ${aiResponse.statusText}` },
        { status: aiResponse.status },
      );
    }

    // 5. Processar a resposta e retorná-la ao cliente
    const data = await aiResponse.json();

    // Extraia o conteúdo relevante da resposta. Isso varia muito entre os provedores.
    // Exemplo para a API da OpenAI:
    const messageContent = data.choices?.message?.content;

    return NextResponse.json({ result: messageContent });

  } catch (error) {
    console.error('Erro no endpoint /api/ai-search:', error);
    return NextResponse.json(
      { error: 'Um erro interno ocorreu no servidor.' },
      { status: 500 },
    );
  }
}
