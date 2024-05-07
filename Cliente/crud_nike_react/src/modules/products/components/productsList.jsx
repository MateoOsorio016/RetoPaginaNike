import { getProductsList, deleteProduct } from "../api/apiProducts";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import {Table} from "./../../../components/Table/table"
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export function ProductsList () {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const parasm = useParams();

  async function deleteFunction(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(id);
          console.log(res, "Estoy borrando");

          const newProducts = products.filter((product) => product.id !== id);
          setProducts(newProducts);

          Swal.fire('Producto eliminado con éxito!', '', 'success')
        } catch (error) {
          Swal.fire('El producto no ha sido eliminado', '', 'info')
          console.error("Error al eliminar el producto", error);
        }
      }
    });
  }


  useEffect(() => {
    async function loadProducts() {
      console.log("entre");
      const res = await getProductsList();
      console.log(res.data ,"estoy aqui");
      setProducts(res.data);
    }
    loadProducts();
  }, [])

  const columns = [
    'ID', 'Nombre', 'Precio', 'Cantidad',  'Categoria'
  ];	
  const dbcolumns =[
    'id', 'name', 'price', 'quantity',  'category'
  ]
    const data = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        state: product.state,
        image: product.image,
      }),
    );

    const handleClose = () => setShow(false);

    const handleShow = (product) => {
      console.log("entre")
      setSelectedProduct(product)
      setShow(true);
      console.log("Esto traje", product)
    }

  return (
    <>
      <Table
        data={data}
        columns={columns}
        dbColumns={dbcolumns}
        createLink="/productsCreate"
        editLink="/productsUpdate"
        createText="Crear Producto"
        detailFunction={handleShow}
        editButton={parasm.id}
        deleteFunction={deleteFunction}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{textAlign: "center"}}>{selectedProduct && selectedProduct.name}</h4>
          <img
            style={{ maxWidth: "450px", maxHeight: "450px"}} // Adjust the max width as needed
            src={selectedProduct && `http://localhost:8000${selectedProduct.image}`}
            alt="Imagen del Producto"
          />
          <p>{selectedProduct && selectedProduct.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}></button>
        </Modal.Footer>
      </Modal>
    </>
  );
};