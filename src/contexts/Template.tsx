import React, { useReducer } from "react";

export type formItem = {
  id: string;
  name: string;
  label: string;
  required: boolean;
  value?:string;
};

export type InitialStateType = {
  name: string;
  ID: string;
  formItems: formItem[];
};

export const initialState: InitialStateType = {
  ID: "new Template",
  name: "new Template",
  formItems: [],
};

export type TemplateContextProps = {
  templateState: InitialStateType;
  templateDispatch: React.Dispatch<any>;
};

export const TemplateContext = React.createContext<TemplateContextProps>({
  templateState: initialState,
  templateDispatch: () => null,
});

export const TemplateContextProvider: React.FC = ({ children }) => {
  const reducer = (
    state: InitialStateType,
    action: {
      type: string;
      payload: InitialStateType | formItem | string;
    }
  ): InitialStateType => {
    switch (action.type) {
      case "RESET_TEMPLATE" : 
        state = {
          ...state , 
          name: "new Template",
          formItems: [],
        }
        break;
      case "ADD_INPUT_FORM":
        state = {
          ...state,
          formItems: [...state.formItems, action.payload as formItem],
        };
        break;

      case "CHANGE_NAME":
        state = {
          ...state,
          name: action.payload as string,
        };
        break;
    }
    return state;
  };

  let [state, dispatch] = useReducer(reducer, initialState);

  console.info("RENDER : TemplateContext");

  return (
    <TemplateContext.Provider
      value={{
        templateState: state,
        templateDispatch: dispatch,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
