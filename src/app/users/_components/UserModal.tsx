'use client';

import { Box, Button, Modal } from '@wyrobowa/design-system';

import { UserModalProps } from '@/app/users/_components/UserModal.types';

import { UserForm } from './UserForm';

export function UserModal({
  isOpen,
  onClose,
  title,
  form,
  setForm,
  roles,
  statuses,
  onSubmit,
  submitLabel,
  isLoading,
}: UserModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      isLoading={isLoading}
      footer={
        <Box display="flex" gap={4} justifyContent="flex-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button variant="solid" intent="info" onClick={onSubmit} disabled={isLoading}>{isLoading ? 'Saving...' : submitLabel}</Button>
        </Box>
      }
    >
      <UserForm form={form} setForm={setForm} roles={roles} statuses={statuses} />
    </Modal>
  );
}
