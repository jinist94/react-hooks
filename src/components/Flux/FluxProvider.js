import { createContext, useContext } from "react";

const FluxContent = createContext();

export const useFlux = () => useContext(FluxContent);

const FluxProvider = ({ children, gutter = 0 }) => {
  return <FluxContent.Provider value={{ gutter }}>{children}</FluxContent.Provider>;
};

export default FluxProvider;
