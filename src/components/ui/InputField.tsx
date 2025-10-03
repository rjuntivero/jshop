import { ChangeEvent } from 'react';

interface Props {
  label: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export default function InputField({ label, id, onChange, type = 'text', className }: Props) {
  return (
    <div className={`${className} flex flex-col`}>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        id={id}
        className=" p-2 bg-white outline-1 outline-gray-400/20 rounded-sm"
        required
      />
    </div>
  );
}
