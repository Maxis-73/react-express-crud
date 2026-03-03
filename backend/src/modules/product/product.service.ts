import { prisma } from "../../config/prisma";
import type { CreateProductDTO } from "./product.types";

export const create = async (prod: CreateProductDTO) => {
  return prisma.producto.create({
    data: {
      nombre: prod.nombre,
      color: prod.color,
      talla: prod.talla,
      tipo: prod.tipo,
      precio: prod.precio
    }
  })
}

export const getAll = async () => {
  return prisma.producto.findMany();
}

export const update = async (prodId: number, prod: CreateProductDTO) => {
  return prisma.producto.update({
    where: {id: prodId},
    data: {
      nombre: prod.nombre,
      color: prod.color,
      talla: prod.talla,
      tipo: prod.tipo,
      precio: prod.precio
    }
  })
}