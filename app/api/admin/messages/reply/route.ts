import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { to, subject, message } = await req.json();

        if (!to || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Adnan Khan <onboarding@resend.dev>', // Default Resend test address
            to: [to],
            subject: `Re: ${subject}`,
            text: message,
            replyTo: 'adnanxdev@gmail.com' // Ensure the user can reply back to you
        });

        if (error) {
            console.error('Resend Error:', error);
            if (error.name === 'validation_error' && error.message.includes('verify a domain')) {
                return NextResponse.json({ 
                    error: 'Resend Testing Limit: In testing mode, you can only send emails to your own email address. To reply to others, please verify your domain at resend.com.' 
                }, { status: 403 });
            }
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Reply API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
