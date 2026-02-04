export type AuthorFormType = {
  last_name: string;
  first_name: string;
  country: string;
};

export interface AuthorFormProps {
  form: AuthorFormType;
  setForm: (form: AuthorFormType) => void;
}
