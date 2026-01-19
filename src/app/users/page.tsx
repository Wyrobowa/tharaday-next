'use client';

import { Box, Button, Text } from 'ds-creator';

import { UserModal } from './_components/UserModal';
import { UserTable } from './_components/UserTable';
import { useUsers } from './_hooks/useUsers';

export default function UsersPage() {
  const {
    roles,
    statuses,
    users,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  } = useUsers();

  return (
    <Box paddingY={8}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        paddingBottom={8}
      >
        <Box display="flex" alignItems="center" gap={4}>
          <Text variant="h1" weight="bold">Users Directory</Text>
        </Box>
        <Button 
          variant="solid" 
          intent="info" 
          onClick={openAddModal}
          disabled={isLoading}
        >
          Add New User
        </Button>
      </Box>

      <UserTable
        users={users}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDeleteUser}
      />

      <UserModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add User"
        form={form}
        setForm={setForm}
        roles={roles}
        statuses={statuses}
        onSubmit={handleAddUser}
        submitLabel="Confirm"
        isLoading={isLoading}
      />

      <UserModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Profile"
        form={form}
        setForm={setForm}
        roles={roles}
        statuses={statuses}
        onSubmit={handleEditUser}
        submitLabel="Confirm"
        isLoading={isLoading}
      />
    </Box>
  );
}
