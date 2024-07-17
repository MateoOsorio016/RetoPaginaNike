import { getUsers, deleteUsers, cargarUsuarios } from "../api/users";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import {Table} from "./../../../components/Table/table"
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { BeatLoader  } from 'react-spinners';
import { HiSortAscending, HiSortDescending   } from "react-icons/hi";
import { set } from "react-hook-form";

export function UsersList () {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);



  const { register: register, handleSubmit: handleSubmit, setValue, formState: { errors } } = useForm();


  const parasm = useParams();

  async function deleteFunction(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado!',
      cancelButtonText: 'No, cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUsers(id);
          console.log(res, "Estoy borrando");
          setUsers((prevUsers)=> {
            return prevUsers.map((user) => {
              if (user.id === id) {
                return {...user, is_active: !user.is_active}
              }
              return user
            })
          })
          Swal.fire('Estado cambiado con éxito!', '', 'success')
        } catch (error) {
          Swal.fire('El Usuario no ha sido modificado', '', 'info')
          console.error("Error al cambiar el estado del usuario", error);
        }
      }
    });
  }

  useEffect(() => {
    async function loadUsers() {
      console.log("entre");
      const res = await getUsers(currentPage, order, searchTerm);
      console.log(res.data ,"estoy aqui");
      setUsers(res.data.users);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.total_pages);
    }
    loadUsers();
  }, [currentPage, order, searchTerm])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reinicia a la primera página con cada nueva búsqueda
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleSortChane = (field) => {
    setOrder(order === field ? `-${field}` : field);
  };
  
  const columns = [
    'Nombre', 'Apellido',  'Correo', 'Fecha de Nacimiento', 'Estado'
  ];	
  const dbcolumns =[
   'first_name', 'last_name',  'email', 'birthdate', 'is_active'
  ]
    const data = users.map((user) => ({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        address: user.address,
        email: user.email,
        birthdate: user.birthdate,
        is_active: user.is_active
      }),
    );

    const handleClose = () => setShow(false);

    const handleShow = (user) => {
      console.log("entre")
      setSelectedUsers(user)
      setShow(true);
      console.log("Esto traje", user)
    }
    const onSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
      setCurrentPage(1); // Reiniciar a la primera página con cada nueva búsqueda
    };

const onSubmit =handleSubmit(async (data) => {
  const formData = new FormData();
  formData.append('file', data.file[0]);
  console.log("Esto es formData", formData)
  try {
    setLoading(true);
    await cargarUsuarios(formData);
    setShowSuccess(true);
    setShow(false);
    Swal.fire('Carga exitosa', 'Usuarios cargados con éxito!', 'success');
  } catch (error) {
    setShowSuccess(false);
    if(error.response && error.response.data){
      const errormessage = Object.values(error.response.data).flat().join("\n");
      Swal.fire('Error al cargar usuarios', errormessage, 'error');
    }
    console.error("Error al cargar usuarios", error);
  }finally{
    setLoading(false);

  }
}
);


  return (
    <>
      <Table
        data={data}
        columns={columns}
        dbColumns={dbcolumns}
        createLink="/userCreate"
        editLink="/usersUpdate"
        createText="Crear Usuario"
        title="Lista de Usuarios"
        deleteFunction={deleteFunction}
        editButton={parasm.id}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={changePage}
        onSearch={onSearch}
        onSortChange={handleSortChane}
        excelFunction={handleShow}     
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carga Masiva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <form onSubmit={onSubmit} enctype="multipart/form-data">
      <input type="file" className="input-form" {...register("file", { required: true })} placeholder='Archivo' />
      {errors.file && <span>Este campo es requerido</span>}
      {loading ? (
        <BeatLoader color="black" className="loader-icon" style={{ display: 'flex', alignItems: 'center', marginLeft: '200px', marginTop: '10px' }} />
      ) : (
        <button className="ButtonCreate2" type="submit">Hacer Carga</button>
      )}
      </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}></button>
        </Modal.Footer>
      </Modal>
    </>
  );
};