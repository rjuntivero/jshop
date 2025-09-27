import { ChangeEvent } from 'react';

interface Props {
  label: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function InputField({ label, id, onChange, type = 'text' }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        id={id}
        className=" p-2 bg-secondary-light/50"
        required
      />
    </div>
  );
}
