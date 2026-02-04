'use client';

import { Box, Input, Select, SelectOption } from 'tharaday';

import { BookFormProps } from './BookForm.types';

export function BookForm({
  form,
  setForm,
  tags,
  statuses,
  priorities,
  authors,
  publishers,
}: BookFormProps) {
  const tagOptions: SelectOption[] = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const authorOptions: SelectOption[] = authors.map((author) => ({
    value: author.id,
    label:
      [author.first_name, author.last_name].filter(Boolean).join(' ').trim() ||
      `Author ${author.id}`,
  }));

  const publisherOptions: SelectOption[] = publishers.map((publisher) => ({
    value: publisher.id,
    label: publisher.name || `Publisher ${publisher.id}`,
  }));

  const statusOptions: SelectOption[] = statuses.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const priorityOptions: SelectOption[] = priorities.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Input
        label="Title"
        placeholder="Enter title"
        value={form.name || ''}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Select
        label="Tag"
        value={form.tag_id ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            tag_id: e.target.value === '' ? null : Number(e.target.value),
          })
        }
        options={[{ value: '', label: '--- Select tag ---' }, ...tagOptions]}
        required
      />
      <Select
        label="Status"
        value={form.status_id ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            status_id: e.target.value === '' ? null : Number(e.target.value),
          })
        }
        options={[
          { value: '', label: '--- Select status ---' },
          ...statusOptions,
        ]}
        required
      />
      <Select
        label="Priority"
        value={form.priority_id ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            priority_id: e.target.value === '' ? null : Number(e.target.value),
          })
        }
        options={[
          { value: '', label: '--- Select priority ---' },
          ...priorityOptions,
        ]}
        required
      />
      <Select
        label="Author"
        value={form.author_id ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            author_id: e.target.value === '' ? null : Number(e.target.value),
          })
        }
        options={[
          { value: '', label: '--- Select author ---' },
          ...authorOptions,
        ]}
        required
      />
      <Select
        label="Publisher"
        value={form.publisher_id ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            publisher_id: e.target.value === '' ? null : Number(e.target.value),
          })
        }
        options={[
          { value: '', label: '--- Select publisher ---' },
          ...publisherOptions,
        ]}
        required
      />
      <Input
        label="Pages"
        placeholder="Enter number of pages"
        type="number"
        value={form.pages ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            pages: e.target.value === '' ? null : Number(e.target.value),
          })
        }
      />
    </Box>
  );
}
