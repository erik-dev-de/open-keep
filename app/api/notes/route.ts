import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function GET() {
    const res = await supabase.from('notes').select();
    return NextResponse.json(res);
};

export async function DELETE(request: Request) {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const idsToDelete = queryParams.getAll('ids');

    idsToDelete.forEach(async (id) => {
        await supabase.from('notes').delete().in('note_id', idsToDelete);
    });

    return NextResponse.json(idsToDelete, { status: 200 });
};

export async function POST(request: Request) {

    const body = await request.json();

    const { data } = await supabase.from('notes').insert({
        user_id: body.user_id,
        title: body.title,
        content: body.content
    }).select()

    return NextResponse.json(data, { status: 200 });
};

export async function PUT(request: Request) {
    const body = await request.json();

    return NextResponse.json(body, { status: 200 });
};
