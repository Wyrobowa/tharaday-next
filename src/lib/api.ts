export async function apiGet<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || err?.error || 'Request failed');
    }

    return res.json();
}

export async function apiPost<T, B = unknown>(url: string, body: B): Promise<T> {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || err?.error || 'Request failed');
    }

    return res.json();
}

export async function apiPut<T, B = unknown>(url: string, body: B): Promise<T> {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || err?.error || 'Request failed');
    }

    return res.json();
}

export async function apiDelete<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || err?.error || 'Request failed');
    }

    if (res.status === 204) {
        return {} as T;
    }

    return res.json();
}

export async function apiPatch<T, B = unknown>(url: string, body: B): Promise<T> {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || err?.error || 'Request failed');
    }

    return res.json();
}
