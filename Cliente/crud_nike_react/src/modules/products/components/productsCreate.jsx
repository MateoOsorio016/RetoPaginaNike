    import { useForm } from "react-hook-form";
    import { postProducts, putProduct, getProduct } from "../api/apiProducts";
    import { useNavigate, useParams } from "react-router-dom";
    import Swal from "sweetalert2";
    import "./../../../components/formmodal/Form.css";
    import { useEffect, useState } from "react";

    export function ProductsCreate() {
        const [title, setTitle] = useState("Crear Producto");
        const [buttonText, setButtonText] = useState("Crear Producto");
        const navigate = useNavigate();
        const params = useParams();
        const { register: register, handleSubmit: handleSubmit, setValue, formState: { errors } } = useForm();

        const onSubmit = handleSubmit(async (data) => {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('quantity', data.quantity);
            formData.append('category', data.category);
            formData.append('description', data.description);
            formData.append('image', data.image[0]);

            try{
                if (params.id) {
                    console.log("Estoy editando");
                    await putProduct(params.id, formData);
                    Swal.fire('Actualizado' ,'Producto editado con éxito!', 'success');
                }else{
                    await postProducts(formData);
                    Swal.fire('Creado' ,'Producto creado con éxito!', 'success');
            }
            navigate('/productsList');
        }catch (error){
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
            console.error("Error al crear producto", error);
        }
        });

        useEffect(() => {
            async function loadProduct() {
                if (params.id) {
                    const res = await getProduct(params.id);
                    
                    setValue('name', res.data.name);
                    setValue('price', res.data.price);
                    setValue('quantity', res.data.quantity);
                    setValue('category', res.data.category);
                    setValue('description', res.data.description);
                    const imageUrl = `http://localhost:8000${res.data.image}`;
                    document.getElementById('image-preview').src = imageUrl;
                }
            }
            loadProduct();
        }, [])

        useState(() => {
            if (params.id) {
                setTitle("Editar Producto");
                setButtonText("Editar Producto");
            }
        })
        return(
            <>
                <h1 className="title">{title}</h1>
                    <form onSubmit= {onSubmit} enctype="multipart/form-data" className="form-container">
                        <div className="inputs">
                            <div className="input">
                                <input type="text" {...register("name", { required: true })} placeholder='Nombre' />
                                {errors.name && <span>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...register("price", { required: true })} placeholder='Precio' />
                                {errors.price && <span>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...register("quantity", { required: true })} placeholder='Cantidad' />
                                {errors.quantity && <span>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <select {...register("category", { required: true })}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Camisas">Camisa</option>
                                    <option value="Zapatos">Zapatos</option>
                                    <option value="Buzos">Buzos</option>
                                </select>
                                {errors.category && <span>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <input type="text" {...register("description", { required: true })} placeholder='Descripción' />
                                {errors.description && <span>Este campo es requerido</span>}
                            </div>
                            <div className="input">
                                <label>Imagen Actual</label>
                                <img id="image-preview" src="" alt="imagen" />
                                <input type="file" id="image" {...register("image", { required: !params.id })} placeholder='Imagen' />
                                {errors.image && <span>Este campo es requerido</span>}
                            </div>
                        </div>
                        <button className="ButtonCreate" type="submit">{buttonText}</button>
                    </form>
            </>
        )
    }