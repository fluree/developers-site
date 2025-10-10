import React, { createContext, useContext, useReducer } from "react";

const initialState = {
	input: [],
	monacoRef: null,
};

const GlobalContext = createContext();

function globalReducer(state, action) {
	return { ...state, ...{ [action.type]: action.value } };
}

function GlobalProvider({ children }) {
	const [state, dispatch] = useReducer(globalReducer, initialState);
	const context = { state, dispatch };
	return (
		<GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
	);
}

function useGlobal() {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobal must be used within a GlobalProvider");
	}
	return context;
}

export { GlobalProvider, useGlobal as default };
