import React, { createContext, useContext } from "react";
import useFluree from "./useFluree";
import { memoryConnOptions } from "./config";

const FlureeContext = createContext(null);

export function FlureeWrapper({ children }) {
  const fluree = useFluree("test/jld", memoryConnOptions);
  return (
    <FlureeContext.Provider value={fluree}>{children}</FlureeContext.Provider>
  );
}

export function useFlureeContext() {
  return useContext(FlureeContext);
}
