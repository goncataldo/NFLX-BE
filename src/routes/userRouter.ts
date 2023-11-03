import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);
userRouter.put("/", updateUser);

export default userRouter;