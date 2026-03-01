'use client';

import { useMemo, useState } from 'react';

import { BookRecord } from '../types';
import { getAuthorName } from '../utils';

type FilterOption = { value: string; label: string };

export function useBookFilters(books: BookRecord[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const typeOptions = useMemo<FilterOption[]>(() => {
    const uniqueTypes = Array.from(
      new Set(books.map((book) => book.type).filter(Boolean)),
    ) as string[];

    return [
      { value: '', label: 'All types' },
      ...uniqueTypes.map((type) => ({ value: type, label: type })),
    ];
  }, [books]);

  const statusOptions = useMemo<FilterOption[]>(() => {
    const uniqueStatuses = Array.from(
      new Set(books.map((book) => book.status).filter(Boolean)),
    ) as string[];

    return [
      { value: '', label: 'All statuses' },
      ...uniqueStatuses.map((status) => ({ value: status, label: status })),
    ];
  }, [books]);

  const authorOptions = useMemo<FilterOption[]>(() => {
    const uniqueAuthors = Array.from(new Set(books.map(getAuthorName)));

    return [
      { value: '', label: 'All authors' },
      ...uniqueAuthors.map((author) => ({ value: author, label: author })),
    ];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      const authorName = getAuthorName(book).toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        book.name.toLowerCase().includes(normalizedQuery) ||
        authorName.includes(normalizedQuery);

      const matchesType = !selectedType || book.type === selectedType;
      const matchesStatus = !selectedStatus || book.status === selectedStatus;
      const matchesAuthor =
        !selectedAuthor || getAuthorName(book) === selectedAuthor;

      return matchesQuery && matchesType && matchesStatus && matchesAuthor;
    });
  }, [books, searchQuery, selectedType, selectedStatus, selectedAuthor]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedAuthor('');
  };

  return {
    searchQuery,
    selectedType,
    selectedStatus,
    selectedAuthor,
    typeOptions,
    statusOptions,
    authorOptions,
    filteredBooks,
    setSearchQuery,
    setSelectedType,
    setSelectedStatus,
    setSelectedAuthor,
    clearFilters,
  };
}
