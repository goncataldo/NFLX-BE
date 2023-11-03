import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/get", getUser);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update", updateUser);

export default userRouter;
