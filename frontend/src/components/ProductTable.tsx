import { useState } from "react";
import type { Product } from "../types"
import "../styles/ProductTable.css";

type Props = {
    products: Product[]
    onEdit: (prod: Product) => void
    onDelete: (prod: Product) => void
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
    const [filter, setFilter] = useState("TODOS");
    const [search, setSearch] = useState("")

    const filteredProducts = products.filter((prod) => {
        const matchType = filter === "TODOS" || prod.tipo === filter;
        const matchSearch = prod.nombre.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSearch
    });

    if (products.length === 0) return <p className="empty-message">No hay productos registrados</p>;

    return (
        <div className="table-container">
            <section className="filters">
                <div className="filterGroup">
                    <label htmlFor="productsFilter">Filtro: </label>
                    <select name="productsFilter" onChange={(e) => setFilter(e.target.value)} className="filter">
                        <option value="TODOS">Mostrar Todos</option>
                        <option value="ZAPATO">Zapatos</option>
                        <option value="BOLSA">Bolsas</option>
                    </select>
                </div>

                <div className="filterGroup">
                    <label htmlFor="search">Busca por nombre:</label>
                    <input type="text" name="buscador" id="buscador" className="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </section>

            {filteredProducts.length === 0 ? (
                <p className="no-results-message">No hay resultados para tu búsqueda</p>
            ) : (
                <table className="product-table">
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
                        {filteredProducts.map((prod) => (
                            <tr key={prod.id}>
                                <td>{prod.nombre}</td>
                                <td>
                                    {prod.color}
                                </td>
                                <td>{prod.talla}</td>
                                <td>
                                    <span className={`type-badge ${prod.tipo.toLowerCase()}`}>
                                        {prod.tipo}
                                    </span>
                                </td>
                                <td className="price">${prod.precio.toFixed(2)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn btn-edit" onClick={() => onEdit(prod)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-delete" onClick={() => onDelete(prod)}>
                                            Borrar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}