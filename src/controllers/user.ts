import type { Request, Response } from "express";
import { tryCatch } from "@/utils/try-catch.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { prisma } from "@/config/prisma.js";

const getAllUsers = tryCatch(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({});
  return res.status(200).json(users);
});

const getUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
    },
  });

  if (!user) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(user);
});

const createUser = tryCatch(async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  if (!newUser) throw new ErrorHandler(400, "Error creating user !");
  return res.status(201).json(newUser);
});

const updateUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email,
      name,
    },
  });

  if (!updatedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(updatedUser);
});

const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  if (!deletedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(deletedUser);
});

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
