'use client';

import {
  Box,
  Button,
  Input,
  Modal,
  Select,
  SelectOption,
  Text,
} from 'tharaday';

export type Role = 'customer' | 'seller' | 'admin';

export type LoginFormState = {
  name: string;
  role: Role;
};

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  form: LoginFormState;
  setForm: (next: LoginFormState) => void;
  roleOptions: SelectOption[];
  onSubmit: () => void;
};

export function LoginModal({
  isOpen,
  onClose,
  form,
  setForm,
  roleOptions,
  onSubmit,
}: LoginModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      size="sm"
      footer={
        <Box display="flex" gap={3} justifyContent="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" intent="info" onClick={onSubmit}>
            Log in
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
        <Select
          label="Account type"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
          options={roleOptions}
          required
        />
        <Text variant="body-sm" color="subtle">
          Admin navigation appears only for admin accounts.
        </Text>
      </Box>
    </Modal>
  );
}
