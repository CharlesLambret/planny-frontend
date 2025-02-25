import { JSX } from "react";

export interface ListItemProps {
    entry?: Entry;
    handleEntryClick?: (id: string) => void;
    type: 'display' | 'form' | 'etape' | 'recette' |'recetteactive';
    handleTrashClick?: (id: string) => void;
    handleEllipsisHold?: (id: string) => void;
    moveListItem?: (dragIndex: number, hoverIndex: number) => void;
    handleQuantityChange?: (id: string, quantity: number) => void;
    index?: number;
}

export interface Entry {
    id: string;
    name: string;
    image_path: string;
    content1: React.JSX.Element | string;
    content2: React.JSX.Element| string;
    quantity?: number;
    filters?: string[];
}