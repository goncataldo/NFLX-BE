import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/userModel";
import { emailRegex, passwordRegex, phoneRegex } from "../utils/regex";
import bcrypt from 'bcrypt'
import { creationToken } from "../utils/createToken";
import { authToken } from "../utils/authToken";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, phone } = req.body;
  let errorName: string = "Unknown Error";
  let errorCode: string = "UNKNOWN_ERROR";
  let errorStatus: number = 520;
  let regexFail: boolean = false;
  if (!emailRegex.test(email)) {
    errorName = "Invalid email format";
    errorCode = "INVALID_EMAIL";
    errorStatus = 400;
    regexFail = true;
  }
  if (!passwordRegex.test(password)) {
    errorName = "Invalid password format";
    errorCode = "INVALID_PASSWORD";
    errorStatus = 400;
    regexFail = true;
  }
  if (regexFail) {
    res.status(errorStatus).json({
      message: {
        errorName,
        errorCode,
      },
    });
  } else {
    try {
      const hash = bcrypt.hashSync(password, 10);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash,
        phone
      });
      await newUser.save();
      res.json({ message: "Successful", user: newUser.email });
    } catch (error: any) {
      if(error.code === 11000) {
        console.error(error)
        return res.status(400).json({ message: "Email not available" });
      } else {
        console.error(error);
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { phone, email, password } = req.body;
  let errorName: string = "Unknown Error";
  let errorCode: string = "UNKNOWN_ERROR";
  let errorStatus: number = 520;
  let regexFail: boolean = false;
  if (phone && !phoneRegex.test(phone)) {
    errorName = "Invalid phone format";
    errorCode = "INVALID_PHONE";
    errorStatus = 400;
    regexFail = true;
  }
  if (!emailRegex.test(email)) {
    errorName = "Invalid email format";
    errorCode = "INVALID_EMAIL";
    errorStatus = 400;
    regexFail = true;
  }
  if (!passwordRegex.test(password)) {
    errorName = "Invalid password format";
    errorCode = "INVALID_PASSWORD";
    errorStatus = 400;
    regexFail = true;
  }
  if (regexFail) {
    res.status(errorStatus).json({
      message: {
        errorName,
        errorCode,
      },
    });
  } else {
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json({ message: "incorrect password or email" });
      }
      const token = creationToken(user!.id);
      res.json({ message: "Successful", data: token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Something went wrong" });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = authToken(req.body.token)
  try {
    const user = await User.findById(id);
    if (user) {
      user!.password= "private"
      return res.json({ message: "Successful", data: user });
    }
    res.status(400).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = authToken(req.body.token)
  try {
    const data = await User.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted", data: data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { token, email, password, phone } = req.body;
  const id = authToken(token)
  let hash = undefined
  try {
    if(password) {
      hash = bcrypt.hashSync(password, 10);
    }
    let data = await User.findOneAndUpdate(
      { _id: id },
      {
        email,
        password: hash,
        phone,
      },
      {
        new: true,
      }
    )
    res.json({ message: "Successful", data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
