export function capitalizeFirst(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const generateOrderNumber = () => {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${randomStr}`;
};
