import { useForm } from "react-hook-form";
import { postCategory, putCategory, getCategory } from "../api/apiCategorys";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./../../../components/formmodal/Form.css";
import { useEffect, useState } from "react";

export function CategoryCreate() {
    const [title, setTitle] = useState("Crear Categoria");
    const [buttonText, setButtonText] = useState("Crear Categoria");
    const navigate = useNavigate();
    const params = useParams();
    const { register: register, handleSubmit: handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('state', data.state);
        try {
            if (params.id) {
                console.log("Estoy editando");
                await putCategory(params.id, formData);
                Swal.fire('Actualizado', 'Categoria editada con éxito!', 'success');
            } else {
                await postCategory(formData);
                Swal.fire('Creado', 'Categoria creada con éxito!', 'success');
            }
            navigate('/categorysList');
        } catch (error) {
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
            console.error("Error al crear producto", error);
        }
    });

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const res = await getCategory(params.id);
                console.log(res.data, "esto traje" , params.id);
                setValue('name', res.data.name);
                setValue('description', res.data.description);
                setValue('state', res.data.state);
            }
        }
        loadUser();
    }, [])

    useState(() => {
        if (params.id) {
            setTitle("Editar Categoria");
            setButtonText("Editar Categoria");
        }
    })
    return (
        <>
            <h1 className="title-form">{title}</h1>
            <form onSubmit={onSubmit} enctype="multipart/form-data" className="form-container">
                <div className="inputs-form">
                    <div className="input-form">
                    <div className="input-form">
                        <input type="text" {...register("name", { required: true })} placeholder='Nombre' />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("description", { required: true })} placeholder='Descripcion' />
                        {errors.description && <span>Este campo es requerido</span>}
                    </div>
                        <select type="select" {...register("state", { required: true })}>
                            <option value="">Selecciona un Estado</option>
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                        {errors.state && <span>Este campo es requerido</span>}
                    </div>
                </div>
                <button className="ButtonCreate" type="submit">{buttonText}</button>
            </form>
        </>
    )
}