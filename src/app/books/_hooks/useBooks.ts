'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getApiUrl } from '@/consts/api';

import { BookRecord } from '../types';

type BooksSort =
  | 'newest'
  | 'title_asc'
  | 'title_desc'
  | 'author_asc'
  | 'author_desc';

type UseBooksParams = {
  q?: string;
  type?: string;
  status?: string;
  priority?: string;
  author?: string;
  sort?: BooksSort;
  limit?: number;
  id?: number;
  enabled?: boolean;
};

type BooksResponse = {
  items: BookRecord[];
  hasMore: boolean;
  nextCursor: string | null;
  total: number | null;
};

function normalizeBooksResponse(data: unknown): BooksResponse {
  if (Array.isArray(data)) {
    return {
      items: data as BookRecord[],
      hasMore: false,
      nextCursor: null,
      total: null,
    };
  }

  if (data && typeof data === 'object') {
    const payload = data as {
      items?: unknown;
      hasMore?: unknown;
      nextCursor?: unknown;
      total?: unknown;
    };

    return {
      items: Array.isArray(payload.items)
        ? (payload.items as BookRecord[])
        : [],
      hasMore: Boolean(payload.hasMore),
      nextCursor:
        typeof payload.nextCursor === 'string' ? payload.nextCursor : null,
      total: typeof payload.total === 'number' ? payload.total : null,
    };
  }

  return {
    items: [],
    hasMore: false,
    nextCursor: null,
    total: null,
  };
}

export function useBooks({
  q = '',
  type = '',
  status = '',
  priority = '',
  author = '',
  sort = 'newest',
  limit = 24,
  id,
  enabled = true,
}: UseBooksParams = {}) {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [resolvedRequestKey, setResolvedRequestKey] = useState('');

  const normalizedQuery = q.trim();

  const requestParams = useMemo(
    () => ({
      q: normalizedQuery,
      type,
      status,
      priority,
      author,
      sort,
      limit,
      id,
      enabled,
    }),
    [normalizedQuery, type, status, priority, author, sort, limit, id, enabled],
  );

  const requestKey = useMemo(
    () => JSON.stringify(requestParams),
    [requestParams],
  );

  const createUrl = useCallback(
    (cursor?: string) => {
      const queryParams = new URLSearchParams();

      if (requestParams.q) {
        queryParams.set('q', requestParams.q);
      }
      if (requestParams.type) {
        queryParams.set('type', requestParams.type);
      }
      if (requestParams.status) {
        queryParams.set('status', requestParams.status);
      }
      if (requestParams.priority) {
        queryParams.set('priority', requestParams.priority);
      }
      if (requestParams.author) {
        queryParams.set('author', requestParams.author);
      }
      if (requestParams.sort) {
        queryParams.set('sort', requestParams.sort);
      }
      if (requestParams.limit) {
        queryParams.set('limit', String(requestParams.limit));
      }
      if (typeof requestParams.id === 'number') {
        queryParams.set('id', String(requestParams.id));
      }
      if (cursor) {
        queryParams.set('cursor', cursor);
      }

      const queryString = queryParams.toString();
      return queryString
        ? `${getApiUrl('/books')}?${queryString}`
        : getApiUrl('/books');
    },
    [requestParams],
  );

  useEffect(() => {
    if (!requestParams.enabled) {
      return;
    }

    let isMounted = true;

    fetch(createUrl())
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load books (${response.status})`);
        }

        const data = normalizeBooksResponse(await response.json());
        if (isMounted) {
          setBooks(data.items);
          setHasMore(data.hasMore);
          setNextCursor(data.nextCursor);
          setTotal(data.total);
          setError(null);
          setResolvedRequestKey(requestKey);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load books');
          setBooks([]);
          setHasMore(false);
          setNextCursor(null);
          setTotal(null);
          setResolvedRequestKey(requestKey);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [createUrl, requestKey, requestParams.enabled]);

  const loadMore = useCallback(() => {
    if (!requestParams.enabled || !nextCursor || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    setError(null);

    fetch(createUrl(nextCursor))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load more books (${response.status})`);
        }

        const data = normalizeBooksResponse(await response.json());
        setBooks((prev) => [...prev, ...data.items]);
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
        if (typeof data.total === 'number') {
          setTotal(data.total);
        }
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : 'Failed to load more books',
        );
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [createUrl, isLoadingMore, nextCursor, requestParams.enabled]);

  const isLoading = requestParams.enabled && resolvedRequestKey !== requestKey;

  return {
    books,
    isLoading,
    isLoadingMore,
    error: isLoading ? null : error,
    hasMore,
    total,
    loadMore,
  };
}
