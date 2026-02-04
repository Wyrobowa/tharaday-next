'use client';

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Text,
  Badge,
  Button,
  Loader,
} from 'tharaday';

import { BookGridProps } from '@/app/admin/books/_components/BookGrid.types';
import { getStatusBadgeIntent } from '@/helpers/status';
import { capitalizeFirstLetter } from '@/helpers/text';

export function BookGrid({
  books,
  editingBook,
  isLoading,
  onEdit,
  onDelete,
}: BookGridProps) {
  if (isLoading && books.length === 0) {
    return (
      <Box display="flex" justifyContent="center" padding={12}>
        <Loader size="lg" />
      </Box>
    );
  }

  const isEditingItem = (id: number) => editingBook?.id === id;

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      style={{
        opacity: isLoading ? 0.7 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {books.map((book) => (
        <Card
          key={book.id}
          bordered
          shadow={isEditingItem(book.id) ? 'md' : 'sm'}
          borderColor={isEditingItem(book.id) ? 'main' : 'subtle'}
        >
          <CardHeader title={book.name} />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Tag
                </Text>
                <Text variant="body-md" weight="medium">
                  {capitalizeFirstLetter(book.type || '')}
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Author
                </Text>
                <Text variant="body-md" weight="medium">
                  {[book.author_first_name, book.author_last_name]
                    .filter(Boolean)
                    .join(' ') || 'Unknown'}
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Publisher
                </Text>
                <Text variant="body-md" weight="medium">
                  {book.publisher || 'Unknown'}
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Pages
                </Text>
                <Text variant="body-md" weight="medium">
                  {book.pages ?? '—'}
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Status
                </Text>
                <Badge
                  intent={getStatusBadgeIntent(book.status || '')}
                  variant="subtle"
                >
                  {capitalizeFirstLetter(book.status || '')}
                </Badge>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Priority
                </Text>
                <Badge
                  intent={
                    book.priority === 'high'
                      ? 'danger'
                      : book.priority === 'medium'
                        ? 'warning'
                        : 'info'
                  }
                  variant="subtle"
                >
                  {capitalizeFirstLetter(book.priority || 'medium')}
                </Badge>
              </Box>
              <Box display="flex" gap={2} paddingTop={4}>
                <Box flexGrow={1}>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="neutral"
                    fullWidth
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </Button>
                </Box>
                <Box flexGrow={1}>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="danger"
                    fullWidth
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
