import { Box, Text } from 'tharaday';

import { SiteHeader } from './_components/layout/SiteHeader';

export default function HomePage() {
  return (
    <Box as="div" marginX="auto" paddingX={4}>
      <SiteHeader />

      <Box as="section" paddingY={12}>
        <Text variant="h1" weight="bold">
          Welcome to Tharaday Books bookstore!
        </Text>
      </Box>
    </Box>
  );
}
