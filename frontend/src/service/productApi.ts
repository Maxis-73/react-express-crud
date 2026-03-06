import type { Product, ProductForm, ProductResponse } from "../types";
import { API_URL } from "../config";

export const productApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await fetch(API_URL);
        const data: ProductResponse = await response.json();
        if (!response.ok) throw new Error(data.message);
        if (!data.data || !Array.isArray(data.data)) throw new Error("Datos inválidos");
        return data.data;
    },

    create: async (product: ProductForm) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result;
    },

    update: async (id: number, product: ProductForm) => {
        const response = await fetch(`${API_URL}${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result;
    },

    delete: async (id: number) => {
        const response = await fetch(`${API_URL}${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result;
    },
}