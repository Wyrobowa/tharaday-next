import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

import { PostgresError } from '@/types/postgres';

export async function GET() {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const items = await sql`
            SELECT
              i.id,
              i.name,
              i.type_id,
              i.status_id,
              i.priority_id,
              it.name AS type,
              s.name AS status,
              p.name AS priority
            FROM items i
            LEFT JOIN item_types it ON it.id = i.type_id
            LEFT JOIN statuses s ON s.id = i.status_id
            LEFT JOIN priorities p ON p.id = i.priority_id
            ORDER BY i.id DESC;
        `;

        return NextResponse.json(items);
    } catch (err) {
        return NextResponse.json(
            { error: 'db_error', message: String(err) },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const body = await req.json();

        const name = String(body.name ?? '').trim();
        const typeId = body.type_id ? Number(body.type_id) : null;
        const statusId = body.status_id ? Number(body.status_id) : null;
        const priorityId = body.priority_id ? Number(body.priority_id) : null;

        if (!name) {
            return NextResponse.json({ error: 'Items: name required' }, { status: 400 });
        }
        if (typeId === null) {
            return NextResponse.json({ error: 'Items: type_id required' }, { status: 400 });
        }
        if (statusId === null) {
            return NextResponse.json({ error: 'Items: status_id required' }, { status: 400 });
        }
        if (priorityId === null) {
            return NextResponse.json({ error: 'Items: priority_id required' }, { status: 400 });
        }

        const rows = await sql`
          INSERT INTO items (name, type_id, status_id, priority_id)
          VALUES (${name}, ${typeId}, ${statusId}, ${priorityId})
          RETURNING id, name, type_id, status_id, priority_id;
        `;

        return NextResponse.json(rows[0], { status: 201 });
    } catch (err) {
        const pgErr = err as PostgresError;
        if (pgErr.code === '23503') {
            return NextResponse.json(
                { error: 'invalid_fkey', message: 'Type or status does not exist' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'db_error', message: String(pgErr?.message ?? pgErr) },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const body = await req.json();
        const { id, name, type_id, status_id, priority_id } = body;

        if (!id) {
            return NextResponse.json({ error: 'id required' }, { status: 400 });
        }

        const updates: string[] = [];
        const values: unknown[] = [];
        let placeholderIndex = 1;

        if (name !== undefined) {
            updates.push(`name = $${placeholderIndex++}`);
            values.push(name);
        }
        if (type_id !== undefined) {
            updates.push(`type_id = $${placeholderIndex++}`);
            values.push(type_id === '' || type_id === null ? null : Number(type_id));
        }
        if (status_id !== undefined) {
            updates.push(`status_id = $${placeholderIndex++}`);
            values.push(status_id === '' || status_id === null ? null : Number(status_id));
        }
        if (priority_id !== undefined) {
            updates.push(`priority_id = $${placeholderIndex++}`);
            values.push(priority_id);
        }

        if (updates.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        values.push(id);
        const query = `
            UPDATE items
            SET ${updates.join(', ')}
            WHERE id = $${placeholderIndex}
            RETURNING id, name, type_id, status_id, priority_id;
        `;

        const rows = await sql.query(query, values);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (err) {
        return NextResponse.json({ error: 'db_error', message: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'id required' }, { status: 400 });
        }

        await sql`DELETE FROM items WHERE id = ${id}`;

        return new NextResponse(null, { status: 204 });
    } catch (err) {
        return NextResponse.json({ error: 'db_error', message: String(err) }, { status: 500 });
    }
}
