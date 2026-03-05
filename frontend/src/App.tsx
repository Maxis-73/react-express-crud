import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { Product, ProductForm } from "./types";
import { useForm } from "react-hook-form";

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productType, setProductType] = useState("ZAPATO")
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductForm>();

  const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/productos/")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data)
      })
      .catch((error) => console.error("Ha ocurrido un error al intentar obtener los productos:", error))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value
    setProductType(tipo)
  }

  const onSubmit = async (data: ProductForm) => {
    const payload = { ...data, precio: Number(data.precio) }

    if (editingProduct) {
      await fetch(`http://localhost:3000/api/productos/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
    } else {
      await fetch("http://localhost:3000/api/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
    }

    fetchProducts()
    setEditingProduct(null)
    reset({
      nombre: "",
      color: "",
      tipo: "ZAPATO",
      talla: "",
      precio: 0
    })
  }

  const handleDelete = (prod: Product) => {
    if (confirm(`¿Estas seguro de eliminar el producto '${prod.nombre}'?`)) {
      deleteProduct(prod.id)
    }
  }

  const deleteProduct = async (id: number) => {
    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetchProducts()
  }

  const handleEdit = (prod: Product) => {
    setEditingProduct(prod)
    setProductType(prod.tipo)
    reset({
      nombre: prod.nombre,
      color: prod.color,
      tipo: prod.tipo,
      talla: prod.talla,
      precio: prod.precio
    })
  }

  const handleCancelEdit = () => {
    reset({
      nombre: "",
      color: "",
      tipo: "ZAPATO",
      talla: "",
      precio: 0
    })
    setEditingProduct(null)
    setProductType("ZAPATO")
  }

  return (
    <main className="p-8 space-y-4 w-full">
      <h1>Productos</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <select {...register("tipo")} defaultValue="" onChange={handleChange} className="border-2 border-black">
          <option value="ZAPATO">Zapato</option>
          <option value="BOLSA">Bolsa</option>
        </select>

        {/* Talla */}
        <label>Talla</label>
        {productType === "ZAPATO" ? (
          <input type="number" min={3} max={10} {...register("talla", { required: "Es necesario ingresar una talla de zapatos" })} className="border-2 border-black" />
        ) : (
          <select {...register("talla", { required: "Es necesario seleccionar una talla de bolsa" })} defaultValue="" className="border-2 border-black">
            <option value="Chica">Chica</option>
            <option value="Mediana">Mediana</option>
            <option value="Grande">Grande</option>
          </select>
        )}
        {errors.talla && <p style={{ color: "red" }}>{errors.talla.message}</p>}

        {/* Precio */}
        <label>Precio</label>
        <input type="number" inputMode="decimal" step="0.01" {...register("precio", { required: "Es necesario incluir el precio del producto" })} className="border-2 border-black" />

        <button type="submit">{editingProduct ? "Actualizar Producto" : "Crear Producto"}</button>
        {editingProduct && (
          <button type="button" onClick={() => handleCancelEdit()}> Cancelar edición </button>
        )}
      </form>

      {
        products.length === 0 ? (
          <p>No hay productos</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Talla</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr>
                  <td>{prod.nombre}</td>
                  <td>{prod.color}</td>
                  <td>{prod.talla}</td>
                  <td>{prod.tipo}</td>
                  <td>{prod.precio}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-800" onClick={() => handleEdit(prod)}>Editar</button>
                      <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-800" onClick={() => handleDelete(prod)}>Borrar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </main >
  )
}
