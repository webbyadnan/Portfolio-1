import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

        // Insert into database
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    subject: subject.trim(),
                    message: message.trim(),
                    read: false,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Failed to save message' },
                { status: 500 }
            );
        }

        // TODO: Send email notification (optional)
        // You can integrate with services like Resend, SendGrid, etc.

        return NextResponse.json(
            { message: 'Message sent successfully', data },
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
