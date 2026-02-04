import { UserRow } from '../types';

export interface UserTableProps {
  users: UserRow[];
  isLoading?: boolean;
  onEdit: (user: UserRow) => void;
  onDelete: (id: number) => void;
}
