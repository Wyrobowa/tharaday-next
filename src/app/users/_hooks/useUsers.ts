import { useCallback, useEffect, useMemo, useState } from 'react';

import { Role, Status, UserRow } from '@/app/users/types';
import { apiGet, apiPatch, apiPost } from '@/lib/api';

import { UserFormType } from '../_components/UserForm.types';

export function useUsers() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  const initialForm = useMemo<UserFormType>(
    () => ({
      name: '',
      email: '',
      role_id: '',
      status_id: '',
    }),
    []
  );
  const [form, setForm] = useState<UserFormType>(initialForm);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      setUsers(await apiGet<UserRow[]>('/api/users'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    setIsLoading(true);
    try {
      await apiPost('/api/users', {
        name: form.name.trim(),
        email: form.email.trim(),
        role_id: form.role_id === '' ? null : form.role_id,
        status_id: form.status_id === '' ? null : form.status_id,
      });

      await fetchUsers();
      setIsAddModalOpen(false);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;
    setIsLoading(true);
    try {
      await apiPatch('/api/users', {
        id: editingUser.id,
        name: form.name.trim(),
        email: form.email.trim(),
        role_id: form.role_id === '' ? null : form.role_id,
        status_id: form.status_id === '' ? null : form.status_id,
      });

      await fetchUsers();
      setIsEditModalOpen(false);
      setEditingUser(null);
      setForm(initialForm);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setIsLoading(true);
    try {
      await apiPatch('/api/users', {
        id: id,
        status_id: 3,
      });

      await fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove user');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = useCallback(() => {
    setForm(initialForm);
    setIsAddModalOpen(true);
  }, [initialForm, setForm, setIsAddModalOpen]);

  const openEditModal = useCallback((user: UserRow) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role_id: user.role_id || '',
      status_id: user.status_id || '',
    });
    setIsEditModalOpen(true);
  }, [setEditingUser, setForm, setIsEditModalOpen]);

  const closeAddModal = useCallback(
    () => setIsAddModalOpen(false),
    [setIsAddModalOpen]
  );
  const closeEditModal = useCallback(
    () => setIsEditModalOpen(false),
    [setIsEditModalOpen]
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [rolesData, statusesData, usersData] = await Promise.all([
          apiGet<Role[]>('/api/roles'),
          apiGet<Status[]>('/api/statuses'),
          apiGet<UserRow[]>('/api/users'),
        ]);
        setRoles(rolesData);
        setStatuses(statusesData);
        setUsers(usersData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    roles,
    statuses,
    users,
    isLoading,
    isAddModalOpen,
    isEditModalOpen,
    form,
    setForm,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    openAddModal,
    openEditModal,
    closeAddModal,
    closeEditModal,
  };
}
