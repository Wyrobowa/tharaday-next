export type BookRecord = {
  id: number;
  name: string;
  tag_id: number | null;
  status_id: number | null;
  priority_id: number | null;
  author_id: number | null;
  publisher_id: number | null;
  pages: number | null;
  type: string | null;
  status: string | null;
  priority: string | null;
  author_first_name: string | null;
  author_last_name: string | null;
  author_country: string | null;
  publisher: string | null;
  publisher_country: string | null;
};
