import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';

const CustomButton = ({
  icon,
  text,
  onClick,
  isActive = false,
  textStyle = 'text-base',
}) => {
  const buttonClass = text
    ? `flex items-center justify-center rounded-xl space-x-2 p-6 
    ${isActive ? 'bg-green-700 text-white border-green' : 'bg-transparent text-white border-white'}`
    : 'flex items-center justify-center rounded-xl p-6 bg-transparent';

  return (
    <Button onClick={onClick} className={buttonClass}>
      {icon && (
        <svg
          className={'h-8 w-8 text-green-500'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      )}
      {text && <span className={textStyle}>{text}</span>}
    </Button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.bool,
  isActive: PropTypes.bool,
  text: PropTypes.string,
  textStyle: PropTypes.string,
};

export default CustomButton;
