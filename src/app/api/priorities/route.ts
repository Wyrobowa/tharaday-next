import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const priorities = await sql`
            SELECT id, name, is_active
            FROM priorities
            WHERE is_active = true
            ORDER BY name ASC;
        `;

    return NextResponse.json(priorities);
  } catch (err) {
    return NextResponse.json(
      { error: 'db_error', message: String(err) },
      { status: 500 },
    );
  }
}
