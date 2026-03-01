import Link from 'next/link';
import { Badge, Box, Card, CardContent, Text } from 'tharaday';

import { BookRecord } from '../types';
import { getAuthorName, getBookTitle } from '../utils';

type BooksListProps = {
  books: BookRecord[];
};

export function BooksList({ books }: BooksListProps) {
  return (
    <Box display="grid" gap={4}>
      {books.map((book) => {
        const authorName = getAuthorName(book);

        return (
          <Link
            key={book.id}
            href={`/book?id=${book.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Card bordered shadow="sm">
              <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Text variant="h4" weight="bold">
                    {getBookTitle(book)}
                  </Text>
                  <Text variant="body-sm" color="subtle">
                    {authorName || 'Unknown author'}
                  </Text>
                  {book.description ? (
                    <Text variant="body-sm" color="subtle">
                      {book.description}
                    </Text>
                  ) : null}
                  <Box display="flex" gap={2}>
                    <Badge intent="info">{book.type || 'Unknown type'}</Badge>
                    <Badge intent="success">
                      {book.status || 'Unknown status'}
                    </Badge>
                    <Badge intent="info">
                      {book.priority || 'Unknown priority'}
                    </Badge>
                  </Box>
                  <Box display="flex" gap={2}>
                    <Text variant="body-sm" color="subtle">
                      Publisher: {book.publisher || 'Unknown'}
                    </Text>
                    <Text variant="body-sm" color="subtle">
                      Pages: {book.pages ?? 'N/A'}
                    </Text>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Box>
  );
}
