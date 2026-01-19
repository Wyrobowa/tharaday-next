import { UserFormType } from '@/app/users/_components/UserForm.types';
import { Role, Status } from '@/app/users/types';

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: UserFormType;
  setForm: (form: UserFormType) => void;
  roles: Role[];
  statuses: Status[];
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
}
