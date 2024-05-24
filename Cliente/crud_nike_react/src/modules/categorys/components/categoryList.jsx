import { getCategories, deleteCategory } from "../api/apiCategorys";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import {Table} from "./../../../components/Table/table"
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { set } from "react-hook-form";

export function CategorysList () {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false);
  const [categorys, SetCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');  
  const parasm = useParams();

  async function deleteFunction(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado!',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCategory(id);
          console.log(res, "Estoy borrando");
          SetCategory((prevCategorys)=> {
            return prevCategorys.map((category) => {
              if (category.id === id) {
                return {...category, state: !category.state}
              }
              return category
            })
          })
          Swal.fire('Estado modificado con éxito!', '', 'success')
        } catch (error) {
          Swal.fire('El estado no ha sido modificado', '', 'info')
          console.error("Error al cambiar el estado producto", error);
        }
      }
    });
  }


  useEffect(() => {
    async function loadCategory() {
      console.log("entre");
      const res = await getCategories(currentPage, searchTerm);
      console.log(res.data ,"estoy aqui");
      SetCategory(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 5));
    }
    loadCategory();
  }, [currentPage, searchTerm])

  const changePage = (page) => {
    setCurrentPage(page);
  };
  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reiniciar a la primera página con cada nueva búsqueda
  };

  const columns = [
    'Nombre', 'Descripcion', 'Estado'
  ];	
  const dbcolumns =[
    'name', 'description', 'state'
  ]
    const data = categorys.map((category) => ( console.log("Esto es product", category),{
        id: category.id,
        name: category.name,
        description: category.description,
        state: category.state,
      }),
    );

  return (
    <>
      <Table
        data={data}
        columns={columns}
        dbColumns={dbcolumns}
        createLink="/categoryCreate"
        editLink="/categoryUpdate"
        createText="Crear Categoria"
        title="Lista de categorias"
        editButton={parasm.id}
        deleteFunction={deleteFunction}
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={changePage}
        onSearch={onSearch}
      />
    </>
  );
};