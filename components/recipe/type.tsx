import IconAperitif from "@/components/svg/aperitif";
import IconBoisson from "@/components/svg/boisson";
import IconDessert from "@/components/svg/dessert";
import IconEntree from "@/components/svg/entree";
import IconGouter from "@/components/svg/gouter";
import IconMuffin from "@/components/svg/muffin";
import IconPlat from "@/components/svg/plat";
import { JSX } from "react";

const className = "w-1/4";
const color = "black-500";
const typeMapping: { [key: string]: JSX.Element } = {
  repas: <IconPlat className={className} color={color} />,
  entrée: <IconEntree className={className} color={color} />,
  dessert: <IconDessert className={className} color={color} />,
  boisson: <IconBoisson className={className} color={color} />,
  apéritif: <IconAperitif className={className} color={color} />,
  goûter: <IconGouter className={className} color={color} />,
  autre: <IconMuffin className={className} color={color} />,
};

interface RecipeTypeProps {
    type: string;
}

const RecipeType: React.FC<RecipeTypeProps> = ({ type }) => {
    const typeName = type.toLowerCase();
    const IconComponent = typeMapping[typeName] ;
    console.log("type de la recete", typeName);
    return (
        <div className="flex m-4 flex-col justify-center items-center text-center text-black-400  font-sm w-1/5  border rounded-md border-gray-200">
            {IconComponent}
            <span className="ml-2 text-center">{type}</span>
        </div>
    );
};

export default RecipeType;