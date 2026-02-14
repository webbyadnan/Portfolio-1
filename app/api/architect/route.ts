import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client with DeepSeek configuration
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const systemPrompt = `You are an expert Senior System Architect and CTO. 
    Your goal is to take a simple app idea from the user and generate a comprehensive technical proposal.
    
    Structure your response in Markdown offering the following sections:
    1. **Executive Summary**: A brief high-level overview of the system.
    2. **Tech Stack Recommendation**: Frontend, Backend, Database, Infrastructure. Explain WHY you chose each.
    3. **Key Features & MVP Scope**: What to build first.
    4. **Database Schema**: A high-level ERD description or table structure.
    5. **Potential Challenges**: Scalability, Security, etc.
    
    Style: Professional, Technical, yet easy to understand. Use "I" to speak as the architect.
    Tone: "Neo-Brutalist" - direct, efficient, no fluff.
    `;

        const response = await client.chat.completions.create({
            model: 'deepseek-reasoner', // Using R1 for reasoning capabilities
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            stream: true,
        });

        // Create a ReadableStream from the OpenAI stream
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(new TextEncoder().encode(content));
                    }
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('Error in AI Architect API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
