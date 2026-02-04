'use client';

import { Box, Button, Card, CardContent, CardHeader, Text } from 'tharaday';

type SnapshotItem = {
  label: string;
  value: string;
};

const snapshotItems: SnapshotItem[] = [
  { label: 'Active Listings', value: '2,412' },
  { label: 'Avg. Seller Rating', value: '4.8 / 5' },
  { label: 'Orders This Week', value: '318' },
  { label: 'Seller Payouts', value: '24 hrs avg' },
];

export function MarketplaceSnapshotCard() {
  return (
    <Card bordered shadow="sm">
      <CardHeader title="Marketplace Snapshot" />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          {snapshotItems.map((item) => (
            <Box key={item.label} display="flex" justifyContent="space-between">
              <Text variant="body-md">{item.label}</Text>
              <Text variant="body-md" weight="medium">
                {item.value}
              </Text>
            </Box>
          ))}
          <Button variant="outline" intent="neutral" disabled>
            View Insights
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
