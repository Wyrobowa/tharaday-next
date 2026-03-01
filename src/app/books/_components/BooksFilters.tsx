'use client';

import { Button, Input, Select } from 'tharaday';

type Option = { value: string; label: string };

type BooksFiltersProps = {
  searchQuery: string;
  selectedType: string;
  selectedStatus: string;
  selectedAuthor: string;
  typeOptions: Option[];
  statusOptions: Option[];
  authorOptions: Option[];
  onSearchQueryChange: (value: string) => void;
  onSelectedTypeChange: (value: string) => void;
  onSelectedStatusChange: (value: string) => void;
  onSelectedAuthorChange: (value: string) => void;
  onClear: () => void;
};

export function BooksFilters({
  searchQuery,
  selectedType,
  selectedStatus,
  selectedAuthor,
  typeOptions,
  statusOptions,
  authorOptions,
  onSearchQueryChange,
  onSelectedTypeChange,
  onSelectedStatusChange,
  onSelectedAuthorChange,
  onClear,
}: BooksFiltersProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 12,
        alignItems: 'flex-end',
      }}
    >
      <Input
        label="Search"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
      />
      <Select
        label="Type"
        value={selectedType}
        options={typeOptions}
        onChange={(event) => onSelectedTypeChange(event.target.value)}
      />
      <Select
        label="Status"
        value={selectedStatus}
        options={statusOptions}
        onChange={(event) => onSelectedStatusChange(event.target.value)}
      />
      <Select
        label="Author"
        value={selectedAuthor}
        options={authorOptions}
        onChange={(event) => onSelectedAuthorChange(event.target.value)}
      />
      <Button variant="outline" intent="neutral" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
