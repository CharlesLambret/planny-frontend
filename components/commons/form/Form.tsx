import React from 'react';
import PhotoInput from './photoInput';
import AIButton from './AIphotoInput';
import InputComponent from './input';
import { deleteImage } from '@/api/image';
import MainButton from '../misc/mainbutton';
import IngredientsList from '../../recipe/ingredientslist';
import EtapesList from '../../recipe/etapeslist';
import { Etape, FilterType } from '@/api/recettes/apicalls';
import RecipeFilters from '../../recipe/filters';
import { Ingredient } from '@/api/ingredients/apicalls';
import { FormProps } from './props/FormProps';
import DatePicker from './datepicker';

const Form: React.FC<FormProps> = ({
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
  formType,
  subType,
  onEtapesChange,
  AIButtonLabel,
  handleAlternate,
  onIngredientsChange,
  handleFilterClick,
  recetteFilters,
  setSelectedrecetteFilters,
  datePickerStartDate,
  datePickerEndDate,
  handleDatePickerChange
}) => {

  const inititialEtapesValues = formType === 'recette' && subType === 'update' ? [entry.etapes] : [];

  const handleImageDelete = async () => {

    try {
      await deleteImage(entry.image_path);
      handleImageUploaded('', ''); // Reset image in the form
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
  const FormWrapper: React.ElementType = formType === 'etape' ? 'div' : 'form';

  return (
        <FormWrapper {...(FormWrapper === 'form' ? { onSubmit: handleSubmit } : {})} className="flex flex-row flex-wrap items-center w-full">        {!entry.image_path && formType !== 'etape' && (
          <>
          
           <PhotoInput handleImageUploaded={handleImageUploaded} />
           <AIButton 
              handleImageGenerated={handleImageGenerated} 
              prompt={prompt} 
              AIButtonLabel={AIButtonLabel}
            />
          </>
         
        )}
        
        {entry.image_path && formType !== 'etape' && (
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
  {formType !== 'menu' ? 
    inputs.map((input) => (
        <InputComponent
          key={input.inputName}
          inputName={input.inputName}
          inputLabel={input.inputLabel}
          inputType={input.inputType}
          inputValue={input.inputValue}
          handleChange={handleChange}
          inputOptions={input.inputOptions}
          divClassName= {`${formType === 'etape' ? 'w-full' : 'w-1/2'} border-bottom-gray-200 p-2 w-1/2 mb-4`}
        />
    )) : (
      <DatePicker
        startDate={datePickerStartDate?.toISOString().slice(0, 10) || ''}
        endDate={datePickerEndDate?.toISOString().slice(0, 10) || ''}
        handleChange={handleDatePickerChange || (() => {})}
      />
    )
  }
        

      {formType === 'recette' && (
        <>
          <RecipeFilters 
            handleFilterClick={handleFilterClick || (() => {})} 
            selectedFilters={recetteFilters || []}
            setSelectedFilters={setSelectedrecetteFilters}
            />
          <div className="w-full border-t-2 border-gray-300 my-3">
            <h2 className="text-lg font-bold my-3 text-bold">Sélectionnez des ingrédients à ajouter à la recette</h2>
            <IngredientsList onIngredientsChange={(ingredients) => {
                onIngredientsChange && onIngredientsChange(ingredients);
              }} />
            <h2 className="text-lg my-3 font-bold border-t-2 border-gray-300 my-3 pt-3">Ajoutez des étapes à la recette</h2>
            <EtapesList
              initialEtapes={inititialEtapesValues}
              onEtapesChange={onEtapesChange || (() => {})}
            />
          </div>
        </>
      )}
        <div className="w-full text-center mb-4">
          
        {formType === 'etape' ? (
            <button
              type="button"
              onClick={() => handleAlternate && handleAlternate()}
              className="w-1/2 mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold mt-4"
              disabled={loading}
            >
              {mainButtonText}
            </button>
          ) : (
            <MainButton
              type="submit"
              className="w-1/2 mx-auto"
              mainButtonText={mainButtonText}
              loading={loading}
            />
          )}


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
      </FormWrapper>
  );
};

export default Form;