import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "@/controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);
router
  .get("/:id", getUser)
  .post("/create", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export { router as UserRouter };
