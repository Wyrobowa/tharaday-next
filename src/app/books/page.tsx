'use client';

import { useEffect, useState } from 'react';
import { Badge, Box, Card, CardContent, Text } from 'tharaday';

import { getApiUrl } from '@/consts/api';

type BookRecord = {
  id: number;
  name: string;
  type: string | null;
  status: string | null;
  author_first_name: string | null;
  author_last_name: string | null;
};

export default function BooksPage() {
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

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Text variant="h1" weight="bold">
        Books
      </Text>

      {isLoading ? (
        <Text variant="body-md" color="subtle">
          Loading books...
        </Text>
      ) : null}

      {error ? (
        <Text variant="body-md" color="danger">
          {error}
        </Text>
      ) : null}

      {!isLoading && !error && books.length === 0 ? (
        <Text variant="body-md" color="subtle">
          No books found.
        </Text>
      ) : null}

      <Box display="grid" gap={4}>
        {books.map((book) => {
          const authorName = [book.author_first_name, book.author_last_name]
            .filter(Boolean)
            .join(' ');

          return (
            <Card key={book.id} bordered shadow="sm">
              <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Text variant="h4" weight="bold">
                    {book.name}
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    {authorName || 'Unknown author'}
                  </Text>
                  <Box display="flex" gap={2}>
                    <Badge intent="info">{book.type || 'Unknown type'}</Badge>
                    <Badge intent="success">
                      {book.status || 'Unknown status'}
                    </Badge>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
