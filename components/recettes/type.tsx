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
  onClick: () => void;
  isSelected: boolean;
}

const RecipeType: React.FC<RecipeTypeProps> = ({ type, onClick, isSelected }) => {
  const typeName = type.toLowerCase();
  const IconComponent = typeMapping[typeName];
  console.log("type de la recette", typeName);
  return (
    <div
      className={`flex m-4 flex-col justify-center p-2  hover:border-orange-500 cursor-pointer hover:text-orange-500 items-center text-center font-sm w-1/5 border rounded-md cursor-pointer ${
        isSelected ? "border-orange-400 text-orange-400" : "border-gray-200 text-black-400"
      }`}
      onClick={onClick}
    >
      {IconComponent}
      <span className="ml-2 text-center">{type}</span>
    </div>
  );
};

export default RecipeType;