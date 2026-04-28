import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
    try {
        const { title, prompt } = await req.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.groq.com/openai/v1',
        });

        const systemPrompt = `You are a professional portfolio writer. Generate a project description based on the title provided.
Return the result in JSON format with exactly two fields:
1. "description": A compelling 3-4 sentence description of the project, highlighting its impact and technologies.
2. "tags": An array of 4-6 relevant technology tags (e.g., ["Next.js", "Tailwind CSS", "TypeScript"]).
Ensure the tone is professional, innovative, and concise.`;

        const response = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Project Title: ${title}\nContext: ${prompt || 'A high-quality web application.'}` }
            ],
            response_format: { type: 'json_object' }
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('No content returned from AI');

        const result = JSON.parse(content);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Project Gen Error:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
