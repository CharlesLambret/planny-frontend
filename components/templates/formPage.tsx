import PageIndication from "../commons/misc/pageindication";
import Form from "../commons/form/Form";
import { FormProps } from "../commons/form/props/FormProps";
import Modal from "../commons/modal/Modal";

interface FormPageProps {
    category: string;
    title : string;
    description: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    modalText: string;
    itemIsCreated: boolean;
    modalLink: string;
}

export default function FormPageTemplate (
    props: FormPageProps & FormProps
){
    const { 
        category, 
        title, 
        description, 
        isModalOpen, 
        setIsModalOpen, 
        modalText, 
        itemIsCreated, 
        modalLink 
    } = props;

    const { 
        entry, 
        inputs, 
        loading, 
        mainButtonText, 
        deleteButtonText, 
        prompt, 
        formType, 
        subType, 
        AIButtonLabel,  
        recetteFilters,
        handleSubmit, 
        handleChange, 
        handleImageUploaded, 
        handleImageGenerated, 
        handleDelete, 
        onEtapesChange, 
        onIngredientsChange, 
        handleAlternate, 
        handleFilterClick,
        setSelectedrecetteFilters,
        datePickerStartDate,
        datePickerEndDate,
        handleDatePickerChange,
    } = props;

    return(
        <>
            <div className="text-center mb-4">
                <PageIndication breadcrumb={category} title='Créer' />
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <Form
                entry = {entry}
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                handleImageUploaded = {handleImageUploaded}
                handleImageGenerated = {handleImageGenerated}
                handleDelete = {handleDelete}
                inputs = {inputs}
                loading = {loading}
                mainButtonText  = {mainButtonText}
                deleteButtonText = {deleteButtonText}
                prompt = {prompt}
                formType = {formType}
                subType = {subType}
                onEtapesChange  = {onEtapesChange}
                onIngredientsChange={onIngredientsChange}
                AIButtonLabel = {AIButtonLabel}
                handleAlternate = {handleAlternate}
                handleFilterClick = {handleFilterClick}
                recetteFilters = {recetteFilters}
                setSelectedrecetteFilters = {setSelectedrecetteFilters}
                datePickerStartDate = {datePickerStartDate}
                datePickerEndDate = {datePickerEndDate}
                handleDatePickerChange = {handleDatePickerChange}
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ingrédient créé">
                <p>{modalText}</p>
                {itemIsCreated && <p>Vous pouvez consulter sa page <a href={modalLink}>ici</a></p>}
            </Modal>
        </>
    );
};