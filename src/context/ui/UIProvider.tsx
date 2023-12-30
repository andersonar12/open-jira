import { useReducer } from "react";
import { UIContext } from "./UIcontext";
import { uiReducer } from "./uiReducer";

export interface UIState {
  sidemenuOpen: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isDragging: false,
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });
  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });
  const startDragging = () => dispatch({ type: "UI - Start Dragging" });
  const endDragging = () => dispatch({ type: "UI - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
