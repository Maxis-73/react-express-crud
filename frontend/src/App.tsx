import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import useProducts from "./hooks/useProducts";
import type { ProductForm as ProductFormType } from "./types";
import "./styles/layout.css"

export default function App() {
  const { products, isLoading, updateProduct, createProduct, handleDelete, editingProduct, setEditingProduct, handleEdit } = useProducts();

  const handleSubmit = async (data: ProductFormType) => {
    const payload = { ...data, precio: Number(data.precio) }
    if (editingProduct) {
      await updateProduct(editingProduct.id, payload)
    } else {
      await createProduct(payload)
    }
    setEditingProduct(null)
  }

  if (isLoading) return <p>Cargando productos...</p>

  return (
    <main className="crud-container">
      <h1 className="crud-title">Catalogo de Productos</h1>
      <div className="crud-layout">
        <aside className="crud-sidebar">
          <ProductForm
            editingProduct={editingProduct}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingProduct(null)}
          />
        </aside>

        <section className="crud-content">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main >
  )
}
