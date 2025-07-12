

// import { FEEDBACK_PROMPT } from "@/services/Constant";
// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         // Parse the request body
//         const { conversation } = await req.json();

//         // Construct the prompt
//         const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

//         // Initialize OpenAI client
//         const openai = new OpenAI({
//             baseURL: "https://openrouter.ai/api/v1",
//             apiKey: process.env.OPENROUTER_API_KEY,
//         });

//         // Generate feedback from OpenAI
//         const completion = await openai.chat.completions.create({
//             model: "qwen/qwen3-30b-a3b:free",

//             messages: [{ role: "user", content: FINAL_PROMPT }],
//             max_tokens: 1020 // Or another reasonable number

//         });

//         // Extract the response message
//         const feedback = completion.choices[0]?.message?.content;
//         console.log("Generated Feedback:", feedback);

//         // Return the feedback as a JSON response
//         return NextResponse.json({ success: true, feedback });
//     } catch (error) {
//         console.error("Error generating feedback:", error);
//         return NextResponse.json({ success: false, message: "Failed to generate feedback." });
//     }
// }



// import { FEEDBACK_PROMPT } from "@/services/Constant";
// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         const { conversation } = await req.json();

//         // Format conversation if it's an array of messages
//         const formattedConversation = Array.isArray(conversation)
//             ? conversation.map(line => `${line.speaker}: ${line.text}`).join("\n")
//             : conversation;

//         const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', formattedConversation);

//         const openai = new OpenAI({
//             baseURL: "https://openrouter.ai/api/v1",
//             apiKey: process.env.OPENROUTER_API_KEY,
//         });

//         const completion = await openai.chat.completions.create({
//             model: "meta-llama/llama-4-maverick-17b-128e-instruct:free",
//             messages: [{ role: "user", content: FINAL_PROMPT }],
//             max_tokens: 1024,
//         });

//         let rawFeedback = completion.choices[0]?.message?.content;
//         console.log("🟢 Raw Feedback:", rawFeedback);

//         // --- Clean common model formatting mistakes ---
//         let cleaned = rawFeedback.trim();

//         // Remove markdown-style code blocks
//         if (cleaned.startsWith("```")) {
//             cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
//         }

//         // Try to find first valid JSON object inside
//         const firstCurly = cleaned.indexOf("{");
//         if (firstCurly > 0) {
//             cleaned = cleaned.slice(firstCurly);
//         }

//         // Fix unquoted keys or missing colons
//         cleaned = cleaned.replace(/"feedback"\s*{/, '"feedback": {');

//         let parsedFeedback;
//         try {
//             parsedFeedback = JSON.parse(cleaned);
//         } catch (err) {
//             console.warn("⚠️ Invalid JSON from model:", err);
//             return NextResponse.json({
//                 success: false,
//                 message: "AI did not return valid JSON.",
//                 raw: rawFeedback,
//             });
//         }

//         return NextResponse.json({
//             success: true,
//             feedback: parsedFeedback?.feedback || parsedFeedback,
//         });

//     } catch (error) {
//         console.error("❌ Error generating feedback:", error);
//         return NextResponse.json({ success: false, message: "Failed to generate feedback." });
//     }
// }


import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { conversation } = await req.json();

        // Guard clause: check if conversation exists and is non-empty
        if (!conversation || (Array.isArray(conversation) && conversation.length === 0)) {
            return NextResponse.json({
                success: false,
                message: "Conversation is missing or empty.",
            });
        }

        // Format conversation as text
        const formattedConversation = Array.isArray(conversation)
            ? conversation.map(line => `${line.speaker}: ${line.text}`).join("\n")
            : conversation;

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-4-maverick-17b-128e-instruct:free",
            messages: [
                {
                    role: "system",
                    content: `You are a visa interview AI evaluator. Respond ONLY with a JSON object matching this exact schema:
{
  "feedback": {
    "rating": {
      "technicalSkills": 7,
      "communication": 8,
      "problemSolving": 6,
      "experience": 9
    },
    "summery": "Three-line summary here.",
    "Recommendation": "Recommended for visa approval",
    "RecommendationMsg": "One-line justification here."
  }
}`,
                },
                {
                    role: "user",
                    content: `Evaluate the following conversation:\n\n${formattedConversation}`,
                },
            ],
            max_tokens: 1024,
        });

        let rawFeedback = completion.choices[0]?.message?.content || "";
        console.log("🟢 Raw Feedback:", rawFeedback);

        // --- Cleaning ---

        let cleaned = rawFeedback.trim();

        // Remove ```json and trailing ```
        if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
        }

        // Try extracting first JSON object
        const firstCurly = cleaned.indexOf("{");
        if (firstCurly > 0) cleaned = cleaned.slice(firstCurly);

        // Soft fix for malformed "feedback" block
        cleaned = cleaned.replace(/"feedback"\s*{/, '"feedback": {');

        let parsedFeedback;
        try {
            parsedFeedback = JSON.parse(cleaned);
        } catch (err) {
            console.warn("⚠️ Invalid JSON from model:", err);
            return NextResponse.json({
                success: false,
                message: "AI did not return valid JSON.",
                raw: rawFeedback,
            });
        }

        return NextResponse.json({
            success: true,
            feedback: parsedFeedback.feedback || parsedFeedback,
        });

    } catch (error) {
        console.error("❌ Error generating feedback:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to generate feedback.",
        });
    }
}
