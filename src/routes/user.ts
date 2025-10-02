import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);
router
  .get("/:id", getUserById)
  .post("/create", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export { router as UserRouter };
