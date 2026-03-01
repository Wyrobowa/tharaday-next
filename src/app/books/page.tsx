'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Loader, Text } from 'tharaday';

import { BooksFilters } from './_components/BooksFilters';
import { BooksList } from './_components/BooksList';
import { useBookFilterMetadata } from './_hooks/useBookFilterMetadata';
import { useBookFilters } from './_hooks/useBookFilters';
import { useBooks } from './_hooks/useBooks';
import styles from './page.module.css';

export default function BooksPage() {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    metadata,
    isLoading: isLoadingFilterMetadata,
    error: filterMetadataError,
  } = useBookFilterMetadata();

  const {
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
  } = useBookFilters(metadata);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const { books, isLoading, isLoadingMore, error, hasMore, total, loadMore } =
    useBooks({
      q: debouncedSearchQuery,
      type: selectedType,
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

  useEffect(() => {
    if (!hasMore || isLoading || isLoadingMore) {
      return;
    }

    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '300px 0px',
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <BooksFilters
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedPriority={selectedPriority}
        selectedAuthor={selectedAuthor}
        selectedSort={selectedSort}
        typeOptions={typeOptions}
        priorityOptions={priorityOptions}
        authorOptions={authorOptions}
        sortOptions={sortOptions}
        onSearchQueryChange={setSearchQuery}
        onSelectedTypeChange={setSelectedType}
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
          {typeof total === 'number'
            ? `Showing ${books.length} of ${total} books`
            : `Showing ${books.length} books`}
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
        <>
          <div ref={loadMoreSentinelRef} className={styles.loadMoreSentinel} />
          {isLoadingMore ? (
            <Box display="flex" justifyContent="center" paddingY={2}>
              <Loader size="md" intent="neutral" />
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  );
}
