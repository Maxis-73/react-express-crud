import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import type { Product } from "./types";

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [productType, setProductType] = useState("ZAPATO")

  useEffect(() => {
    fetch("http://localhost:3000/api/productos/")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data)
      })
      .catch((error) => console.error("Ha ocurrido un error al intentar obtener los productos:", error))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value
    setProductType(tipo)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("TODO...")
  }

  return (
    <main>
      <h1>Productos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" id="nombre" placeholder="Adidas Yeezy 350" />
        <input type="text" name="color" id="color" placeholder="Blanco" />
        <select name="tipo" id="tipo" onChange={handleChange}>
          <option value="ZAPATO">Zapato</option>
          <option value="BOLSA">Bolsa</option>
        </select>
        {productType === "ZAPATO" ? (
          <input type="number" name="talla" id="talla" />
        ) : (
          <select name="talla" id="talla">
            <option value="Chica">Chica</option>
            <option value="Mediana">Mediana</option>
            <option value="Grande">Grande</option>
          </select>
        )}
        <input type="number" name="precio" id="precio" />
        <input type="submit" />
      </form>

      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <pre>{JSON.stringify(products, null, 2)}</pre>
      )}
    </main>
  )
}
