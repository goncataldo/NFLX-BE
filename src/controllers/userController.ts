import { Request, Response } from "express";
import User from "../models/userModel";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const data = await User.find().toArray();
    res.json({ message: "Successful", data: data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await User.insertOne(req.body);
    res.json({ message: "Successful", data: data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await User.deleteOne(req.body);
    res.json({ message: "Successful", data: data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = await User.updateOne(req.body.filter, req.body.new);
    res.json({ message: "Successful", data: data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
