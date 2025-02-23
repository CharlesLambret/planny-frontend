import React from 'react';

interface MainButtonProps {
  loading: boolean;
  className?: string;
  mainButtonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  importance? : 'primary' | 'secondary';
}

const MainButton: React.FC<MainButtonProps> = ({ importance, loading,className, mainButtonText, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`${importance === 'secondary' ? 'border border-orange-500 bg-white text-orange-500' : 'bg-orange-400 text-white'} ${className}  px-4 py-2 rounded hover:text-white hover:bg-orange-600 font-bold`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? 'Chargement...' : mainButtonText}
    </button>
  );
};

export default MainButton;