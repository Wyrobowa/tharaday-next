import { BookRow } from '../types';

export interface BookGridProps {
  books: BookRow[];
  editingBook?: BookRow | null;
  isLoading?: boolean;
  onEdit: (book: BookRow) => void;
  onDelete: (id: number) => void;
}
