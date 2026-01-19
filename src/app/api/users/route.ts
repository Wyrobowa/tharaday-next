import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

import { PostgresError } from '@/types/postgres';

export async function GET() {
    const sql = neon(process.env.DATABASE_URL!);

    const users = await sql`
        SELECT
          u.id,
          u.name,
          u.email,
          u.role_id,
          u.status_id,
          r.name AS role,
          s.name AS status
        FROM users u
        LEFT JOIN roles r ON r.id = u.role_id
        LEFT JOIN statuses s ON s.id = u.status_id
        ORDER BY u.id DESC;
    `;

    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const body = await req.json();

        const name = String(body.name ?? '').trim();
        const email = String(body.email ?? '').trim();
        const roleIdRaw = body.role_id;

        const roleId =
            roleIdRaw === null || roleIdRaw === undefined || roleIdRaw === ''
                ? null
                : Number(roleIdRaw);

        const statusIdRaw = body.status_id;

        const statusId = statusIdRaw === null || statusIdRaw === undefined || statusIdRaw === ''
            ? null
            : Number(statusIdRaw);

        if (!name) {
            return NextResponse.json({ error: 'Users: name required' }, { status: 400 });
        }
        if (!email) {
            return NextResponse.json({ error: 'Users: email required' }, { status: 400 });
        }
        if (roleId !== null && !Number.isFinite(roleId)) {
            return NextResponse.json({ error: 'Users: role_id must be a number' }, { status: 400 });
        }
        if (statusId !== null && !Number.isFinite(statusId)) {
            return NextResponse.json({ error: 'Users: status_id must be a number' }, { status: 400 });
        }

        const rows = await sql`
          INSERT INTO users (name, email, role_id, status_id)
          VALUES (${name}, ${email}, ${roleId}, ${statusId})
          RETURNING id, name, email, role_id, status_id;
        `;

        const created = rows[0];

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        const pgErr = err as PostgresError;

        // unique_violation
        if (pgErr.code === '23505') {
            return NextResponse.json(
                { error: 'duplicate', message: 'User already exists' },
                { status: 409 }
            );
        }

        // foreign_key_violation
        if (pgErr.code === '23503') {
            return NextResponse.json(
                { error: 'invalid_fkey', message: 'Role or status does not exist' },
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
        const { id, name, email, role_id, status_id } = body;

        if (!id) {
            return NextResponse.json({ error: 'id required' }, { status: 400 });
        }

        // Build dynamic query for partial updates
        const updates: string[] = [];
        const values: unknown[] = [];
        let placeholderIndex = 1;

        if (name !== undefined) {
            updates.push(`name = $${placeholderIndex++}`);
            values.push(name);
        }
        if (email !== undefined) {
            updates.push(`email = $${placeholderIndex++}`);
            values.push(email);
        }
        if (role_id !== undefined) {
            updates.push(`role_id = $${placeholderIndex++}`);
            values.push(role_id === '' || role_id === null ? null : Number(role_id));
        }
        if (status_id !== undefined) {
            updates.push(`status_id = $${placeholderIndex++}`);
            values.push(status_id === '' || status_id === null ? null : Number(status_id));
        }

        if (updates.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        values.push(id);
        const query = `
            UPDATE users
            SET ${updates.join(', ')}
            WHERE id = $${placeholderIndex}
            RETURNING id, name, email, role_id, status_id;
        `;

        const rows = await sql.query(query, values);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

        await sql`DELETE FROM users WHERE id = ${id}`;

        return new NextResponse(null, { status: 204 });
    } catch (err) {
        return NextResponse.json({ error: 'db_error', message: String(err) }, { status: 500 });
    }
}