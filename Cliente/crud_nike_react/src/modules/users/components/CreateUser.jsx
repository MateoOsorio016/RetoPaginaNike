import { useForm } from "react-hook-form";
import { postUsers, updateUsers, getUser } from "../api/users";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./../../../components/formmodal/Form.css";
import { useEffect, useState } from "react";

export function UserCreate() {
    const [title, setTitle] = useState("Crear Usuario");
    const [buttonText, setButtonText] = useState("Crear Usuario");
    const navigate = useNavigate();
    const params = useParams();
    const { register: register, handleSubmit: handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append('group', data.group);
        formData.append('username', data.username);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('birthdate', data.birthdate);
        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            if (params.id) {
                console.log("Estoy editando");
                await updateUsers(params.id, formData);
                Swal.fire('Actualizado', 'Usuario editado con éxito!', 'success');
            } else {
                await postUsers(formData);
                Swal.fire('Creado', 'Usuario creado con éxito!', 'success');
            }
            navigate('/usersList');
        } catch (error) {
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
            console.error("Error al crear producto", error);
        }
    });

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const res = await getUser(params.id);
                console.log(res.data, "esto traje" , params.id);

                setValue("group", res.data.group.id);
                setValue("username", res.data.username);
                setValue("first_name", res.data.first_name);
                setValue("last_name", res.data.last_name);
                setValue("address", res.data.address);
                setValue("phone", res.data.phone);
                setValue("birthdate", res.data.birthdate);
                setValue("email", res.data.email);

            }
        }
        loadUser();
    }, [])

    useState(() => {
        if (params.id) {
            setTitle("Editar Usuario");
            setButtonText("Editar Usuario");
        }
    })
    return (
        <>
            <h1 className="title-form">{title}</h1>
            <form onSubmit={onSubmit} enctype="multipart/form-data" className="form-container">
                <div className="inputs-form">
                    <div className="input-form">
                        <select type="select" {...register("group", { required: true })}>
                            <option value="">Selecciona un Grupo</option>
                            <option value="1">1</option>
                        </select>
                        {errors.state && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("username", { required: true })} placeholder='UserName' />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("first_name", { required: true })} placeholder='Nombre' />
                        {errors.price && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("last_name", { required: true })} placeholder='Apellido' />
                        {errors.quantity && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("address", { required: true })} placeholder='Dirrección' />
                        {errors.description && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="text" {...register("phone", { required: true })} placeholder='Telefono' />
                        {errors.description && <span>Este campo es requerido</span>}
                    </div>
                    <div className="input-form">
                        <input type="date" {...register("birthdate", { required: true })} placeholder='Fecha de nacimiento' />
                        {errors.birthdate && <span>This field is required</span>}
                    </div>
                    <div className="input-form">
                        <input type="email" {...register("email", { required: true })} placeholder='Email' autoComplete='off' />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    {!params.id && (
                    <div className="input-form">
                        <input type="password" {...register("password", { required: !params.id })} placeholder='Contraseña' autoComplete='off' />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    )}
                </div>

                <button className="ButtonCreate" type="submit">{buttonText}</button>
            </form>
        </>
    )
}