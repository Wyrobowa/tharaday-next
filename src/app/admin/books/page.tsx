'use client';

import { Box, Button, Text, Card, CardHeader, CardContent } from 'tharaday';

import { BookForm } from './_components/BookForm';
import { BookGrid } from './_components/BookGrid';
import { useBooks } from './_hooks/useBooks';

export default function BooksPage() {
  const {
    tags,
    statuses,
    priorities,
    authors,
    publishers,
    books,
    isLoading,
    editingBook,
    form,
    setForm,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    handleDeleteItem,
    startEdit,
  } = useBooks();

  return (
    <Box paddingY={8}>
      <Box display="flex" flexDirection="column" gap={2} paddingBottom={8}>
        <Text variant="h1" weight="bold">
          Listings moderation
        </Text>
        <Text variant="body-md" color="subtle">
          Review and maintain book listings across the marketplace.
        </Text>
      </Box>

      <Box display="grid" gridTemplateColumns="350px 1fr" gap={8}>
        {/* Left Side: Form */}
        <Box>
          <Card bordered shadow="sm">
            <CardHeader
              title={editingBook ? 'Edit listing' : 'Add new listing'}
            />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={6}>
                <BookForm
                  form={form}
                  setForm={setForm}
                  tags={tags}
                  statuses={statuses}
                  priorities={priorities}
                  authors={authors}
                  publishers={publishers}
                />
                <Box display="flex" gap={3}>
                  <Button
                    variant="solid"
                    intent="info"
                    fullWidth
                    onClick={editingBook ? handleEditItem : handleAddItem}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Processing...'
                      : editingBook
                        ? 'Update listing'
                        : 'Create listing'}
                  </Button>
                  {editingBook && (
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
          <BookGrid
            books={books}
            editingBook={editingBook}
            isLoading={isLoading}
            onEdit={startEdit}
            onDelete={handleDeleteItem}
          />
        </Box>
      </Box>
    </Box>
  );
}
