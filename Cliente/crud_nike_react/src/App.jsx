import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./pages/home";
import { Homepage } from "../src/modules/homepage/components/homepage.jsx"
import { ProductsList } from "./modules/products/components/productsList";
import { ProductsCreate } from "./modules/products/components/productsCreate";
import { CategorysList } from "./modules/categorys/components/categoryList.jsx";
import { CategoryCreate } from "./modules/categorys/components/categoryCreate.jsx";
import { UsersList } from "./modules/users/components/userList.jsx";
import { EditUserForm } from "./modules/users/components/EditProfile.jsx";
import { Admin } from "./modules/admin/components/adminpage";
import { UserCreate } from "./modules/users/components/CreateUser.jsx";
import { LoginPage } from "./modules/login/components/login";
import { ResetPasswordRequest } from "./modules/login/components/resetPassword.jsx";
import { ResetRasswordConfirm } from "./modules/login/components/resetPasswordConfirm.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function ProtectedRoute({ children }) {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  if (!isAuthenticated()) {
    console.log("No autenticado: Redirigiendo a login");
    return <Navigate to="/loginPage" replace />;
  }

  console.log("Autenticado: Accediendo a la ruta");
  return children;
}


function LayoutWithSidebar() {
  const location = useLocation(); 
  const showSidebar = location.pathname !== "/home" && location.pathname !== "/loginPage" && location.pathname !== "/reset_password" && !/^\/api\/users\/reset_password\//.test(location.pathname);


  return (
    <>
      {showSidebar && <div className="sidebar"><Admin /></div>}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/reset_password" element={<ResetPasswordRequest />} />
          <Route path="api/users/reset_password/:token" element={<ResetRasswordConfirm />} />
          <Route path="/productsList" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
          <Route path="/productsCreate" element={<ProtectedRoute><ProductsCreate /></ProtectedRoute>} />
          <Route path="/productsUpdate/:id" element={<ProtectedRoute> <ProductsCreate /></ProtectedRoute>} />
          <Route path="/usersList" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
          <Route path="/userCreate" element={<ProtectedRoute><UserCreate /></ProtectedRoute>} />
          <Route path="/usersUpdate/:id" element={<ProtectedRoute><UserCreate /></ProtectedRoute>} />
          <Route path="/userUpdate/:id" element={<ProtectedRoute><EditUserForm /></ProtectedRoute>} />
          <Route path="/categorysList" element={<ProtectedRoute><CategorysList /></ProtectedRoute>} />
          <Route path="/categoryCreate" element={<ProtectedRoute><CategoryCreate /></ProtectedRoute>} />
          <Route path="/categoryUpdate/:id" element={<ProtectedRoute><CategoryCreate /></ProtectedRoute>} />
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
