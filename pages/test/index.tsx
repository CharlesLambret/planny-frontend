import RecettesList from "@/components/recettes/recetteslist";
import { Recette } from "@/api/recettes/apicalls";
export default function Index(){
    const handleRecettesChange = (selectedRecettes: Recette[]) => {
        // handle the recettes change
    };

    return <RecettesList onRecettesChange={handleRecettesChange} />
}