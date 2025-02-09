
import { FilterType } from "@/api/recettes/apicalls";

interface IconItemProps {
    icon: React.ReactNode;
    text: string;
    handleFilterSelection?: (filter: FilterType) => void;
    filter?: FilterType;
    type: 'form' | 'read';
}

const classes = {
    form: 'flex m-4 flex-col justify-center items-center hover:cursor-pointer text-gray-400 hover:text-orange-600 hover:shadow-md hover:shadow-orange-200/40 hover:border-orange-100 hover:p-2 w-1/5 w-1/6 border p-3 rounded-md border-gray-200',
    read: 'flex m-4 flex-col justify-center items-center text-center text-black-400  font-sm w-1/5  border p-3 rounded-md border-gray-200'
}

export const IconItem: React.FC<IconItemProps> = ({ icon, text, filter, handleFilterSelection, type }) => {
    return (
        <div key={filter ? filter : undefined} className={classes[type]} onClick={() => filter && handleFilterSelection && handleFilterSelection(filter)}>
        {icon}
        <span>{text}</span>
        </div>
    )
}