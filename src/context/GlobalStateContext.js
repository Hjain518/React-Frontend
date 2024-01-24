import React, { createContext, useState } from "react";
const GlobalStateContext = createContext();
const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    income: 0,
    expenses: 0,
    savings: 0,
  });
  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider, GlobalStateContext };
