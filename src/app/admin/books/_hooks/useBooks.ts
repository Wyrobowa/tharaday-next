import { useEffect, useState } from 'react';

import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';

import { BookFormType } from '../_components/BookForm.types';
import { Author, BookRow, Priority, Publisher, Status, Tag } from '../types';

export function useBooks() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [books, setBooks] = useState<BookRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingBook, setEditingBook] = useState<BookRow | null>(null);

  const initialForm: BookFormType = {
    name: '',
    tag_id: null,
    status_id: null,
    priority_id: null,
    author_id: null,
    publisher_id: null,
    pages: null,
  };
  const [form, setForm] = useState<BookFormType>(initialForm);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      setBooks(await apiGet<BookRow[]>('/api/books'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (
      form.tag_id === null ||
      form.status_id === null ||
      form.priority_id === null ||
      form.author_id === null ||
      form.publisher_id === null
    ) {
      alert('Tag, status, priority, author, and publisher are required.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPost('/api/books', {
        name: form.name ? form.name.trim() : null,
        tag_id: form.tag_id,
        status_id: form.status_id,
        priority_id: form.priority_id,
        author_id: form.author_id,
        publisher_id: form.publisher_id,
        pages: form.pages,
      });

      await fetchItems();
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async () => {
    if (!editingBook) return;
    if (
      form.tag_id === null ||
      form.status_id === null ||
      form.priority_id === null ||
      form.author_id === null ||
      form.publisher_id === null
    ) {
      alert('Tag, status, priority, author, and publisher are required.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPatch('/api/books', {
        id: editingBook.id,
        name: form.name ? form.name.trim() : null,
        tag_id: form.tag_id,
        status_id: form.status_id,
        priority_id: form.priority_id,
        author_id: form.author_id,
        publisher_id: form.publisher_id,
        pages: form.pages,
      });

      await fetchItems();
      setEditingBook(null);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setForm(initialForm);
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    setIsLoading(true);
    try {
      await apiDelete(`/api/books?id=${id}`);
      await fetchItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove book');
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (book: BookRow) => {
    setEditingBook(book);
    setForm({
      name: book.name,
      tag_id: book.tag_id ?? null,
      status_id: book.status_id ?? null,
      priority_id: book.priority_id ?? null,
      author_id: book.author_id ?? null,
      publisher_id: book.publisher_id ?? null,
      pages: book.pages ?? null,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const [
          tagData,
          statusesData,
          priorityData,
          authorData,
          publisherData,
          booksData,
        ] = await Promise.all([
          apiGet<Tag[]>('/api/tags'),
          apiGet<Status[]>('/api/statuses'),
          apiGet<Priority[]>('/api/priorities'),
          apiGet<Author[]>('/api/authors'),
          apiGet<Publisher[]>('/api/publishers'),
          apiGet<BookRow[]>('/api/books'),
        ]);
        setTags(tagData);
        setStatuses(statusesData);
        setPriorities(priorityData);
        setAuthors(authorData);
        setPublishers(publisherData);
        setBooks(booksData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    tags,
    statuses,
    priorities,
    authors,
    publishers,
    books,
    isLoading,
    editingBook,
    form,
    setForm,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    handleDeleteItem,
    startEdit,
  };
}
