import { Author, Priority, Publisher, Status, Tag } from '../types';

export interface BookFormType {
  name: string | null;
  tag_id: number | null;
  status_id: number | null;
  priority_id: number | null;
  author_id: number | null;
  publisher_id: number | null;
  pages: number | null;
}

export interface BookFormProps {
  form: BookFormType;
  setForm: (form: BookFormType) => void;
  tags: Tag[];
  statuses: Status[];
  priorities: Priority[];
  authors: Author[];
  publishers: Publisher[];
}
