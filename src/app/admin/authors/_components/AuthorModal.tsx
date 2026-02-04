'use client';

import { Box, Button, Modal } from 'tharaday';

import { AuthorForm } from './AuthorForm';
import { AuthorFormType } from './AuthorForm.types';

type AuthorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: AuthorFormType;
  setForm: (form: AuthorFormType) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
};

export function AuthorModal({
  isOpen,
  onClose,
  title,
  form,
  setForm,
  onSubmit,
  submitLabel,
  isLoading,
}: AuthorModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      isLoading={isLoading}
      footer={
        <Box display="flex" gap={4} justifyContent="flex-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="solid"
            intent="info"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
        </Box>
      }
    >
      <AuthorForm form={form} setForm={setForm} />
    </Modal>
  );
}
