import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedBack from "./Container/feedBack";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter basename={"/tw4"}>
      <Routes>
        <Route path="/feedback" element={<FeedBack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
