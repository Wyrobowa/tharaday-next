import { Role, Status } from '@/app/users/types';

export type UserFormType = {
  name: string;
  email: string;
  role_id: number | '';
  status_id: number | '';
};

export interface UserFormProps {
  form: UserFormType;
  setForm: (form: UserFormType) => void;
  roles: Role[];
  statuses: Status[];
}
