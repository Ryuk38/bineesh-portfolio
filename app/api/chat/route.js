import { NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export async function POST(request) {
  try {
    const { message, context } = await request.json();
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (!cleanMessage) {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Chatbot is not configured yet. Add GEMINI_API_KEY to .env.local.' },
        { status: 503 },
      );
    }

    const configuredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const model = configuredModel.replace(/^models\//, '');
    const systemInstruction = `You are Nova, the portfolio assistant for Bineesh Mathew. Answer only using the portfolio context below. Be concise, friendly, professional, and honest when information is missing. Encourage visitors to use the contact section for collaboration questions.\n\nPortfolio context:\n${JSON.stringify(context || {})}`;

    const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: cleanMessage.slice(0, 1200) }] }],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 450,
        },
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      const providerMessage = payload.error?.message || 'The assistant could not respond right now.';
      console.error(`Gemini chat error (${response.status}, ${model}):`, providerMessage);
      return NextResponse.json({ error: 'Gemini rejected the request. Check the model name, API key, and enabled Generative Language API.' }, { status: 502 });
    }

    const reply = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) {
      return NextResponse.json({ error: 'The assistant returned an empty response.' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json({ error: 'Something went wrong while contacting the assistant.' }, { status: 500 });
  }
}
