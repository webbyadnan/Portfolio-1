import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
    try {
        const { message, type, model } = await req.json();

        const apiKey = model === 'groq'
            ? process.env.GROQ_API_KEY
            : process.env.DEEPSEEK_API_KEY;

        const baseURL = model === 'groq'
            ? 'https://api.groq.com/openai/v1'
            : 'https://api.deepseek.com';

        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: baseURL,
        });

        const systemPrompts: Record<string, string> = {
            qa: "You are the AI Assistant for Adnan Khan's Portfolio. Answer questions about his skills (Next.js, React, Tailwind) and projects accurately and professionally.",
            roaster: "You are a witty, slightly sarcastic Senior Developer. Roast the following project idea or code snippet, but provide 3 solid tips for improvement at the end. Keep it fun and technical.",
            generator: "You are an expert Frontend Engineer. When given a UI component description, output ONLY the React + Tailwind CSS code. No explanations.",
            fixer: "You are a Debugging Expert. Analyze the error provided and give a 1-sentence explanation of why it happened, followed by the corrected code block."
        };

        const response = await client.chat.completions.create({
            model: model === 'groq' ? 'llama-3.3-70b-versatile' : 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompts[type] || systemPrompts.qa },
                { role: 'user', content: message }
            ],
            temperature: 0.7,
        });

        return NextResponse.json({
            content: response.choices[0].message.content
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('AI Lab Error:', error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
