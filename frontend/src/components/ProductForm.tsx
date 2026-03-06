import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Product, ProductForm } from "../types";
import "../styles/ProductForm.css";

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
        <form className="product-form" onSubmit={handleSubmit(handleSubmitForm)}>
            <h2 className="form-title">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <div className="form-group">
                <label>Nombre del producto</label>
                <input
                    className="form-input"
                    {...register("nombre", { required: "El nombre del producto es requerido" })}
                />
                {errors.nombre && <span className="form-error">{errors.nombre.message}</span>}
            </div>
            <div className="form-group">
                <label>Color</label>
                <input
                    className="form-input"
                    {...register("color", { required: "El color del producto es requerido" })}
                />
                {errors.color && <span className="form-error">{errors.color.message}</span>}
            </div>
            <div className="form-group">
                <label>Tipo de Producto</label>
                <select className="form-select" {...register("tipo")}>
                    <option value="ZAPATO">Zapato</option>
                    <option value="BOLSA">Bolsa</option>
                </select>
            </div>
            <div className="form-group">
                <label>Talla</label>
                {tipo === "ZAPATO" ? (
                    <input
                        type="number"
                        className="form-input"
                        min={3} max={10}
                        inputMode="decimal"
                        step="0.5"
                        {...register("talla", { required: "Es necesario ingresar una talla de zapatos" })}
                    />
                ) : (
                    <select className="form-select" {...register("talla", { required: "Es necesario seleccionar una talla de bolsa" })}>
                        <option value="Chica">Chica</option>
                        <option value="Mediana">Mediana</option>
                        <option value="Grande">Grande</option>
                    </select>
                )}
                {errors.talla && <span className="form-error">{errors.talla.message}</span>}
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    className="form-input"
                    inputMode="decimal"
                    step="0.01"
                    min={0}
                    {...register("precio", {
                        required: "Es necesario incluir el precio del producto",
                        min: { value: 0, message: "El precio no puede ser negativo" },
                        validate: (value) => Number(value) >= 0 || "El precio no puede ser negativo"
                    })}
                />
                {errors.precio && <span className="form-error">{errors.precio.message}</span>}
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {editingProduct ? "Actualizar" : "Crear"}
                </button>
                {editingProduct && (
                    <button type="button" className="btn btn-secondary" onClick={() => onCancelEdit()}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}