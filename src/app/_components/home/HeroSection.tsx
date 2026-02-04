'use client';

import Link from 'next/link';
import { Box, Button, Card, CardContent, Text, Badge } from 'tharaday';

export function HeroSection() {
  return (
    <Card bordered shadow="sm">
      <CardContent>
        <Box display="flex" flexDirection="column" gap={5}>
          <Text variant="h1" weight="bold">
            Discover stories worth keeping.
          </Text>
          <Text variant="body-lg" color="subtle">
            Tharaday Books is a curated marketplace for readers, collectors, and
            independent sellers. Shop new and used titles, explore rare
            editions, and track everything in one place.
          </Text>
          <Box display="flex" gap={3}>
            <Link href="/browse">
              <Button variant="solid" intent="info">
                Browse Marketplace
              </Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" intent="neutral">
                Start Selling
              </Button>
            </Link>
          </Box>
          <Box display="flex" gap={3}>
            <Badge intent="success">Trusted sellers</Badge>
            <Badge intent="info">Verified editions</Badge>
            <Badge intent="warning">Limited drops weekly</Badge>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
