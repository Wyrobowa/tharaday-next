import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`SELECT 1 AS ok;`;

  return NextResponse.json({ ok: result[0]?.ok === 1 });
}
