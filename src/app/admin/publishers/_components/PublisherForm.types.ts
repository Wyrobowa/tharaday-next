export type PublisherFormType = {
  name: string;
  country: string;
};

export interface PublisherFormProps {
  form: PublisherFormType;
  setForm: (form: PublisherFormType) => void;
}
