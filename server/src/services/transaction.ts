import * as transactionRepositories from "../repositories/transaction";

export const createTransaction = async (data: {
  userId: number;
  proofUrl: string;
}) => {
  return await transactionRepositories.createTransaction(data);
};

export const getTransactionByUserId = async (userId: number) => {
  return await transactionRepositories.getTransactionByUserId(userId);
};

export const updateTransaction = async (
  id: number,
  data: Partial<{
    paymentStatus: "APPROVE" | "PENDING" | "CANCEL";
    userStatus: "ACTIVE" | "NOT_ACTIVE";
  }>
) => {
  return await transactionRepositories.updateTransaction(id, data);
};
