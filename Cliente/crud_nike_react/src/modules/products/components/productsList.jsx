import { getProductsList, deleteProduct } from "../api/apiProducts";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import {Table} from "./../../../components/Table/table"
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { HiSortAscending, HiSortDescending   } from "react-icons/hi";


export function ProductsList () {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');
  const parasm = useParams();

  async function deleteFunction(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado!',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(id);
          console.log(res, "Estoy borrando");

          setProducts((prevProducts)=> {
            return prevProducts.map((product) => {
              if (product.id === id) {
                return {...product, state: !product.state}
              }
              return product
            })
          })
          Swal.fire('Estado modificado con éxito!', '', 'success')
        } catch (error) {
          Swal.fire('El estado no ha sido modificado', '', 'info')
          console.error("Error al cambiar el estado del producto", error);
        }
      }
    });
  }


  useEffect(() => {
    async function loadProducts() {
      console.log("entre");
      const res = await getProductsList(currentPage, order, searchTerm);
      console.log(res.data ,"estoy aqui");
      setProducts(res.data.products);
      setTotalPages(res.data.total_pages);
      setCurrentPage(res.data.current_page);
    }
    loadProducts();
  }, [currentPage, order, searchTerm])

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleSortChane = (field) => {
    setOrder(order === field ? `-${field}` : field);
  };
  
  const columns = [
    'Nombre', 'Precio', 'Cantidad',  'Categoria', 'Estado'
  ];	
  const dbcolumns =[
    'name', 'price', 'quantity',  'category_name', 'state'
  ]
    const data = products.map((product) => ( console.log("Esto es product", product),{
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category_name: product.category_name,
        state: product.state,
        image: product.image,
      }),
    );
    console.log("Esto es data", data)

    const handleClose = () => setShow(false);

    const handleShow = (product) => {
      console.log("entre")
      setSelectedProduct(product)
      setShow(true);
      console.log("Esto traje", product)
    }

    const onSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
      setCurrentPage(1); // Reiniciar a la primera página con cada nueva búsqueda
    };

    const userFilterConfig = {
      '⬆️': { field: 'price', direction: 'asc', icon: <HiSortAscending  size={25}/> },
      '⬇️': { field: 'price', direction: 'desc', icon: <HiSortDescending size={25}/>},
    };

  return (
    <>
      <Table
        data={data}
        columns={columns}
        dbColumns={dbcolumns}
        createLink="/productsCreate"
        editLink="/productsUpdate"
        createText="Crear Producto"
        title="Lista de Productos"
        detailFunction={handleShow}
        editButton={parasm.id}
        deleteFunction={deleteFunction}
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={changePage}
        onSearch={onSearch}
        onSortChange={handleSortChane}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{textAlign: "center"}}>{selectedProduct && selectedProduct.name}</h4>
          <img
            style={{ maxWidth: "450px", maxHeight: "300px", justifyContent: 'space-between', alignItems: 'center'}} // Adjust the max width as needed
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