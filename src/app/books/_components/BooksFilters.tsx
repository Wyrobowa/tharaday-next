'use client';

import { useState } from 'react';
import { Box, Button, Input, Select } from 'tharaday';

import styles from './BooksFilters.module.css';

type Option = { value: string; label: string };

type BooksFiltersProps = {
  searchQuery: string;
  selectedType: string;
  selectedStatus: string;
  selectedPriority: string;
  selectedAuthor: string;
  selectedSort: string;
  typeOptions: Option[];
  statusOptions: Option[];
  priorityOptions: Option[];
  authorOptions: Option[];
  sortOptions: Option[];
  onSearchQueryChange: (value: string) => void;
  onSelectedTypeChange: (value: string) => void;
  onSelectedStatusChange: (value: string) => void;
  onSelectedPriorityChange: (value: string) => void;
  onSelectedAuthorChange: (value: string) => void;
  onSelectedSortChange: (value: string) => void;
  onClear: () => void;
};

export function BooksFilters({
  searchQuery,
  selectedType,
  selectedStatus,
  selectedPriority,
  selectedAuthor,
  selectedSort,
  typeOptions,
  statusOptions,
  priorityOptions,
  authorOptions,
  sortOptions,
  onSearchQueryChange,
  onSelectedTypeChange,
  onSelectedStatusChange,
  onSelectedPriorityChange,
  onSelectedAuthorChange,
  onSelectedSortChange,
  onClear,
}: BooksFiltersProps) {
  const [areAdvancedFiltersVisible, setAreAdvancedFiltersVisible] =
    useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Input
          label="Search"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          fullWidth
        />
        <Button
          variant="subtle"
          intent="neutral"
          size="sm"
          className={styles.advancedToggle}
          onClick={() =>
            setAreAdvancedFiltersVisible(!areAdvancedFiltersVisible)
          }
        >
          {areAdvancedFiltersVisible
            ? '▴ Hide advanced filters'
            : '▾ Show advanced filters'}
        </Button>
      </Box>

      {areAdvancedFiltersVisible ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          gap={3}
          alignItems="flex-end"
        >
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
            label="Priority"
            value={selectedPriority}
            options={priorityOptions}
            onChange={(event) => onSelectedPriorityChange(event.target.value)}
          />
          <Select
            label="Author"
            value={selectedAuthor}
            options={authorOptions}
            onChange={(event) => onSelectedAuthorChange(event.target.value)}
          />
          <Select
            label="Sort by"
            value={selectedSort}
            options={sortOptions}
            onChange={(event) => onSelectedSortChange(event.target.value)}
          />
          <Button variant="outline" intent="neutral" onClick={onClear}>
            Clear filters
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
