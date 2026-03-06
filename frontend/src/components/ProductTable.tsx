import type { Product } from "../types"

type Props = {
    products: Product[]
    onEdit: (prod: Product) => void
    onDelete: (prod: Product) => void

}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
    if (products.length === 0) return <p>No hay productos</p>;
    return (
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
                    <tr key={prod.id}>
                        <td>{prod.nombre}</td>
                        <td>{prod.color}</td>
                        <td>{prod.talla}</td>
                        <td>{prod.tipo}</td>
                        <td>{prod.precio}</td>
                        <td>
                            <div className="flex gap-2">
                                <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-800" onClick={() => onEdit(prod)}>Editar</button>
                                <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-800" onClick={() => onDelete(prod)}>Borrar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
