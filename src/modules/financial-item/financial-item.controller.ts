import { Request, Response, NextFunction } from 'express';

import {
  createFinancialItem,
  deleteFinancialItem,
  getFinancialItemByID,
  getFinancialItems,
  updateFinancialItem,
} from './financial-item.services';

export async function listFinancialItemHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const financialitems = await getFinancialItems();
    return res.status(200).json(financialitems);
  } catch (e: any) {
    return next(e);
  }
}

export async function createFinancialItemHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const financialitem = await createFinancialItem(data);
    return res.status(201).json(financialitem);
  } catch (e: any) {
    return next(e);
  }
}

export async function getFinancialItemHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const financialitem = await getFinancialItemByID(id);
    if (!financialitem) {
      res.status(404).json({ msg: 'FinancialItem not found' });
    }
    return res.status(200).json(financialitem);
  } catch (e: any) {
    return next(e);
  }
}

export async function updateFinancialItemHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  try {
    const financialitem = await getFinancialItemByID(id);
    if (!financialitem) {
      res.status(404).json({ msg: 'FinancialItem not found' });
    }
    const updatedFinancialItem = await updateFinancialItem({ _id: id }, data);
    return res.status(200).json(updatedFinancialItem);
  } catch (e: any) {
    return next(e);
  }
}

export async function deleteFinancialItemHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const query = { _id: id };
    const financialitem = await deleteFinancialItem(query);
    if (!financialitem) {
      res.status(404).json({ msg: 'FinancialItem not found' });
    }
    return res.status(200).json(financialitem);
  } catch (e: any) {
    return next(e);
  }
}
