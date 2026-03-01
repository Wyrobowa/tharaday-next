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
  const [selectedSort, setSelectedSort] = useState('newest');

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

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const onlyMatchingBooks = books.filter((book) => {
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

    return [...onlyMatchingBooks].sort((a, b) => {
      if (selectedSort === 'title_asc') {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === 'title_desc') {
        return b.name.localeCompare(a.name);
      }
      if (selectedSort === 'author_asc') {
        return getAuthorName(a).localeCompare(getAuthorName(b));
      }
      if (selectedSort === 'author_desc') {
        return getAuthorName(b).localeCompare(getAuthorName(a));
      }
      return b.id - a.id;
    });
  }, [
    books,
    searchQuery,
    selectedType,
    selectedStatus,
    selectedAuthor,
    selectedSort,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedAuthor('');
    setSelectedSort('newest');
  };

  return {
    searchQuery,
    selectedType,
    selectedStatus,
    selectedAuthor,
    selectedSort,
    typeOptions,
    statusOptions,
    authorOptions,
    sortOptions,
    filteredBooks,
    setSearchQuery,
    setSelectedType,
    setSelectedStatus,
    setSelectedAuthor,
    setSelectedSort,
    clearFilters,
  };
}
