'use client';

import { useEffect, useState } from 'react';

import { getApiUrl } from '@/consts/api';

export type BookFiltersMetadata = {
  types: string[];
  statuses: string[];
  priorities: string[];
  authors: string[];
};

const EMPTY_METADATA: BookFiltersMetadata = {
  types: [],
  statuses: [],
  priorities: [],
  authors: [],
};

export function useBookFilterMetadata() {
  const [metadata, setMetadata] = useState<BookFiltersMetadata>(EMPTY_METADATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(getApiUrl('/books-filters'))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load filters (${response.status})`);
        }

        const data = (await response.json()) as Partial<BookFiltersMetadata>;

        if (!isMounted) {
          return;
        }

        setMetadata({
          types: Array.isArray(data.types) ? data.types : [],
          statuses: Array.isArray(data.statuses) ? data.statuses : [],
          priorities: Array.isArray(data.priorities) ? data.priorities : [],
          authors: Array.isArray(data.authors) ? data.authors : [],
        });
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load filters',
          );
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

  return { metadata, isLoading, error };
}
