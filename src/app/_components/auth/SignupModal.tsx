'use client';

import { Box, Button, Input, Modal, Select, SelectOption } from 'tharaday';

import type { Role } from './LoginModal';

export type SignupFormState = {
  name: string;
  email: string;
  role: Role;
};

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  form: SignupFormState;
  setForm: (next: SignupFormState) => void;
  roleOptions: SelectOption[];
  onSubmit: () => void;
};

export function SignupModal({
  isOpen,
  onClose,
  form,
  setForm,
  roleOptions,
  onSubmit,
}: SignupModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      size="sm"
      footer={
        <Box display="flex" gap={3} justifyContent="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" intent="info" onClick={onSubmit}>
            Create account
          </Button>
        </Box>
      }
    >
      <Box display="flex" flexDirection="column" gap={4}>
        <Input
          label="Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Select
          label="Account type"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
          options={roleOptions}
          required
        />
      </Box>
    </Modal>
  );
}
