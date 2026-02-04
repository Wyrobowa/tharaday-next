'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
  Badge,
  Input,
} from 'tharaday';

import { apiGet } from '@/lib/api';
import { BookRecord } from '@/types/api';

export default function CartPage() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGet<BookRecord[]>('/api/books')
      .then((data) => setBooks(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const cartItems = useMemo(
    () =>
      books.slice(0, 2).map((book) => ({
        ...book,
        quantity: 1,
      })),
    [books],
  );

  return (
    <Box paddingY={8} display="flex" flexDirection="column" gap={8}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Text variant="h1" weight="bold">
          Cart
        </Text>
        <Text variant="body-md" color="subtle">
          Review your selections before checkout.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="minmax(0, 1.3fr) minmax(0, 0.7fr)"
        gap={8}
      >
        <Card bordered shadow="sm">
          <CardHeader title="Items in your cart" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={5}>
              {cartItems.map((book) => (
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
                      {[book.author_first_name, book.author_last_name]
                        .filter(Boolean)
                        .join(' ') || 'Unknown author'}
                    </Text>
                    <Box display="flex" gap={2} paddingTop={2}>
                      <Badge intent="info">{book.type || 'Tag'}</Badge>
                      <Badge intent="success">{book.status || 'Status'}</Badge>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    gap={2}
                  >
                    <Text variant="body-md" weight="medium">
                      {book.priority || 'Priority'}
                    </Text>
                    <Text variant="body-sm" color="subtle">
                      Qty {book.quantity}
                    </Text>
                    <Button
                      variant="outline"
                      intent="neutral"
                      size="sm"
                      disabled
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card bordered shadow="sm">
          <CardHeader title="Order summary" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Items</Text>
                <Text variant="body-md" weight="medium">
                  {isLoading ? 'Loading...' : cartItems.length}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Pricing</Text>
                <Text variant="body-md" weight="medium">
                  Not available
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text variant="body-md">Checkout status</Text>
                <Text variant="body-md" weight="medium">
                  Disabled
                </Text>
              </Box>
              <Input label="Promo code" placeholder="Enter code" />
              <Link href="/checkout">
                <Button variant="solid" intent="info" fullWidth>
                  Proceed to checkout
                </Button>
              </Link>
              <Button variant="outline" intent="neutral" disabled fullWidth>
                Continue browsing
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
