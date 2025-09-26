interface Props {
  label: string;
  id: string;
}

export default function InputField({ label, id }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} className=" p-2 bg-secondary-light/50" />
    </div>
  );
}
