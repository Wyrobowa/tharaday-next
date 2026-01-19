import { UserRow } from '../types';

export interface UserTableProps {
  users: UserRow[];
  onEdit: (user: UserRow) => void;
  onDelete: (id: number) => void;
}
