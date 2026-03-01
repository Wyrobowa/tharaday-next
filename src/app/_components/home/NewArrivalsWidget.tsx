'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Box, Button, Card, CardContent, Text } from 'tharaday';

import { BookCover } from '@/app/_components/BookCover';
import { BookRecord } from '@/app/books/types';
import { getAuthorName, getBookTitle } from '@/app/books/utils';
import { getApiUrl } from '@/consts/api';

export function NewArrivalsWidget() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) {
      return;
    }

    const offset = direction === 'left' ? -300 : 300;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <Card bordered shadow="sm">
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="h3" weight="bold">
              New arrivals
            </Text>
            <Box display="flex" gap={2}>
              <Button
                variant="outline"
                size="sm"
                intent="neutral"
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll new arrivals left"
              >
                ←
              </Button>
              <Button
                variant="outline"
                size="sm"
                intent="neutral"
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll new arrivals right"
              >
                →
              </Button>
            </Box>
          </Box>

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

          <div
            ref={carouselRef}
            style={{
              display: 'grid',
              gap: '12px',
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(220px, 240px)',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '6px',
            }}
          >
            {newArrivals.map((book) => {
              const authorName = getAuthorName(book);

              return (
                <Link
                  key={book.id}
                  href={`/book?id=${book.id}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <Card bordered shadow="sm" style={{ height: '100%' }}>
                    <CardContent>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <BookCover
                          id={book.id}
                          title={getBookTitle(book)}
                          author={authorName}
                          size="sm"
                        />
                        <Text variant="body-md" weight="bold">
                          {getBookTitle(book)}
                        </Text>
                        <Text variant="body-sm" color="subtle">
                          {authorName || 'Unknown author'}
                        </Text>
                        <Box display="flex" gap={2}>
                          <Badge intent="info">
                            {book.type || 'New Arrival'}
                          </Badge>
                          <Badge intent="success">
                            {book.status || 'Unknown status'}
                          </Badge>
                        </Box>
                        <Text variant="body-sm" color="subtle">
                          {book.pages ? `${book.pages} pages` : 'Pages N/A'}
                        </Text>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
