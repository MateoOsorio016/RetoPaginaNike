import { useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import { getProducts } from "../../api/apiproducts";
import { BiShoppingBag, BiSearch } from "react-icons/bi";
import logo from './../../assets/logo.png'
import nike from './../../assets/nike.png'
import './home.css'

export const Homepage= ()=>{
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [show, setShow] = useState(false);
    useEffect(()=>{
      async function loadProducts(){
        const res= await getProducts()
          setProducts(res.data)
          console.log(res.data)
      }
      loadProducts()
    }, [])

    const handleClose = () => setShow(false);

    const handleShow = (product) => {
      console.log("entre")
      setSelectedProduct(product)
      setShow(true);
      console.log("Esto traje", selectedProduct)
    }



    return (
      <div className="container">
      <header className="header">
        <nav className="nav-bar">
        <div class="logo-container">
      <img class="logo" src={logo} alt="Nike Logo" />
        </div>
          <ul className="nav-list">
            <li className="nav-item">Lanzamientos</li>
            <li className="nav-item">Hombre</li>
            <li className="nav-item">Mujer</li>
            <li className="nav-item">Niños</li>
            <li className="nav-item">Accesorios</li>
          </ul>
          <div className="search-cart">
            <div className="search-container">
              <input className="search "type="text" placeholder="Buscar" />
              <BiSearch size={20} className="search-icon" />
            </div>
            <button><BiShoppingBag size={30}/></button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="product-highlight">
        <img src={nike} alt="" />
        </section>
        <div className='card-container'>
        {products.map(products => (
							<div className='card' key={products.id}>
								<img src={products.image} alt={products.name} />
                <div className="card-content">
									<h3>{products.name}</h3>
                  <p>{products.category}</p>
                  <p>${products.price}</p>
									<button className='btn' onClick={()=> handleShow(products)}>
										Leer más
									</button>
							</div>
              </div>
        ))}
          </div>
      </main>
      <footer className="footer">
      </footer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct && selectedProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.category}</p>
            <p>{selectedProduct.price}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClose}>
            Add to cart
          </button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}