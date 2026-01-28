'use client';

import { Box, Button, Text, Card, CardHeader, CardContent } from '@wyrobowa/design-system';

import { ItemForm } from './_components/ItemForm';
import { ItemGrid } from './_components/ItemGrid';
import { useItems } from './_hooks/useItems';

export default function ItemsPage() {
  const {
    itemTypes,
    statuses,
    priorities,
    items,
    isLoading,
    editingItem,
    form,
    setForm,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    handleDeleteItem,
    startEdit,
  } = useItems();

  return (
    <Box paddingY={8}>
      <Box 
        display="flex" 
        flexDirection="column" 
        gap={2}
        paddingBottom={8}
      >
        <Text variant="h1" weight="bold">Tasks list</Text>
        <Text variant="body-md" color="subtle">
          TO-DO like list
        </Text>
      </Box>

      <Box display="grid" gridTemplateColumns="350px 1fr" gap={8}>
        {/* Left Side: Form */}
        <Box>
          <Card bordered shadow="sm">
            <CardHeader title={editingItem ? 'Edit item' : 'Add new item'} />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                <ItemForm 
                  form={form} 
                  setForm={setForm} 
                  itemTypes={itemTypes} 
                  statuses={statuses}
                  priorities={priorities}
                />
                <Box display="flex" gap={3}>
                  <Button 
                    variant="solid" 
                    intent="info" 
                    fullWidth
                    onClick={editingItem ? handleEditItem : handleAddItem}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : (editingItem ? 'Update' : 'Create')}
                  </Button>
                  {editingItem && (
                    <Button 
                      variant="outline" 
                      intent="neutral" 
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side: List */}
        <Box>
          <ItemGrid
            items={items}
            editingItem={editingItem}
            isLoading={isLoading}
            onEdit={startEdit}
            onDelete={handleDeleteItem}
          />
        </Box>
      </Box>
    </Box>
  );
}
