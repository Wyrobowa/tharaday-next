'use client';

import Link from 'next/link';
import { Badge, Box, Button, Card, CardContent, Text } from 'tharaday';

import type { BookRecord } from '@/types/api';

type FeaturedTitlesSectionProps = {
  books: BookRecord[];
};

export function FeaturedTitlesSection({ books }: FeaturedTitlesSectionProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Text variant="h2" weight="bold">
        Featured titles
      </Text>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={6}
      >
        {books.map((book) => (
          <Card key={book.id} bordered shadow="sm">
            <CardContent>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Text variant="body-md" weight="medium">
                    {book.name}
                  </Text>
                  {book.type ? (
                    <Text variant="body-sm" color="subtle">
                      {book.type}
                    </Text>
                  ) : null}
                </Box>
                <Text variant="body-sm" color="subtle">
                  Status: {book.status || 'Unknown'}
                </Text>
                <Box display="flex" justifyContent="space-between">
                  <Text variant="body-md" weight="medium">
                    Priority: {book.priority || 'Normal'}
                  </Text>
                  <Badge intent="info">{book.status || 'Status'}</Badge>
                </Box>
                <Link href={`/book/${book.id}`}>
                  <Button variant="outline" intent="neutral" fullWidth>
                    View details
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
