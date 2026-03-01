'use client';

import { useEffect, useState } from 'react';

import { getApiUrl } from '@/consts/api';

import { BookRecord } from '../types';

export function useBooks() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(getApiUrl('/books'))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load books (${response.status})`);
        }

        const data = (await response.json()) as BookRecord[];
        if (isMounted) {
          setBooks(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load books');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { books, isLoading, error };
}
