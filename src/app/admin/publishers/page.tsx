'use client';

import { Box, Button, Text } from 'tharaday';

import { PublisherModal } from './_components/PublisherModal';
import { PublisherTable } from './_components/PublisherTable';
import { usePublishers } from './_hooks/usePublishers';

export default function PublishersPage() {
  const {
    publishers,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddPublisher,
    handleEditPublisher,
    handleDeletePublisher,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  } = usePublishers();

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
            Publishers
          </Text>
          <Text variant="body-sm" color="subtle">
            Maintain publisher records for book listings.
          </Text>
        </Box>
        <Button
          variant="solid"
          intent="info"
          onClick={openAddModal}
          disabled={isLoading}
        >
          Add publisher
        </Button>
      </Box>

      <PublisherTable
        publishers={publishers}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDeletePublisher}
      />

      <PublisherModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Publisher"
        form={form}
        setForm={setForm}
        onSubmit={handleAddPublisher}
        submitLabel="Confirm"
        isLoading={isLoading}
      />

      <PublisherModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Publisher"
        form={form}
        setForm={setForm}
        onSubmit={handleEditPublisher}
        submitLabel="Confirm"
        isLoading={isLoading}
      />
    </Box>
  );
}
