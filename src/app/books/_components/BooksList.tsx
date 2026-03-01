import Link from 'next/link';
import { Badge, Box, Card, CardContent, Text } from 'tharaday';

import { BookCover } from '@/app/_components/BookCover';

import { BookRecord } from '../types';
import { getAuthorName, getBookTitle } from '../utils';
import styles from './BooksList.module.css';

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
            className={styles.bookLink}
          >
            <Card bordered shadow="sm">
              <CardContent>
                <Box display="flex" gap={3} alignItems="flex-start">
                  <BookCover
                    id={book.id}
                    title={getBookTitle(book)}
                    author={authorName}
                    size="sm"
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    className={styles.bookContent}
                  >
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
                </Box>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Box>
  );
}
