export type Role = { id: number; name: string; is_active: boolean };
export type Status = { id: number; name: string; is_active: boolean };
export type UserRow = {
  id: number;
  name: string;
  email: string;
  role_id: number | null;
  role: string | null;
  status_id: number | null;
  status: string | null;
};
