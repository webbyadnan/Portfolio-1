import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
    try {
        const { title, prompt } = await req.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'AI API key not configured' }, { status: 500 });
        }

        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.groq.com/openai/v1',
        });

        const systemPrompt = `You are a professional tech blogger. Generate a blog post based on the title provided.
Return the result in JSON format with exactly two fields:
1. "excerpt": A 2-sentence engaging summary of the post.
2. "content": The full blog post content in high-quality Markdown format. Use headings, lists, and code blocks if appropriate.
Ensure the tone is professional, engaging, and insightful.`;

        const response = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Title: ${title}\nAdditional context: ${prompt || 'Write a comprehensive guide.'}` }
            ],
            response_format: { type: 'json_object' }
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error('No content returned from AI');
        }

        const result = JSON.parse(content);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Blog Gen Error:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
