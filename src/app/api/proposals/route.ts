import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('proposals')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: proposals, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 });
    }

    return NextResponse.json({
      proposals: proposals || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Proposals GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
