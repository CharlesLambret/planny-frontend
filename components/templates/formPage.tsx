import PageIndication from "../commons/misc/pageindication";
import Form from "../commons/form/baseForm";
import Modal from "../commons/modal/Modal";
import RecetteForm from "../recipe/recetteForm";
import MenuForm from "../menus/form";
import IngredientForm from "../ingredients/form";

interface FormPageProps {
    category: 'Recettes' | 'Ingrédients' | 'Menus';
    title : string;
    description: string;
    mode: 'create' | 'update';
}

export default function FormPageTemplate (props: FormPageProps){
    const { 
        category, 
        title, 
        description, 
        mode, 
    } = props;


    return(
        <>
            <div className="text-center mb-4">
                <PageIndication breadcrumb={category} title='Créer' />
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            {category === 'Ingrédients' && (
                <IngredientForm mode={mode} />
            )}
            {category === 'Recettes' && (
                <RecetteForm mode={mode} />
            )}
            {category === 'Menus' && (
                <MenuForm mode={mode} />
            )}
            
        </>
    );
};