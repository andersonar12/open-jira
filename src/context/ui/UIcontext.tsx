import { createContext } from "react";

export interface UIContextProps {
    sidemenuOpen: boolean;
    // methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    isDragging: boolean;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({
    sidemenuOpen: false
} as UIContextProps)