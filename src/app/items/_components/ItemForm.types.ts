import { ItemType, Priority, Status } from '../types';

export interface ItemFormType {
  name: string;
  type_id: number | '';
  status_id: number | '';
  priority_id: number | '';
}

export interface ItemFormProps {
  form: ItemFormType;
  setForm: (form: ItemFormType) => void;
  itemTypes: ItemType[];
  statuses: Status[];
  priorities: Priority[];
}
