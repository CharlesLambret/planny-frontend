import React, { useState } from 'react';
import { generateImage } from '@/api/image';
import { AIButtonProps } from './props/InputsProps';

const AIButton: React.FC<AIButtonProps> = ({ prompt, handleImageGenerated, AIButtonLabel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!prompt) {
      setError('Le nom ne peut pas être vide.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await generateImage(prompt);
      handleImageGenerated(response);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Erreur lors de la génération de l\'image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full text-center'>
      <button
        onClick={handleClick}
        className="mb-4 p-2 mx-auto w-1/2 flex flex-col items-center justify-center p-4 border border-gray-300 rounded hover:bg-gray-100"
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="48"
          height="48"
          className={`mb-2 ${loading ? 'animate-pulse' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
        <span>{loading ? 'Génération en cours...' : AIButtonLabel}</span>
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AIButton;