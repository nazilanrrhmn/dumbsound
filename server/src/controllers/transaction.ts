import { Request, Response } from "express";
import * as transactionServices from "../services/transaction";

export const createTransaction = async (req: Request, res: Response) => {
  const { userId, proofUrl } = req.body;
  try {
    const transaction = await transactionServices.createTransaction({
      userId,
      proofUrl,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTransactionsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const transactions = await transactionServices.getTransactionByUserId(
      Number(userId)
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
