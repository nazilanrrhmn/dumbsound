import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction = async (data: {
  userId: number;
  proofUrl: string;
}) => {
  return await prisma.transaction.create({
    data: { ...data },
  });
};

export const getTransactionByUserId = async (userId: number) => {
  return await prisma.transaction.findMany({
    where: { userId },
  });
};

export const updateTransaction = async (
  id: number,
  data: Partial<{
    paymentStatus: "APPROVE" | "PENDING" | "CANCEL";
    userStatus: "ACTIVE" | "NOT_ACTIVE";
  }>
) => {
  return await prisma.transaction.update({
    where: { id },
    data: { ...data },
  });
};
