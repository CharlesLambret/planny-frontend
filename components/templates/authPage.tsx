import UserForm from "@/components/auth/authForm";

interface AuthPageTemplateProps {
    mode : 'register' | 'login' | 'update';
}
export default function AuthPageTemplate({ mode }: AuthPageTemplateProps) {
    return (
    <div className="flex flex-row justify-center items-center w-full">
        <img src="/illu.jpg" alt="illustration" className="w-1/2"/>
        <div  className="flex flex-col justify-center items-center w-1/2">
        <h1>{mode === 'register' ? 'Créez votre compte dès maintenant' : 'Connectez-vous ici'} </h1>
        <UserForm mode={mode} />
        </div>
    
    </div>
  );

}