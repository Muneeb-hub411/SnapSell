import { response } from "express";
import user_model from "../DB/Models/user_model.js";
import orderModel from "../DB/Models/orderModel.js";

import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, phone, address, answer } = req.body;
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
    if (!answer) {
      res.send({ message: "Answer is required" });
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
      answer,
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
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SecretKey, {
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
        address: user.address,
        role: user.role,
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

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Passwword is required" });
    }

    // check
    const user = await user_model.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await user_model.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong in Forgot Password",
      error,
    });
  }
};

// Test controller
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

// Update User Profile Controller
export const updateUserProfileContoller = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await user_model.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await user_model.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating user profile",
      error,
    });
  }
};

// Orders Controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// All Orders Controller
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting All Orders",
      error,
    });
  }
};

// Order Status  Update Controller
export const orderStatusContoller = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};
