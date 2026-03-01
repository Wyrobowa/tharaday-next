'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Box, Card, CardContent, Text } from 'tharaday';

import { getApiUrl } from '@/consts/api';

type BookRecord = {
  id: number;
  name: string;
  tag_id: number | null;
  type: string | null;
  status: string | null;
  author_first_name: string | null;
  author_last_name: string | null;
};

export function NewArrivalsWidget() {
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
          setError(
            err instanceof Error ? err.message : 'Failed to load new arrivals',
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

  const newArrivals = useMemo(
    () => books.filter((book) => book.tag_id === 6),
    [books],
  );

  return (
    <Card bordered shadow="sm">
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <Text variant="h3" weight="bold">
            New arrivals
          </Text>

          {isLoading ? (
            <Text variant="body-md" color="subtle">
              Loading new arrivals...
            </Text>
          ) : null}

          {error ? (
            <Text variant="body-md" color="danger">
              {error}
            </Text>
          ) : null}

          {!isLoading && !error && newArrivals.length === 0 ? (
            <Text variant="body-md" color="subtle">
              No new arrivals available.
            </Text>
          ) : null}

          <Box display="grid" gap={3}>
            {newArrivals.map((book) => {
              const authorName = [book.author_first_name, book.author_last_name]
                .filter(Boolean)
                .join(' ');

              return (
                <Box
                  key={book.id}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  paddingY={2}
                >
                  <Text variant="body-lg" weight="bold">
                    {book.name}
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    {authorName || 'Unknown author'}
                  </Text>
                  <Box display="flex" gap={2}>
                    <Badge intent="info">{book.type || 'New Arrival'}</Badge>
                    <Badge intent="success">
                      {book.status || 'Unknown status'}
                    </Badge>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
