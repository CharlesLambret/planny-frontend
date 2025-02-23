import React, { useState, useEffect } from 'react';
import { Etape } from '@/api/recettes/apicalls';

import ListComponent from '../commons/list/List';
import InputComponent from '../commons/form/inputs/input';
import MainButton from '../commons/misc/mainbutton';

interface EtapesListProps {
  initialEtapes: Etape[];
  onEtapesChange: (etapes: Etape[]) => void;
}

const EtapesList: React.FC<EtapesListProps> = ({ initialEtapes, onEtapesChange }) => {
  const [etapes, setEtapes] = useState<Etape[]>([]);
  const [newEtape, setNewEtape] = useState<Etape>({ name: '', content: '', order: 1 });
  
  useEffect(() => {
    if (initialEtapes.length > 0) {
      setEtapes(initialEtapes);
    }
  }, [initialEtapes]);

  useEffect(() => {
    onEtapesChange(etapes);
  }, [etapes, onEtapesChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEtape((prevEtape) => ({ ...prevEtape, [name]: value }));
  };

  const handleAddEtape = () => {
    const etapeToAdd = { ...newEtape, id: Date.now(), order: etapes.length + 1 };
    setEtapes((prevEtapes) => [...prevEtapes, etapeToAdd]);
    setNewEtape({ name: '', content: '', order: etapes.length + 2 });
  };

  const handleRemoveClick = (name: string) => {
    setEtapes((prevEtapes) => prevEtapes.filter((etape) => etape.name !== name));
  };

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      <h3 className="text-xl mb-4 text-bold text-gray-900">Étapes de la Recette</h3>
      <div className="space-y-2 mb-4">
        {etapes.length > 0 ? (
          <ListComponent
            entries={etapes.map((etape) => ({
              id: etape.name,
              name: etape.name,
              image_path: '',
              content1: etape.content,
              content2: '',
            }))}
            type="etape"
            elements="list"
            itemsPerPage={5}
            handleTrashClick={handleRemoveClick}
            handleEntryClick={() => {}} // Add a default handleEntryClick function
            searchBarLabel=""
            searchTerm=""
          />
        ) : (
          <p>Aucune étape ajoutée pour le moment.</p>
        )}
      </div>
      <div id="etapesMiniForm" className="flex flex-row flex-wrap items-center w-full">
        <InputComponent
          key="name"
          inputName="name"
          inputLabel="Nom de l'étape"
          inputValue={newEtape.name}
          handleChange={handleInputChange}
          inputType="text"
          divClassName="w-full border-bottom-gray-200 p-2 mb-4"
        />
        <InputComponent
          key="content"
          inputName="content"
          inputLabel="Contenu de l'étape"
          inputValue={newEtape.content}
          handleChange={handleInputChange}
          inputType="text"
          divClassName="w-full border-bottom-gray-200 p-2 mb-4"
        />
        <MainButton
          type="button"
          onClick={handleAddEtape}
          className="w-1/2 mx-auto"
          loading={false}
          mainButtonText="Ajouter Étape"
          importance="secondary"
        />
      </div>
    </div>
  );
};

export default EtapesList;