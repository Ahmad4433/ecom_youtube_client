import React from "react";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
import FileUpload from "./components/common/FileUpload";
import AddProduct from "./components/products/AddProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<FileUpload />} />
      <Route path="/product/add" element={<AddProduct />} />
    </Routes>
  );
};

export default App;
