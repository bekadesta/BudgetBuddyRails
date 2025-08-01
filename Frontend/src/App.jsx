import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Signin from "./signin";
import  Header from "./header";
import Income from "./income";
import Expense from "./expense";
import BudgetSetting from "./budgetsetting";
import  Setting from"./setting";
import Dashboard from "./dashboard";
import Report from "./report";
import {useAuth} from "./context/AuthContext"

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return currentUser ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
  <Router>
    <Routes>
    <Route path="/signin" element={<Signin />} />
    <Route path="/header" element={<Header />} />
    <Route path="/income" element={<Income />} />
    <Route path="/expense" element={<Expense />} />
    <Route path="/report" element={<Report />} />
    <Route path="/budgetsetting" element={<BudgetSetting />} />
    <Route path="/setting" element={<Setting />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />





    </Routes>

  </Router>
  );
}
  export default  App;