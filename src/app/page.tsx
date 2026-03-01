import { Box, Text } from 'tharaday';

import { NewArrivalsWidget } from './_components/home/NewArrivalsWidget';

export default function HomePage() {
  return (
    <Box display="flex" flexDirection="column" gap={8} paddingY="48px">
      <Text variant="h1" weight="bold">
        Welcome to Tharaday Books bookstore!
      </Text>

      <NewArrivalsWidget />
    </Box>
  );
}
