import React, { useState, useEffect } from 'react';
import { Etape } from '@/api/recettes/apicalls';
import { TrashIcon } from '@heroicons/react/24/outline';
import Form from '../commons/form/baseForm';
import { etapesInputs } from '@/api/recettes/etapes/inputvalues';
import { List } from '@material-tailwind/react';
import ListComponent from '../commons/list/List';

interface EtapesListProps {
  initialEtapes: Etape[];
  onEtapesChange: (etapes: Etape[]) => void;
}

const EtapesList: React.FC<EtapesListProps> = ({ initialEtapes, onEtapesChange }) => {
  const [etapes, setEtapes] = useState<Etape[]>(initialEtapes);
  const [newEtape, setNewEtape] = useState<Etape>({ id: Date.now(), 'nom-section': '', contenu: '', ordre: 1 });
  useEffect(() => {
    onEtapesChange(etapes);
  }, [etapes, onEtapesChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEtape((prevEtape) => ({ ...prevEtape, [name]: value }));
  };

  const handleAddEtape = () => {
      const etapeToAdd = { ...newEtape, id: Date.now(), ordre: etapes.length + 1};
      setEtapes((prevEtapes) => [...prevEtapes, etapeToAdd]);
      setNewEtape({ id: Date.now(), 'nom-section': '', contenu: '', ordre: etapes.length + 2 });
    };

  const handleRemoveClick = (id: number) => {
    setEtapes((prevEtapes) => prevEtapes.filter((etape) => etape.id !== id));
  };

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      <h3 className="text-xl mb-4 text-bold text-gray-900">Étapes de la Recette</h3>
      <div className="space-y-2 mb-4">
        {etapes.length > 0 ? (
          <ListComponent
            entries={etapes.map((etape) => ({
              id: etape.id!,
              name: etape['nom-section'],
              image_path: '',
              content1: etape.contenu,
              content2: '',
            }))}
            type="etape"
            elements="list"
            itemsPerPage={5}
            handleTrashClick={handleRemoveClick}
            entry={{ id: 0, name: '', image_path: '', content1: '', content2: '' }} // Add a default entry
            handleEntryClick={() => {}} // Add a default handleEntryClick function
          />
        ) : (
          <p>Aucune étape ajoutée pour le moment.</p>
        )}
      </div>
      <Form
        entry={newEtape}
        handleSubmit={(e) => { e.preventDefault();  }}
        handleAlternate={handleAddEtape}
        handleChange={handleInputChange}
        handleImageUploaded={() => {}}
        handleImageGenerated={() => {}}
        inputs={etapesInputs(newEtape)}
        loading={false}
        mainButtonText="Ajouter l'étape"
        prompt=""
        formType='etape'
        subType='create'
        AIButtonLabel=''
      />
    </div>
  );
};

export default EtapesList;