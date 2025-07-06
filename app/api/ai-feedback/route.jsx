

import { FEEDBACK_PROMPT } from "@/services/Constant";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body
        const { conversation } = await req.json();

        // Construct the prompt
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

        // Initialize OpenAI client
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        // Generate feedback from OpenAI
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.3-70b-instruct",

            messages: [{ role: "user", content: FINAL_PROMPT }],
            max_tokens: 1020 // Or another reasonable number

        });

        // Extract the response message
        const feedback = completion.choices[0]?.message?.content;
        console.log("Generated Feedback:", feedback);

        // Return the feedback as a JSON response
        return NextResponse.json({ success: true, feedback });
    } catch (error) {
        console.error("Error generating feedback:", error);
        return NextResponse.json({ success: false, message: "Failed to generate feedback." });
    }
}
