import { ItemRow } from '../types';

export interface ItemGridProps {
  items: ItemRow[];
  editingItem?: ItemRow | null;
  isLoading?: boolean;
  onEdit: (item: ItemRow) => void;
  onDelete: (id: number) => void;
}
