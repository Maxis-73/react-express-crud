import { Request, Response, NextFunction } from "express";
import * as service from "./product.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json({ "data": result, "message": "Producto creado correctamente" });
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await service.getAll();
    res.status(200).json({ "data": products, "message": "Productos obtenidos exitosamente" });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const parserId = parseInt(Array.isArray(id) ? id[0] : id)
    const result = await service.update(parserId, req.body)
    res.status(202).json({ "data": result, "message": "El producto fue editado correctamente" })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const parserId = parseInt(Array.isArray(id) ? id[0] : id)
    const result = await service.deleteProduct(parserId)
    res.status(202).json({ "data": result, "message": "El producto ha sido eliminado" })
  } catch (error) {
    next(error)
  }
}
