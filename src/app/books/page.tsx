'use client';

import { Box, Text } from 'tharaday';

import { BooksFilters } from './_components/BooksFilters';
import { BooksList } from './_components/BooksList';
import { useBookFilters } from './_hooks/useBookFilters';
import { useBooks } from './_hooks/useBooks';

export default function BooksPage() {
  const { books, isLoading, error } = useBooks();
  const {
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
  } = useBookFilters(books);

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Text variant="h1" weight="bold">
        Books
      </Text>

      <BooksFilters
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedAuthor={selectedAuthor}
        selectedSort={selectedSort}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        authorOptions={authorOptions}
        sortOptions={sortOptions}
        onSearchQueryChange={setSearchQuery}
        onSelectedTypeChange={setSelectedType}
        onSelectedStatusChange={setSelectedStatus}
        onSelectedAuthorChange={setSelectedAuthor}
        onSelectedSortChange={setSelectedSort}
        onClear={clearFilters}
      />

      {!isLoading && !error ? (
        <Text variant="body-sm" color="subtle">
          {filteredBooks.length} result{filteredBooks.length === 1 ? '' : 's'}
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

      {!isLoading && !error && filteredBooks.length === 0 ? (
        <Text variant="body-md" color="subtle">
          No books match the current filters.
        </Text>
      ) : null}

      <BooksList books={filteredBooks} />
    </Box>
  );
}
