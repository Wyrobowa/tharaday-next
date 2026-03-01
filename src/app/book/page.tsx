import { Suspense } from 'react';
import { Box, Text } from 'tharaday';

import { BookPageClient } from './BookPageClient';

function LoadingState() {
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Text variant="body-md" color="subtle">
        Loading book...
      </Text>
    </Box>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BookPageClient />
    </Suspense>
  );
}
