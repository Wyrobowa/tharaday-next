'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Text, Badge } from 'tharaday';

import { apiGet } from '@/lib/api';
import { BookRecord } from '@/types/api';

export default function BrowsePage() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGet<BookRecord[]>('/api/books')
      .then((data) => setBooks(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const featuredGenres = useMemo(() => {
    const tagSet = new Set<string>();
    books.forEach((book) => {
      if (book.type) {
        tagSet.add(book.type);
      }
    });
    return Array.from(tagSet);
  }, [books]);

  return (
    <Box paddingY={8} display="flex" flexDirection="column" gap={8}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Text variant="h1" weight="bold">
          Browse books
        </Text>
        <Text variant="body-md" color="subtle">
          Filter by genre, format, and condition to find your next favorite.
        </Text>
      </Box>

      <Box display="grid" gridTemplateColumns="260px 1fr" gap={8}>
        <Card bordered shadow="sm">
          <CardContent>
            <Box display="flex" flexDirection="column" gap={5}>
              <Box>
                <Text variant="body-md" weight="medium">
                  Genres
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  paddingTop={3}
                >
                  {featuredGenres.map((genre) => (
                    <Text key={genre} variant="body-sm" color="subtle">
                      {genre}
                    </Text>
                  ))}
                </Box>
              </Box>

              <Box>
                <Text variant="body-md" weight="medium">
                  Condition
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  paddingTop={3}
                >
                  {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                    <Text key={condition} variant="body-sm" color="subtle">
                      {condition}
                    </Text>
                  ))}
                </Box>
              </Box>

              <Box>
                <Text variant="body-md" weight="medium">
                  Format
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  paddingTop={3}
                >
                  {['Hardcover', 'Paperback', 'eBook'].map((format) => (
                    <Text key={format} variant="body-sm" color="subtle">
                      {format}
                    </Text>
                  ))}
                </Box>
              </Box>

              <Button variant="outline" intent="neutral" disabled>
                Apply filters
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box display="flex" flexDirection="column" gap={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="body-md" color="subtle">
              {isLoading
                ? 'Loading listings...'
                : `Showing ${books.length} results`}
            </Text>
            <Button variant="outline" intent="neutral" disabled>
              Sort: Popular
            </Button>
          </Box>

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
                      <Text variant="body-sm" color="subtle">
                        {[book.author_first_name, book.author_last_name]
                          .filter(Boolean)
                          .join(' ') || 'Unknown author'}
                      </Text>
                    </Box>
                    <Box display="flex" gap={2} flexWrap="wrap">
                      <Badge intent="info">{book.type || 'Tag'}</Badge>
                      <Badge intent="success">{book.status || 'Status'}</Badge>
                    </Box>
                    <Text variant="body-sm" color="subtle">
                      {book.priority
                        ? `Priority: ${book.priority}`
                        : 'Priority: -'}
                    </Text>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text variant="body-md" weight="medium">
                        {book.publisher || 'Publisher'}
                      </Text>
                      <Link href={`/book/${book.id}`}>
                        <Button variant="outline" intent="neutral">
                          View
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
