'use client';

import { Box, Input } from 'tharaday';

import { AuthorFormProps } from './AuthorForm.types';

export function AuthorForm({ form, setForm }: AuthorFormProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Input
        label="First name"
        placeholder="Enter first name"
        value={form.first_name}
        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
      />
      <Input
        label="Last name"
        placeholder="Enter last name"
        value={form.last_name}
        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
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
