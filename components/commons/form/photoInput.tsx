import React from 'react';
import { uploadImage } from '../../../api/image';
import { PhotoInputProps } from './props/InputsProps';

const PhotoInput: React.FC<PhotoInputProps> = ({ handleImageUploaded }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        const response = await uploadImage(file);
        console.log('Image uploaded:', response);
        handleImageUploaded(response.fileName, response.fullimage_path);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className='w-full text-center'>
      <div className="mb-4 p-2 mx-auto w-1/2">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
          <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="48"
              height="48"
              className="mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>Ajouter une photo</span>
          </div>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PhotoInput;