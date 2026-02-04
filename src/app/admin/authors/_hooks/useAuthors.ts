'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';

import { AuthorFormType } from '../_components/AuthorForm.types';
import { AuthorRow } from '../types';

export function useAuthors() {
  const [authors, setAuthors] = useState<AuthorRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorRow | null>(null);

  const initialForm = useMemo<AuthorFormType>(
    () => ({
      first_name: '',
      last_name: '',
      country: '',
    }),
    [],
  );
  const [form, setForm] = useState<AuthorFormType>(initialForm);

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      setAuthors(await apiGet<AuthorRow[]>('/api/authors'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAuthor = async () => {
    if (
      !form.first_name.trim() &&
      !form.last_name.trim() &&
      !form.country.trim()
    ) {
      alert('Provide at least one field.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPost('/api/authors', {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        country: form.country.trim(),
      });
      await fetchAuthors();
      setIsAddModalOpen(false);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add author');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAuthor = async () => {
    if (!editingAuthor) return;
    if (
      !form.first_name.trim() &&
      !form.last_name.trim() &&
      !form.country.trim()
    ) {
      alert('Provide at least one field.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPatch('/api/authors', {
        id: editingAuthor.id,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        country: form.country.trim(),
      });
      await fetchAuthors();
      setIsEditModalOpen(false);
      setEditingAuthor(null);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update author');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAuthor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    setIsLoading(true);
    try {
      await apiDelete(`/api/authors?id=${id}`);
      await fetchAuthors();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove author');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = useCallback(() => {
    setForm(initialForm);
    setIsAddModalOpen(true);
  }, [initialForm]);

  const openEditModal = useCallback((author: AuthorRow) => {
    setEditingAuthor(author);
    setForm({
      first_name: author.first_name || '',
      last_name: author.last_name || '',
      country: author.country || '',
    });
    setIsEditModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);
  const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddAuthor,
    handleEditAuthor,
    handleDeleteAuthor,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  };
}
