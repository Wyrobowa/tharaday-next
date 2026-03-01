'use client';

import { useMemo, useState } from 'react';

import { BookFiltersMetadata } from './useBookFilterMetadata';

type FilterOption = { value: string; label: string };

export function useBookFilters(metadata: BookFiltersMetadata) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');

  const typeOptions = useMemo<FilterOption[]>(() => {
    return [
      { value: '', label: 'All types' },
      ...metadata.types.map((type) => ({ value: type, label: type })),
    ];
  }, [metadata.types]);

  const authorOptions = useMemo<FilterOption[]>(() => {
    return [
      { value: '', label: 'All authors' },
      ...metadata.authors.map((author) => ({ value: author, label: author })),
    ];
  }, [metadata.authors]);

  const priorityOptions = useMemo<FilterOption[]>(() => {
    return [
      { value: '', label: 'All priorities' },
      ...metadata.priorities.map((priority) => ({
        value: priority,
        label: priority,
      })),
    ];
  }, [metadata.priorities]);

  const sortOptions = useMemo<FilterOption[]>(
    () => [
      { value: 'newest', label: 'Newest first' },
      { value: 'title_asc', label: 'Title (A-Z)' },
      { value: 'title_desc', label: 'Title (Z-A)' },
      { value: 'author_asc', label: 'Author (A-Z)' },
      { value: 'author_desc', label: 'Author (Z-A)' },
    ],
    [],
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedPriority('');
    setSelectedAuthor('');
    setSelectedSort('newest');
  };

  return {
    searchQuery,
    selectedType,
    selectedPriority,
    selectedAuthor,
    selectedSort,
    typeOptions,
    priorityOptions,
    authorOptions,
    sortOptions,
    setSearchQuery,
    setSelectedType,
    setSelectedPriority,
    setSelectedAuthor,
    setSelectedSort,
    clearFilters,
  };
}
