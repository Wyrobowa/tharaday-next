'use client';

import { Box, Card, CardContent, CardHeader, Text } from 'tharaday';

import type { BookRecord } from '@/types/api';

type NewArrivalsCardProps = {
  books: BookRecord[];
};

export function NewArrivalsCard({ books }: NewArrivalsCardProps) {
  return (
    <Card bordered shadow="sm">
      <CardHeader title="New arrivals" />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          {books.map((book) => (
            <Box
              key={book.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text variant="body-md" weight="medium">
                  {book.name}
                </Text>
                <Text variant="body-sm" color="subtle">
                  {book.type || 'Uncategorized'}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Text variant="body-md" weight="medium">
                  {book.status || 'Unknown'}
                </Text>
                <Text variant="body-sm" color="subtle">
                  {book.priority || 'Normal'}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
