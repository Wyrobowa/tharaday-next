export type ItemType = { id: number; name: string; is_active: boolean };
export type Status = { id: number; name: string; is_active: boolean };
export type Priority = { id: number; name: string; is_active: boolean };
export type ItemRow = { id: number; name: string; type_id: number; type: string; status_id: number; status: string; priority_id: number; priority: string };
