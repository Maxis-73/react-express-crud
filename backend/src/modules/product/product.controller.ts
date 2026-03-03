import { Request, Response, NextFunction } from "express";
import * as service from "./product.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const parserId = parseInt(Array.isArray(id) ? id[0] : id)
    const result = await service.update(parserId, req.body)
    res.status(202).json(result)
  } catch (error) {
    next(error)
  }
}