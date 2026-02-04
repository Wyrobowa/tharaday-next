'use client';

import { Box, Button, Text } from 'tharaday';

import { AuthorModal } from './_components/AuthorModal';
import { AuthorTable } from './_components/AuthorTable';
import { useAuthors } from './_hooks/useAuthors';

export default function AuthorsPage() {
  const {
    authors,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddAuthor,
    handleEditAuthor,
    handleDeleteAuthor,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  } = useAuthors();

  return (
    <Box paddingY={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={8}
      >
        <Box display="flex" alignItems="center" gap={4}>
          <Text variant="h1" weight="bold">
            Authors
          </Text>
          <Text variant="body-sm" color="subtle">
            Maintain author records for book listings.
          </Text>
        </Box>
        <Button
          variant="solid"
          intent="info"
          onClick={openAddModal}
          disabled={isLoading}
        >
          Add author
        </Button>
      </Box>

      <AuthorTable
        authors={authors}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDeleteAuthor}
      />

      <AuthorModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Author"
        form={form}
        setForm={setForm}
        onSubmit={handleAddAuthor}
        submitLabel="Confirm"
        isLoading={isLoading}
      />

      <AuthorModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Author"
        form={form}
        setForm={setForm}
        onSubmit={handleEditAuthor}
        submitLabel="Confirm"
        isLoading={isLoading}
      />
    </Box>
  );
}
