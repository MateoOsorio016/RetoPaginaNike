import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import {Home} from "./pages/home"
import {AdminPage} from "./pages/admin"
import {ProductsList} from "./modules/products/components/productsList"
import { Admin } from "./modules/admin/components/adminpage";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Home/>} />
            <Route path="/productsList" element={<ProductsList/>} />
            <Route element={<Admin/>}>
                <Route path="/admin" element={<AdminPage/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}