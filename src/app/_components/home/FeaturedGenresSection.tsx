'use client';

import Link from 'next/link';
import { Box, Button, Card, CardContent, Text } from 'tharaday';

type FeaturedGenresSectionProps = {
  genres: string[];
};

export function FeaturedGenresSection({ genres }: FeaturedGenresSectionProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text variant="h2" weight="bold">
          Featured genres
        </Text>
        <Link href="/browse">
          <Button variant="outline" intent="neutral">
            View all
          </Button>
        </Link>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
        gap={4}
      >
        {genres.map((genre) => (
          <Card key={genre} bordered shadow="sm">
            <CardContent>
              <Text variant="body-md" weight="medium">
                {genre}
              </Text>
              <Text variant="body-sm" color="subtle">
                Curated picks this week
              </Text>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
