import { supabaseAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const PUT_BODY_SCHEMA = z.object({
  nfc_id: z.string().min(5),
});

export async function POST(request) {
  const body = await request.json();
  let parsedBody = PUT_BODY_SCHEMA.parse(body);
  
  await supabaseAdminClient.from('beers')
    .insert({
      nfc_id: parsedBody.nfc_id,
    }).throwOnError();

  return new NextResponse(null, { status: 204 });
}