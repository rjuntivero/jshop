import { useState } from 'react';

export const useItemCount = () => {
  const [itemCount, setItemCount] = useState(1);
  const updateItemCount = (increment: number) => {
    if (itemCount + increment > 0) {
      setItemCount((prev) => prev + increment);
    } else {
      return;
    }
  };

  return { itemCount, updateItemCount };
};
