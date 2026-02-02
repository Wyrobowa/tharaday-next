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

import { ItemGridProps } from '@/app/items/_components/ItemGrid.types';
import { getStatusBadgeIntent } from '@/helpers/status';
import { capitalizeFirstLetter } from '@/helpers/text';

export function ItemGrid({
  items,
  editingItem,
  isLoading,
  onEdit,
  onDelete,
}: ItemGridProps) {
  if (isLoading && items.length === 0) {
    return (
      <Box display="flex" justifyContent="center" padding={12}>
        <Loader size="lg" />
      </Box>
    );
  }

  const isEditingItem = (id: number) => editingItem?.id === id;

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
      {items.map((item) => (
        <Card
          key={item.id}
          bordered
          shadow={isEditingItem(item.id) ? 'md' : 'sm'}
          borderColor={isEditingItem(item.id) ? 'main' : 'subtle'}
        >
          <CardHeader title={item.name} />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body-sm" color="subtle">
                  Type
                </Text>
                <Text variant="body-md" weight="medium">
                  {capitalizeFirstLetter(item.type || '')}
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
                  intent={getStatusBadgeIntent(item.status)}
                  variant="subtle"
                >
                  {capitalizeFirstLetter(item.status)}
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
                    item.priority === 'high'
                      ? 'danger'
                      : item.priority === 'medium'
                        ? 'warning'
                        : 'info'
                  }
                  variant="subtle"
                >
                  {capitalizeFirstLetter(item.priority || 'medium')}
                </Badge>
              </Box>
              <Box display="flex" gap={2} paddingTop={4}>
                <Box flexGrow={1}>
                  <Button
                    size="sm"
                    variant="outline"
                    intent="neutral"
                    fullWidth
                    onClick={() => onEdit(item)}
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
                    onClick={() => onDelete(item.id)}
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
