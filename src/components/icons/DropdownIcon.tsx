interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

const DropdownIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M7.5 11.25L15 18.75L22.5 11.25" stroke="#D0A473" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DropdownIcon;
