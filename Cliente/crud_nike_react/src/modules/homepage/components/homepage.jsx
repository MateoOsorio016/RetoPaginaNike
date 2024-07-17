import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { getProducts } from './../api/apiproducts'
import { BiShoppingBag, BiSearch, BiUser } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import logo from '../../../assets/logo.png'
import fondo from '../../../assets/fondo.png'
import mama from '../../../assets/mama.png'
import running from '../../../assets/running.png'
import brasilkit from '../../../assets/brasilkit.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import './home.css'

export const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    async function loadProducts() {
      const res = await getProducts()
      setProducts(res.data)
      console.log(res.data, "HOLA ESTOY AQUI ")
    }
    loadProducts()
  }, [navigate])

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn]);


  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (product) => {
    console.log("entre")
    setSelectedProduct(product)
    setShow(true);
    console.log("Esto traje", selectedProduct)
  }

  const handleLoginClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/loginPage');
    } else {
      setIsLoggedIn(true);
      console.log('isLoggedIn:', isLoggedIn); // Agrega este console.log
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="nav-bar">
          <div className="logo-container">
            <img className="logo" src={logo} alt="Nike Logo" />
          </div>
          <div className="nav-list-container">
            <ul className="nav-list">
              <li className="nav-item">Lanzamientos</li>
              <li className="nav-item">Hombre</li>
              <li className="nav-item">Mujer</li>
              <li className="nav-item">Niños</li>
              <li className="nav-item">Accesorios</li>
            </ul>
          </div>
          <div className="search-container">
            <input className="search" type="search" placeholder="Buscar" />
          </div>
          <li className="nav-item cart-container">
            <button><BiShoppingBag size={30} /></button>
            <button onClick={handleLoginClick}>
              {isLoggedIn ? <LuLayoutDashboard size={30} /> : <BiUser key="user-icon" size={30} />}
            </button>
          </li>
        </nav>
        <div className="shipping-info">
          Envíos gratis por compras superiores a $299.900
          <hr />
          <a className="shipping-infoa" href="#">Términos y Condiciones</a>
        </div>
      </header>
      <main className="main-content">
        <section className="product-highlight">
          <img className="img-content" src={fondo} alt="" />
          <div className="section-container">
            <h1>AIR MAX DN</h1>
            <h2>Descubre lo último en Nike</h2>
            <button>Comprar</button>
          </div>
          <div className="section-novedades">
            <h1>Novedades</h1>
            <div className="cards-container-novedades">
              <div className="card-novedades">
                <img src={mama} alt="Descripción de la imagen 1" />
                <h1>Para mamá</h1>
                <p>Regalos que reflejan cada aspecto de su grandeza</p>
              </div>
              <div className="card-novedades">
                <img src={brasilkit} alt="Descripción de la imagen 1" />
                <h1>Brasil 2024 Home Kit </h1>
                <p>Inspiradas por talento</p>
              </div>
              <div className="card-novedades">
                <img src={running} alt="Descripción de la imagen 1" />
                <h1>Nike Running</h1>
                <p>Lo mejor para correr</p>
              </div>
            </div>
          </div>
        </section>
        <div className="card-container">
          <h1 className="semana">Imperdibles de la semana</h1>
          <button onClick={handlePrev}><FaChevronLeft /></button>
          <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}>
            {products.map((product, index) => (
              <div className="card" key={product.id} style={{ minWidth: '33.3333%' }}>
                <img src={`http://localhost:8000${product.image}`} alt={product.name} />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>{product.category_name}</p>
                  <p className="price-p">$ {product.price}</p>
                  <button className="btn-carrusel" onClick={() => handleShow(product)}>
                    Leer más
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleNext}><FaChevronRight /></button>
        </div>
      </main>
      <footer className="footer">
      </footer>

      <Modal size= "lg" className= "custom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body closeButton>
          {selectedProduct && (
            <div className="container-detail-card">
              <div className="leftD">
                <h2 className="left-h2">{selectedProduct.name}</h2>
                <p className="p-price">$ {selectedProduct.price}</p>
                <p className="p-description">{selectedProduct.description}</p>
                <button className= "btn-left" variant="primary" onClick={null}>
                  Añadir al carrito
                </button>
              </div>
              <div className="rightD">
                <img
                  src={`http://localhost:8000${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  className="img-fluid"
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}