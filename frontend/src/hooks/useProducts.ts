import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { Product, ProductForm } from "../types";
import { productApi } from "../service/productApi";

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const data = await productApi.getAll();
            setProducts(data);
        } catch (error) {
            toast.error("Error al obtener productos");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const createProduct = async (product: ProductForm) => {
        const toastId = toast.loading("Creando producto...");
        try {
            await productApi.create(product);
            toast.success("Producto creado", { id: toastId })
            await fetchProducts()
        } catch (error) {
            toast.error("Error al crear producto", { id: toastId });
            throw error;
        }
    }

    const updateProduct = async (id: number, product: ProductForm) => {
        const toastId = toast.loading("Actualizando producto...");
        try {
            await productApi.update(id, product);
            toast.success("Producto actualizado", { id: toastId })
            await fetchProducts()
        } catch (error) {
            toast.error("Error al actualizar producto", { id: toastId });
            throw error;
        }
    }

    const deleteProduct = async (id: number) => {
        const toastId = toast.loading("Eliminando producto...");
        try {
            await productApi.delete(id);
            toast.success("Producto eliminado", { id: toastId })
            await fetchProducts()
        } catch (error) {
            toast.error("Error al eliminar producto", { id: toastId });
            throw error;
        }
    }

    const handleDelete = (prod: Product) => {
        if (confirm(`¿Eliminar '${prod.nombre}'?`)) deleteProduct(prod.id);
    };

    const handleEdit = (prod: Product) => {
        setEditingProduct(prod)
    }

    return {
        products,
        isLoading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        handleDelete,
        handleEdit,
        editingProduct,
        setEditingProduct
    }
}