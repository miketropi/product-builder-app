import { createContext, useContext, useState, useEffect } from "react";

const FunnelEditContext = createContext();

const FunnelEditContextProvider = ({ children }) => {
  const value = {  }

  return <FunnelEditContext.Provider value={ value }>
    { children }
  </FunnelEditContext.Provider>
}

const useFunnelEditContext = () => {
  return useContext(FunnelEditContext);
}

export { FunnelEditContextProvider, useFunnelEditContext }