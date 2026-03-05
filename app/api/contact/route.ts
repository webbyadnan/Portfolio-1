import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Send email via Resend
        const { error: resendError } = await resend.emails.send({
            from: 'Portfolio Contact <contact@adnanxdev.site>',
            to: ['adnan.khan114@yahoo.com'],
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
                    <h2 style="color: #111827; margin-bottom: 4px;">New Contact Form Message</h2>
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">Someone reached out via your portfolio contact form.</p>
                    
                    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; width: 80px;">NAME</td>
                                <td style="padding: 8px 0; color: #111827; font-size: 14px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">EMAIL</td>
                                <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">SUBJECT</td>
                                <td style="padding: 8px 0; color: #111827; font-size: 14px;">${subject}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                        <p style="color: #6b7280; font-size: 13px; font-weight: 600; margin: 0 0 8px;">MESSAGE</p>
                        <p style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                        Sent from <a href="https://adnanxdev.site" style="color: #6366f1;">adnanxdev.site</a> portfolio
                    </p>
                </div>
            `,
        });

        if (resendError) {
            console.error('Resend error:', resendError);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
