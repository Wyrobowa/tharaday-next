import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
  Badge,
} from 'tharaday';

import { BookRecord } from '@/types/api';

type BookDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  // Fallback so static export always has at least one param even if API is unavailable.
  const fallback = [{ id: '1' }];
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(
    /\/$/,
    '',
  );
  if (!apiBase) {
    return fallback;
  }

  try {
    const res = await fetch(`${apiBase}/api/books`);
    if (!res.ok) {
      return fallback;
    }
    const books = (await res.json()) as { id: number }[];
    const params = books.map((book) => ({ id: String(book.id) }));
    return params.length > 0 ? params : fallback;
  } catch {
    return fallback;
  }
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(
    /\/$/,
    '',
  );
  const { id } = await params;
  let books: BookRecord[] = [];
  if (apiBase) {
    try {
      const res = await fetch(`${apiBase}/api/books`);
      if (res.ok) {
        books = (await res.json()) as BookRecord[];
      }
    } catch {
      books = [];
    }
  }
  const book = books.find((entry) => String(entry.id) === id);
  const authorName = book
    ? [book.author_first_name, book.author_last_name]
        .filter(Boolean)
        .join(' ') || 'Unknown author'
    : '';

  if (!book) {
    return (
      <Box paddingY={8} display="flex" flexDirection="column" gap={4}>
        <Text variant="h1" weight="bold">
          Book not found
        </Text>
        <Text variant="body-md" color="subtle">
          We could not find that listing. Try browsing the marketplace instead.
        </Text>
        <Link href="/browse">
          <Button variant="solid" intent="info">
            Browse books
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box paddingY={8} display="flex" flexDirection="column" gap={8}>
      <Box display="grid" gridTemplateColumns="1.1fr 0.9fr" gap={8}>
        <Card bordered shadow="sm">
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Text variant="h1" weight="bold">
                {book.name}
              </Text>
              <Text variant="body-lg" color="subtle">
                by {authorName}
              </Text>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Badge intent="info">{book.type || 'Tag'}</Badge>
                <Badge intent="success">{book.status || 'Status'}</Badge>
                <Badge intent="warning">{book.priority || 'Priority'}</Badge>
              </Box>
              <Text variant="body-md" color="subtle">
                {book.publisher
                  ? `Published by ${book.publisher}.`
                  : 'Publisher unknown.'}
              </Text>
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                gap={4}
              >
                <Box>
                  <Text variant="body-sm" color="subtle">
                    Author country
                  </Text>
                  <Text variant="body-md" weight="medium">
                    {book.author_country || '—'}
                  </Text>
                </Box>
                <Box>
                  <Text variant="body-sm" color="subtle">
                    Publisher country
                  </Text>
                  <Text variant="body-md" weight="medium">
                    {book.publisher_country || '—'}
                  </Text>
                </Box>
                <Box>
                  <Text variant="body-sm" color="subtle">
                    Pages
                  </Text>
                  <Text variant="body-md" weight="medium">
                    {book.pages ?? '—'}
                  </Text>
                </Box>
                <Box>
                  <Text variant="body-sm" color="subtle">
                    Listing ID
                  </Text>
                  <Text variant="body-md" weight="medium">
                    #{book.id}
                  </Text>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card bordered shadow="sm">
          <CardHeader title="Purchase options" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Listing status</Text>
                <Text variant="body-md" weight="medium">
                  {book.status || 'Unknown'}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Priority</Text>
                <Text variant="body-md" weight="medium">
                  {book.priority || 'Normal'}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Tag</Text>
                <Text variant="body-md" weight="medium">
                  {book.type || '—'}
                </Text>
              </Box>
              <Button variant="solid" intent="info">
                Request details
              </Button>
              <Button variant="outline" intent="neutral" disabled>
                Save for later
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Card bordered shadow="sm">
        <CardHeader title="Seller notes" />
        <CardContent>
          <Text variant="body-md" color="subtle">
            Ships within 48 hours. Carefully packed with tracked delivery.
            Please review condition details before purchase.
          </Text>
        </CardContent>
      </Card>
    </Box>
  );
}
