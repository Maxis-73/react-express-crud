export interface Product {
    id: number;
    nombre: string;
    color: string;
    talla: string;
    tipo: string;
    precio: number;
    active: boolean;
}

export interface ProductResponse {
    data: Product[];
    message: string;
}

export type ProductForm = Omit<Product, "id" | "active">