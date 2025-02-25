import UserForm from "@/components/auth/authForm";

interface AuthPageTemplateProps {
    mode : 'register' | 'login' | 'update';
}
export default function AuthPageTemplate({ mode }: AuthPageTemplateProps) {
    return (
    <div className="flex flex-col justify-center items-center w-full">
       
        <h1 className="text-xl font-bold">{mode === 'register' ? 'Créez votre compte dès maintenant' : 'Connexion'} </h1>
        <UserForm mode={mode} />
    
    </div>
  );

}