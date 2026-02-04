'use client';

import { Box, Button, Modal } from 'tharaday';

import { PublisherForm } from './PublisherForm';
import { PublisherFormType } from './PublisherForm.types';

type PublisherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: PublisherFormType;
  setForm: (form: PublisherFormType) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
};

export function PublisherModal({
  isOpen,
  onClose,
  title,
  form,
  setForm,
  onSubmit,
  submitLabel,
  isLoading,
}: PublisherModalProps) {
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
      <PublisherForm form={form} setForm={setForm} />
    </Modal>
  );
}
