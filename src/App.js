import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import MoneyMatters from "./components/MoneyMatters";
import ConfirmSubmit from "./components/ConfirmSubmit";
import { GlobalStateProvider } from "./context/GlobalStateContext";
const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp onNext={()=>Navigate('/money-matters')} />} />
          <Route path="/money-matters" element={<MoneyMatters onNext={()=>Navigate('/confirm-submit')} /> } />
          <Route path="/confirm-submit" element={<ConfirmSubmit />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};
export default App;
