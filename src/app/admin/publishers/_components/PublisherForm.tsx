'use client';

import { Box, Input } from 'tharaday';

import { PublisherFormProps } from './PublisherForm.types';

export function PublisherForm({ form, setForm }: PublisherFormProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Input
        label="Name"
        placeholder="Enter publisher name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Country"
        placeholder="Enter country"
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
      />
    </Box>
  );
}
