import { supabase } from '@/data/supabase';
import { nanoid } from 'nanoid';

const isSupabaseReady = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && key && key.startsWith('eyJ'));
};

export async function POST(request) {
  try {
    const { formData, result } = await request.json();
    const id = nanoid(10);

    if (!isSupabaseReady()) {
      console.log('⚠️ Supabase not ready, returning mock ID');
      return Response.json({ id, mock: true });
    }

    const auditData = {
      id,
      form_data: { tools: formData.tools, teamSize: formData.teamSize, primaryUseCase: formData.primaryUseCase },
      result: {
        totalCurrentSpend: result.totalCurrentSpend,
        totalRecommendedSpend: result.totalRecommendedSpend,
        monthlySavings: result.monthlySavings,
        annualSavings: result.annualSavings,
        recommendations: result.recommendations,
        isOptimal: result.isOptimal,
        summary: result.summary
      },
      created_at: new Date().toISOString(),
      view_count: 0
    };

    const { error } = await supabase.from('audits').upsert([auditData], { onConflict: 'id' });
    if (error) {
      console.error('Supabase insert error:', error);
    }

    return Response.json({ id });
  } catch (error) {
    console.error('Audit save error:', error);
    return Response.json({ id: nanoid(10), mock: true });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return Response.json({ error: 'No ID provided' }, { status: 400 });

  if (!isSupabaseReady()) {
    return Response.json({ error: 'Audit not found' }, { status: 404 });
  }

  try {
    const { data, error } = await supabase
      .from('audits')
      .select('result')
      .eq('id', id)
      .single();

    if (error) {
      return Response.json({ error: 'Audit not found' }, { status: 404 });
    }

    return Response.json({ audit: data.result });
  } catch (error) {
    console.error('Fetch error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}