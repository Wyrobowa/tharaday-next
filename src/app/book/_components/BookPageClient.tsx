'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Badge, Box, Button, Card, CardContent, Text } from 'tharaday';

import { useBooks } from '../../books/_hooks/useBooks';
import { getAuthorName } from '../../books/utils';

export function BookPageClient() {
  const searchParams = useSearchParams();
  const { books, isLoading, error } = useBooks();

  const bookId = searchParams.get('id');

  const parsedBookId = useMemo(() => {
    const numericId = Number(bookId);
    return Number.isInteger(numericId) && numericId > 0 ? numericId : null;
  }, [bookId]);

  const book = useMemo(() => {
    if (!parsedBookId) {
      return null;
    }

    return books.find((bookRecord) => bookRecord.id === parsedBookId) ?? null;
  }, [books, parsedBookId]);

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      {!bookId ? (
        <Text variant="body-md" color="subtle">
          Missing book id. Open this page from the Books list.
        </Text>
      ) : null}

      {bookId && !parsedBookId ? (
        <Text variant="body-md" color="danger">
          Invalid book id.
        </Text>
      ) : null}

      {parsedBookId && isLoading ? (
        <Text variant="body-md" color="subtle">
          Loading book...
        </Text>
      ) : null}

      {parsedBookId && error ? (
        <Text variant="body-md" color="danger">
          {error}
        </Text>
      ) : null}

      {parsedBookId && !isLoading && !error && !book ? (
        <Text variant="body-md" color="subtle">
          Book not found.
        </Text>
      ) : null}

      {book ? (
        <Card bordered shadow="sm">
          <CardContent>
            <Box display="flex" flexDirection="column" gap={3}>
              <Text variant="h2" weight="bold">
                {book.name}
              </Text>

              <Text variant="body-md" color="subtle">
                {getAuthorName(book) || 'Unknown author'}
              </Text>

              <Box display="flex" gap={2}>
                <Badge intent="info">{book.type || 'Unknown type'}</Badge>
                <Badge intent="success">
                  {book.status || 'Unknown status'}
                </Badge>
              </Box>

              <Box>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Back
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
}
