import React from 'react';

interface MainButtonProps {
  loading: boolean;
  className?: string;
  mainButtonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({ loading,className, mainButtonText, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`${className} bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-bold`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? 'Chargement...' : mainButtonText}
    </button>
  );
};

export default MainButton;