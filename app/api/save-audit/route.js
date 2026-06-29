import { supabase } from '@/data/supabase';
import { Resend } from 'resend';
import { rateLimit } from '@/data/rateLimit';
import { headers } from 'next/headers';
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
export async function POST(request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    if (process.env.NODE_ENV === 'production') {
      const rateLimitResult = rateLimit(ip, 5, 60000);
      if (!rateLimitResult.success) {
        return Response.json({ error: 'Too many requests' }, { status: 429 });
      }
    }
    const { email, company, role, auditData, shareableLink } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://auditai-delta-seven.vercel.app';
    const link = shareableLink || (auditData?.auditId ? `${baseUrl}/audit/${auditData.auditId}` : null);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert([
            {
              email,
              company,
              role,
              audit_data: auditData,
              created_at: new Date().toISOString()
            }
          ])
          .select();
        
        if (error) {
          console.error('Supabase insert error:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }
    }

    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'AI Spend Audit <onboarding@resend.dev>',
          to: email,
          subject: 'Your AI Spend Audit Results',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .savings { font-size: 24px; color: #22c55e; font-weight: bold; }
                .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Your AI Spend Audit Results</h1>
                <p>Thanks for using AI Spend Audit!</p>
                <h2>Summary</h2>
                <p>Monthly savings potential: <span class="savings">$${Math.round(auditData.auditResult?.monthlySavings || 0)}</span></p>
                <p>Annual savings potential: <span class="savings">$${Math.round(auditData.auditResult?.annualSavings || 0)}</span></p>
                ${auditData.auditResult?.monthlySavings > 500 ? 
                  `<p><strong>🎉 You have significant savings opportunities! Our team will reach out shortly.</strong></p>` : 
                  `<p>📧 We'll notify you when new optimizations are available for your stack.</p>`
                }
                <hr />
                <p>View your full report: <a href="${link || '#'}">${link || 'See results above'}</a></p>
                <p>— The AI Spend Audit Team</p>
              </div>
            </body>
            </html>
          `
        });
        console.log('Email sent to:', email);
      } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Don't fail the whole request if email fails
      }
    } else {
      console.log('📧 [DEV] Email would be sent to:', email);
      console.log('📧 [DEV] Audit results:', {
        monthlySavings: auditData.auditResult?.monthlySavings,
        annualSavings: auditData.auditResult?.annualSavings
      });
    }
    
    return Response.json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Save audit error:', error);
    return Response.json({ success: true, mock: true, message: 'Lead captured (mock mode)' });
  }
}