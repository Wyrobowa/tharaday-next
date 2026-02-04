'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
} from 'tharaday';

export function SellerSpotlightCard() {
  return (
    <Card bordered shadow="sm">
      <CardHeader title="Seller spotlight" />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <Text variant="body-md" weight="medium">
            Mythic Reads
          </Text>
          <Text variant="body-sm" color="subtle">
            Independent fantasy bookstore with hand-curated editions and
            collector drops.
          </Text>
          <Box display="flex" gap={2}>
            <Badge intent="success">4.9 rating</Badge>
            <Badge intent="info">120 listings</Badge>
          </Box>
          <Button variant="outline" intent="neutral" disabled>
            Follow seller
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
