'use client';

import { Box, Input, Select, SelectOption } from '@wyrobowa/design-system';

import { ItemFormProps } from './ItemForm.types';

export function ItemForm({ form, setForm, itemTypes, statuses, priorities }: ItemFormProps) {
  const typeOptions: SelectOption[] = itemTypes.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const statusOptions: SelectOption[] = statuses.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const prioritiesOptions: SelectOption[] = priorities.map((p) => ({
      value: p.id,
      label: p.name,
  }));

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Input
        label="Title"
        placeholder="Enter title"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Select
        label="Type"
        value={form.type_id}
        onChange={(e) => setForm({ ...form, type_id: e.target.value === '' ? '' : Number(e.target.value) })}
        options={[{ value: '', label: '--- Select type ---' }, ...typeOptions]}
        required
      />
      <Select
        label="Status"
        value={form.status_id}
        onChange={(e) => setForm({ ...form, status_id: e.target.value === '' ? '' : Number(e.target.value) })}
        options={[{ value: '', label: '--- Select status ---' }, ...statusOptions]}
        required
      />
      <Select
        label="Priority"
        value={form.priority_id}
        onChange={(e) => setForm({ ...form, priority_id: e.target.value === '' ? '' : Number(e.target.value) })}
        options={[{ value: '', label: '--- Select priority ---' }, ...prioritiesOptions]}
        required
      />
    </Box>
  );
}
