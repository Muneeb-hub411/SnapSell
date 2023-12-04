import user_model from "../DB/Models/user_model.js";
import { hashPassword } from "../helpers/authHelpers.js";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, phone, address } = req.body;
    //Doing Validation
    if (!name) {
      res.send({ error: "Name is required" });
    }
    if (!password) {
      res.send({ error: "Password is required" });
    }
    if (!email) {
      res.send({ error: "Email  is required" });
    }
    if (!phone) {
      res.send({ error: "Phone is required" });
    }
    if (!address) {
      res.send({ error: "Address is required" });
    }

    // idher hum existing user dekh rha
    const existingUser = await user_model.findOne({ email: email });
    if (existingUser) {
      res.status(200).send({
        success: true,
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
export default { registerController };
