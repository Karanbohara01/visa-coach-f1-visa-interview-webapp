// export async function POST(req) {
//     try {
//         const { prompt } = await req.json();

//         const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                 'Content-Type': 'application/json',
//                 'HTTP-Referer': 'http://localhost:3000', // change this to your domain in production
//                 'X-Title': 'University Chatbot',
//             },
//             body: JSON.stringify({
//                 // model: 'openai/gpt-4o-mini',
//                 model: 'meta-llama/llama-3.3-70b-instruct',
//                 messages: [{ role: 'user', content: prompt }],
//                 max_tokens: 1000,
//             }),
//         });

//         const data = await res.json();

//         if (!data.choices || !data.choices[0]?.message?.content) {
//             throw new Error('Invalid response from OpenRouter');
//         }

//         return Response.json({ response: data.choices[0].message.content });
//     } catch (error) {
//         console.error('Chatbot error:', error);
//         return Response.json({ response: 'Sorry, something went wrong.' }, { status: 500 });
//     }
// }


// /app/api/chat/route.js or route.ts

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Visa Interview Chat',
            },
            body: JSON.stringify({
                model: 'qwen/qwen3-30b-a3b:free',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a helpful AI visa interviewer. Ask realistic US visa interview questions. After the user replies, provide concise feedback.\n\nFormat your response like:\nQuestion: ...\nFeedback: ...',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 1000,
            }),
        });

        const data = await res.json();
        const fullText = data?.choices?.[0]?.message?.content || '';

        const questionMatch = fullText.match(/Question:(.*?)(Feedback:|$)/is);
        const feedbackMatch = fullText.match(/Feedback:(.*)/is);

        return Response.json({
            response: {
                question: questionMatch?.[1]?.trim() || '',
                feedback: feedbackMatch?.[1]?.trim() || '',
            },
        });
    } catch (error) {
        console.error('VisaCoach API error:', error);
        return Response.json(
            { response: { question: '', feedback: 'Sorry, something went wrong.' } },
            { status: 500 }
        );
    }
}
