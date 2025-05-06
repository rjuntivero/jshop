interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

const UpArrowIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M7.5 18.75L15 11.25L22.5 18.75" stroke="#D0A473" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default UpArrowIcon;
