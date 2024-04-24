import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import {Home} from "./pages/home"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}