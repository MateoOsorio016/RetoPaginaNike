import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./pages/home";
import { ProductsList } from "./modules/products/components/productsList";
import { ProductsCreate } from "./modules/products/components/productsCreate";
import { EditUserForm } from "./modules/users/components/usereditModal";
import { Admin } from "./modules/admin/components/adminpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function LayoutWithSidebar() {
  const location = useLocation(); 
  const showSidebar = location.pathname !== "/home";

  return (
    <>
      {showSidebar && <div className="sidebar"><Admin /></div>}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productsList" element={<ProductsList />} />
          <Route path="/productsCreate" element={<ProductsCreate />} />
          <Route path="/productsUpdate/:id" element={<ProductsCreate />} />
          <Route path="/userUpdate/:id" element={<EditUserForm />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="app-layout">
      <BrowserRouter>
        <LayoutWithSidebar />
      </BrowserRouter>
    </div>
  );
}
