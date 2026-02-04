export type Tag = { id: number; name: string; is_active: boolean };
export type Status = { id: number; name: string; is_active: boolean };
export type Priority = { id: number; name: string; is_active: boolean };
export type Author = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
};
export type Publisher = {
  id: number;
  name: string | null;
  country: string | null;
};
export type BookRow = {
  id: number;
  name: string;
  tag_id: number | null;
  type: string | null;
  status_id: number | null;
  status: string | null;
  priority_id: number | null;
  priority: string | null;
  author_id: number | null;
  author_first_name: string | null;
  author_last_name: string | null;
  author_country: string | null;
  publisher_id: number | null;
  publisher: string | null;
  publisher_country: string | null;
  pages: number | null;
};
