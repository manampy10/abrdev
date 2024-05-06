import React from "react";
import "./App.css";
import Create from "./pages/create";
import Lists from "./pages/lists";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="" element={<Lists />} />
      </Routes>
    </div>
  );
}

export default App;
