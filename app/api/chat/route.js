export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000', // change this to your domain in production
                'X-Title': 'University Chatbot',
            },
            body: JSON.stringify({
                // model: 'openai/gpt-4o-mini',
                model: 'meta-llama/llama-3.3-70b-instruct',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1000,
            }),
        });

        const data = await res.json();

        if (!data.choices || !data.choices[0]?.message?.content) {
            throw new Error('Invalid response from OpenRouter');
        }

        return Response.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Chatbot error:', error);
        return Response.json({ response: 'Sorry, something went wrong.' }, { status: 500 });
    }
}
