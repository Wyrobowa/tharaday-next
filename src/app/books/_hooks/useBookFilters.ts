'use client';

import { useMemo, useState } from 'react';

import { BookRecord } from '../types';
import { getAuthorName, getBookTitle } from '../utils';

type FilterOption = { value: string; label: string };

export function useBookFilters(books: BookRecord[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
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

  const priorityOptions = useMemo<FilterOption[]>(() => {
    const uniquePriorities = Array.from(
      new Set(books.map((book) => book.priority).filter(Boolean)),
    ) as string[];

    return [
      { value: '', label: 'All priorities' },
      ...uniquePriorities.map((priority) => ({
        value: priority,
        label: priority,
      })),
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
        getBookTitle(book).toLowerCase().includes(normalizedQuery) ||
        authorName.includes(normalizedQuery) ||
        (book.description || '').toLowerCase().includes(normalizedQuery) ||
        (book.publisher || '').toLowerCase().includes(normalizedQuery);

      const matchesType = !selectedType || book.type === selectedType;
      const matchesStatus = !selectedStatus || book.status === selectedStatus;
      const matchesPriority =
        !selectedPriority || book.priority === selectedPriority;
      const matchesAuthor =
        !selectedAuthor || getAuthorName(book) === selectedAuthor;

      return (
        matchesQuery &&
        matchesType &&
        matchesStatus &&
        matchesPriority &&
        matchesAuthor
      );
    });

    return [...onlyMatchingBooks].sort((a, b) => {
      if (selectedSort === 'title_asc') {
        return getBookTitle(a).localeCompare(getBookTitle(b));
      }
      if (selectedSort === 'title_desc') {
        return getBookTitle(b).localeCompare(getBookTitle(a));
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
    selectedPriority,
    selectedAuthor,
    selectedSort,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedPriority('');
    setSelectedAuthor('');
    setSelectedSort('newest');
  };

  return {
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
    filteredBooks,
    setSearchQuery,
    setSelectedType,
    setSelectedStatus,
    setSelectedPriority,
    setSelectedAuthor,
    setSelectedSort,
    clearFilters,
  };
}
