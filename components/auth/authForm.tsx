import BaseForm from "../commons/form/baseForm";
import { Login, Register, updateUserById, User } from "@/api/auth/apicalls";
import { useEffect, useState } from "react";
import { userInputs } from "./userInputs";
import { loginInputs } from "./loginInputs";

export interface UserFormPros {
    mode: 'register' | 'update' | 'login';
    }
 
const UserForm : React.FC<UserFormPros> = ({ mode }) => {
    const [user, setUser] = useState<User>({
        _id: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        ingredientsFavoris: [],
        recettesFavorites: [],
        menus: [],
        friends: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createdUserId, setCreatedUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    let inputs;
    if (mode === 'login') {
        inputs = loginInputs(user);
    } else{
        inputs = userInputs(user);
    }
    useEffect(() => {
        if (mode === 'update') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

        }
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
          const userData: User = {
            ...user,
          };
    
          const response = mode === 'register' 
            ? await Register(userData.nom, userData.prenom, userData.email, userData.password)
            : mode === 'login' ? await Login(userData.email, userData.password)
            : await updateUserById(userData._id, userData);

          setCreatedUserId(mode === 'update' ? user._id : response.id);
          setIsModalOpen(true);
        } catch (error) {
          console.error(`Error ${mode === 'register' ? 'creating' : mode ==='login' ? 'login' : 'updating'} user:`, error);
        } finally {
          setLoading(false);
        }
      };
      return (
        <BaseForm
            formType='user'
            subType='user'
            entry={user}
            handleSubmit={handleSubmit}
            handleChange={(e) => {
                const { name, value } = e.target;
                setUser(prev => ({ ...prev, [name]: value }));
            }}
            loading={loading}
            itemIsCreated={!!createdUserId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalText={mode === 'register' ? 'Votre compte a été créé avec succès!' : mode === 'login' ? 'Connexion réussie!' : 'Vos informations ont bien été mises à jour !'}
            modalLink={`/users/${createdUserId}`}
            inputs={inputs}
            mainButtonText={mode === 'login' ? 'Se connecter' : mode === 'register' ? 'Créer votre compte' : 'Modifier vos informatons'} 
            handleImageUploaded = {() => {}}
            handleImageGenerated = {() => {}}
            prompt=''
            AIButtonLabel=''
            />
      );
}
export default UserForm;