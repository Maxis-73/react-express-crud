import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Product, ProductForm } from "../types";

const EMPTY_FORM: ProductForm = {
    nombre: "", color: "", tipo: "ZAPATO", talla: "", precio: 0,
};

type Props = {
    editingProduct: Product | null;
    onSubmit: (data: ProductForm) => void;
    onCancelEdit: () => void;
};

export default function ProductForm({ editingProduct, onSubmit, onCancelEdit }: Props) {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProductForm>();
    const tipo = watch("tipo");

    useEffect(() => {
        reset(editingProduct ?? EMPTY_FORM);
    }, [editingProduct, reset]);

    const handleSubmitForm = async (data: ProductForm) => {
        await onSubmit({ ...data, precio: Number(data.precio) });
        reset(EMPTY_FORM);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            {/* Nombre */}
            <label>Nombre del producto</label>
            <input {...register("nombre", { required: "El nombre del producto es requerido" })} className="border-2 border-black" />
            {errors.nombre && <p style={{ color: "red" }}>{errors.nombre.message}</p>}

            {/* Color */}
            <label>Color</label>
            <input {...register("color", { required: "El color del producto es requerido" })} className="border-2 border-black" />
            {errors.color && <p style={{ color: "red" }}>{errors.color.message}</p>}

            {/* Tipo */}
            <label>Tipo de Producto</label>
            <select {...register("tipo")} className="border-2 border-black">
                <option value="ZAPATO">Zapato</option>
                <option value="BOLSA">Bolsa</option>
            </select>

            {/* Talla */}
            <label>Talla</label>
            {tipo === "ZAPATO" ? (
                <input type="number" min={3} max={10} {...register("talla", { required: "Es necesario ingresar una talla de zapatos" })} className="border-2 border-black" />
            ) : (
                <select {...register("talla", { required: "Es necesario seleccionar una talla de bolsa" })} className="border-2 border-black">
                    <option value="Chica">Chica</option>
                    <option value="Mediana">Mediana</option>
                    <option value="Grande">Grande</option>
                </select>
            )}
            {errors.talla && <p style={{ color: "red" }}>{errors.talla.message}</p>}

            {/* Precio */}
            <label>Precio</label>
            <input type="number" inputMode="decimal" step="0.01" min={0} {...register("precio", {
                required: "Es necesario incluir el precio del producto",
                min: { value: 0, message: "El precio no puede ser negativo" },
                validate: (value) => Number(value) >= 0 || "El precio no puede ser negativo"
            })} />
            {errors.precio && <p style={{ color: "red" }}>{errors.precio.message}</p>}

            <button type="submit">{editingProduct ? "Actualizar Producto" : "Crear Producto"}</button>
            {editingProduct && (
                <button type="button" onClick={() => onCancelEdit()}> Cancelar edición </button>
            )}
        </form>
    )
}
