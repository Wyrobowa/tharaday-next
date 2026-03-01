import { Badge, Box, Card, CardContent, Text } from 'tharaday';

import { BookRecord } from '../types';
import { getAuthorName } from '../utils';

type BooksListProps = {
  books: BookRecord[];
};

export function BooksList({ books }: BooksListProps) {
  return (
    <Box display="grid" gap={4}>
      {books.map((book) => {
        const authorName = getAuthorName(book);

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
  );
}
