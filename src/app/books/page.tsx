'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Text } from 'tharaday';

import { BooksFilters } from './_components/BooksFilters';
import { BooksList } from './_components/BooksList';
import { useBookFilterMetadata } from './_hooks/useBookFilterMetadata';
import { useBookFilters } from './_hooks/useBookFilters';
import { useBooks } from './_hooks/useBooks';

export default function BooksPage() {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const {
    metadata,
    isLoading: isLoadingFilterMetadata,
    error: filterMetadataError,
  } = useBookFilterMetadata();

  const {
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
    setSearchQuery,
    setSelectedType,
    setSelectedStatus,
    setSelectedPriority,
    setSelectedAuthor,
    setSelectedSort,
    clearFilters,
  } = useBookFilters(metadata);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const { books, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useBooks({
      q: debouncedSearchQuery,
      type: selectedType,
      status: selectedStatus,
      priority: selectedPriority,
      author: selectedAuthor,
      sort: selectedSort as
        | 'newest'
        | 'title_asc'
        | 'title_desc'
        | 'author_asc'
        | 'author_desc',
      limit: 24,
    });

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Text variant="h1" weight="bold">
        Books
      </Text>

      <BooksFilters
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
        selectedAuthor={selectedAuthor}
        selectedSort={selectedSort}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        priorityOptions={priorityOptions}
        authorOptions={authorOptions}
        sortOptions={sortOptions}
        onSearchQueryChange={setSearchQuery}
        onSelectedTypeChange={setSelectedType}
        onSelectedStatusChange={setSelectedStatus}
        onSelectedPriorityChange={setSelectedPriority}
        onSelectedAuthorChange={setSelectedAuthor}
        onSelectedSortChange={setSelectedSort}
        onClear={clearFilters}
      />

      {isLoadingFilterMetadata ? (
        <Text variant="body-sm" color="subtle">
          Loading filter options...
        </Text>
      ) : null}

      {filterMetadataError ? (
        <Text variant="body-sm" color="danger">
          {filterMetadataError}
        </Text>
      ) : null}

      {!isLoading && !error ? (
        <Text variant="body-sm" color="subtle">
          Loaded {books.length} book{books.length === 1 ? '' : 's'}
        </Text>
      ) : null}

      {isLoading ? (
        <Text variant="body-md" color="subtle">
          Loading books...
        </Text>
      ) : null}

      {error ? (
        <Text variant="body-md" color="danger">
          {error}
        </Text>
      ) : null}

      {!isLoading && !error && books.length === 0 ? (
        <Text variant="body-md" color="subtle">
          No books match the current filters.
        </Text>
      ) : null}

      <BooksList books={books} />

      {!isLoading && !error && hasMore ? (
        <Box>
          <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading more...' : 'Load more'}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
