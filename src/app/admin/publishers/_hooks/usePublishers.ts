'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';

import { PublisherFormType } from '../_components/PublisherForm.types';
import { PublisherRow } from '../types';

export function usePublishers() {
  const [publishers, setPublishers] = useState<PublisherRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<PublisherRow | null>(
    null,
  );

  const initialForm = useMemo<PublisherFormType>(
    () => ({
      name: '',
      country: '',
    }),
    [],
  );
  const [form, setForm] = useState<PublisherFormType>(initialForm);

  const fetchPublishers = async () => {
    setIsLoading(true);
    try {
      setPublishers(await apiGet<PublisherRow[]>('/api/publishers'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPublisher = async () => {
    if (!form.name.trim() && !form.country.trim()) {
      alert('Provide at least one field.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPost('/api/publishers', {
        name: form.name.trim(),
        country: form.country.trim(),
      });
      await fetchPublishers();
      setIsAddModalOpen(false);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add publisher');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPublisher = async () => {
    if (!editingPublisher) return;
    if (!form.name.trim() && !form.country.trim()) {
      alert('Provide at least one field.');
      return;
    }
    setIsLoading(true);
    try {
      await apiPatch('/api/publishers', {
        id: editingPublisher.id,
        name: form.name.trim(),
        country: form.country.trim(),
      });
      await fetchPublishers();
      setIsEditModalOpen(false);
      setEditingPublisher(null);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update publisher');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePublisher = async (id: number) => {
    if (!confirm('Are you sure you want to delete this publisher?')) return;
    setIsLoading(true);
    try {
      await apiDelete(`/api/publishers?id=${id}`);
      await fetchPublishers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove publisher');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = useCallback(() => {
    setForm(initialForm);
    setIsAddModalOpen(true);
  }, [initialForm]);

  const openEditModal = useCallback((publisher: PublisherRow) => {
    setEditingPublisher(publisher);
    setForm({
      name: publisher.name || '',
      country: publisher.country || '',
    });
    setIsEditModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);
  const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);

  useEffect(() => {
    fetchPublishers();
  }, []);

  return {
    publishers,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddPublisher,
    handleEditPublisher,
    handleDeletePublisher,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  };
}
