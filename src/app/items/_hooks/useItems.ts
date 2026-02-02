import { useEffect, useState } from 'react';

import { apiDelete, apiGet, apiPatch, apiPost } from '@/lib/api';

import { ItemFormType } from '../_components/ItemForm.types';
import { ItemRow, ItemType, Priority, Status } from '../types';

export function useItems() {
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [editingItem, setEditingItem] = useState<ItemRow | null>(null);

  const initialForm: ItemFormType = {
    name: '',
    type_id: '',
    status_id: 1,
    priority_id: 1,
  };
  const [form, setForm] = useState<ItemFormType>(initialForm);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      setItems(await apiGet<ItemRow[]>('/api/items'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    setIsLoading(true);
    try {
      await apiPost('/api/items', {
        name: form.name.trim(),
        type_id: form.type_id === '' ? null : form.type_id,
        status_id: form.status_id === '' ? null : form.status_id,
        priority_id: form.priority_id === '' ? null : form.priority_id,
      });

      await fetchItems();
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async () => {
    if (!editingItem) return;
    setIsLoading(true);
    try {
      await apiPatch('/api/items', {
        id: editingItem.id,
        name: form.name.trim(),
        type_id: form.type_id === '' ? null : form.type_id,
        status_id: form.status_id === '' ? null : form.status_id,
        priority_id: form.priority_id === '' ? null : form.priority_id,
      });

      await fetchItems();
      setEditingItem(null);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm(initialForm);
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setIsLoading(true);
    try {
      await apiDelete(`/api/items?id=${id}`);
      await fetchItems();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (item: ItemRow) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      type_id: item.type_id || '',
      status_id: item.status_id || '',
      priority_id: item.priority_id || '',
    });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [itemTypesData, statusesData, priorityData, itemsData] =
          await Promise.all([
            apiGet<ItemType[]>('/api/item-types'),
            apiGet<Status[]>('/api/statuses'),
            apiGet<Priority[]>('/api/priorities'),
            apiGet<ItemRow[]>('/api/items'),
          ]);
        setItemTypes(itemTypesData);
        setStatuses(statusesData);
        setPriorities(priorityData);
        setItems(itemsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    itemTypes,
    statuses,
    priorities,
    items,
    isLoading,
    editingItem,
    form,
    setForm,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    handleDeleteItem,
    startEdit,
  };
}
