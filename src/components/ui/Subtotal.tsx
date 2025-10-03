interface Props {
  cartTotal?: number;
  totalItems?: number;
}

export default function Subtotal({ cartTotal = 0, totalItems = 0 }: Props) {
  return (
    <div className="flex gap-2 text-[clamp(0.2rem,2vw,1.3rem)] text-end  justify-end items-end font-normal text-primary-light md:px-6">
      <p>Subtotal {` (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}: </p>
      <strong>{`$ ${cartTotal?.toFixed(2) ?? 0}`}</strong>
    </div>
  );
}
