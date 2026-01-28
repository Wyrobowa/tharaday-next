'use client';

import { Box, Input, Select, SelectOption } from '@wyrobowa/design-system';

import { UserFormProps } from './UserForm.types';

export function UserForm({ form, setForm, roles, statuses }: UserFormProps) {
  const roleOptions: SelectOption[] = roles.map((r) => ({
    value: r.id,
    label: r.name,
  }));

  const statusOptions: SelectOption[] = statuses.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Input
        label="Name"
        placeholder="Enter name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        label="Email"
        placeholder="Enter email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Select
        label="Role"
        value={form.role_id}
        onChange={(e) => setForm({ ...form, role_id: e.target.value === '' ? '' : Number(e.target.value) })}
        options={[{ value: '', label: 'Select role' }, ...roleOptions]}
        required
      />
      <Select
        label="Status"
        value={form.status_id}
        onChange={(e) => setForm({ ...form, status_id: e.target.value === '' ? '' : Number(e.target.value) })}
        options={[{ value: '', label: 'Select status' }, ...statusOptions]}
        required
      />
    </Box>
  );
}
