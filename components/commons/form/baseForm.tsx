import React from 'react';
import MainButton from '../misc/mainbutton';
import InputComponent from './inputs/input';
import PhotoInput from './inputs/photoInput';
import AIButton from './inputs/AIphotoInput';
import { deleteImage } from '@/api/image';
import Modal from '../modal/Modal';
import { PhotoInputProps, AIButtonProps, InputComponentProps } from './inputs/props';

 interface FormProps extends PhotoInputProps, AIButtonProps {
  
  // FormProps

  formType: 'ingredient' | 'recette' | 'menu' | 'user' | 'etape' ;
  subType : 'create' | 'update'
  entry: any;
  inputs: InputComponentProps[];
  loading: boolean;
  mainButtonText: string;
  deleteButtonText?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDelete?: () => void;
  handleAlternate?: () => void;
  additionalInputs?: React.JSX.Element;
  itemIsCreated: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalText: string;
  modalLink: string;
 
}

const BaseForm: React.FC<FormProps> = ({
  entry,
  handleSubmit,
  handleChange,
  handleImageUploaded,
  handleImageGenerated,
  handleDelete,
  inputs,
  loading,
  mainButtonText,
  deleteButtonText,
  prompt,
  AIButtonLabel,
  additionalInputs, 
  formType,
  itemIsCreated,
  isModalOpen,
  setIsModalOpen,
  modalText,
  modalLink
}) => {

  const handleImageDelete = async () => {
    try {
      await deleteImage(entry.image_path);
      handleImageUploaded('', ''); // Reset image in the form
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };



  return (
    <><form onSubmit={handleSubmit} className="flex flex-row flex-wrap items-center w-full">
      {formType !== 'menu' && (
        <>
          {!entry.image_path && (
            <>
              <PhotoInput handleImageUploaded={handleImageUploaded} />
              <AIButton
                handleImageGenerated={handleImageGenerated}
                prompt={prompt}
                AIButtonLabel={AIButtonLabel} />
            </>
          )}
          {entry.image_path && (
            <div className="w-full text-center mb-4">
              <img src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${entry.image_path}`} alt="Ingredient" className="mx-auto w-1/2 rounded" />
              <button
                type="button"
                onClick={handleImageDelete}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer l'image
              </button>
            </div>
          )}
        </>
      )}
      {inputs.map((input) => (
        <InputComponent
          key={input.inputName}
          inputName={input.inputName}
          inputLabel={input.inputLabel}
          inputType={input.inputType}
          inputValue={input.inputValue}
          handleChange={handleChange}
          inputOptions={input.inputOptions}
          divClassName="w-1/2 border-bottom-gray-200 p-2 w-1/2 mb-4" />
      ))}
      {additionalInputs}
      <div className="w-full text-center mb-4">
        <MainButton
          type="submit"
          className="w-1/2 mx-auto"
          mainButtonText={mainButtonText}
          loading={loading} />
        {handleDelete && deleteButtonText && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-1/2 mx-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-bold mt-4"
            disabled={loading}
          >
            {deleteButtonText}
          </button>
        )}
      </div>
    </form><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ingrédient créé">
        <p>{modalText}</p>
        {itemIsCreated && <p>Vous pouvez consulter sa page <a href={modalLink}>ici</a></p>}
      </Modal>
      </>

  );
};

export default BaseForm;