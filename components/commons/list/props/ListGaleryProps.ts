import { JSX } from "react";

export interface ListItemProps {
    entry?: Entry;
    handleEntryClick?: (id: number) => void;
    type: 'display' | 'form' | 'etape' | 'autre';
    handleTrashClick?: (id: number) => void;
    handleEllipsisHold?: (id: number) => void;
    moveListItem?: (dragIndex: number, hoverIndex: number) => void;
    handleQuantityChange?: (id: number, quantity: number) => void;
    index?: number;
}

export interface Entry {
    id: number;
    name: string;
    image_path: string;
    content1: React.JSX.Element | string;
    content2: React.JSX.Element| string;
    quantity?: number;
    filters?: string[];
}