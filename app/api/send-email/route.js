import { Resend } from 'resend';
import { rateLimit } from '@/data/rateLimit';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  
  // Rate limiting
  const rateLimitResult = rateLimit(ip, 5, 60000); // 5 requests per minute
  if (!rateLimitResult.success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  try {
    const { to, subject, html, from } = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: from || 'AI Spend Audit <onboarding@resend.dev>',
      to: to,
      subject: subject,
      html: html,
    });
    
    if (error) throw error;
    
    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}