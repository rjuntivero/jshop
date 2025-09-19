import Button from './Button';

interface Props {
  itemCount: number;
  updateItemCount: (inc: number) => void;
}

export default function ItemCounter({ itemCount, updateItemCount }: Props) {
  return (
    <div className=" font-semibold text-primary-light outline-1 outline-primary-dark shadow-sm w-[fit-content] flex gap-3 bg-white justify-around items-center">
      <Button onClick={() => updateItemCount(-1)} className="p-3 grow h-full hover:bg-gray-200 transition-all duration-300">
        -
      </Button>
      <span className="w-[2ch] text-center">{itemCount}</span>
      <Button onClick={() => updateItemCount(1)} className="p-3 grow h-full hover:bg-gray-200 transition-all duration-300">
        +
      </Button>
    </div>
  );
}
