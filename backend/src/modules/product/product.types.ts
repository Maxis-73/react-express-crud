import { TipoProducto } from "../../../generated/prisma/enums";

export interface CreateProductDTO {
  nombre: string;
  color: string;
  talla: string;
  tipo: TipoProducto;
  precio: number;
}

export interface Product extends CreateProductDTO {
  id: number;
}
