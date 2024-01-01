import { response } from "express";
import user_model from "../DB/Models/user_model.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, phone, address } = req.body;
    //Doing Validation
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }
    if (!email) {
      res.send({ message: "Email  is required" });
    }
    if (!phone) {
      res.send({ message: "Phone is required" });
    }
    if (!address) {
      res.send({ message: "Address is required" });
    }

    // idher hum existing user dekh rha
    const existingUser = await user_model.findOne({ email: email });
    if (existingUser) {
      res.status(200).send({
        success: false,
        message: "Already Registered Kindly Login",
      });
    }

    // now we are registering user

    const hashedPassword = await hashPassword(password);
    const user = await new user_model({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};
//login ka call back function
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await user_model.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SecretKey, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login succesfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
export const testController = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "Middleware is working",
    });
  } catch (error) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "Something went wrong in Middleware ",
      err,
    });
  }
};
