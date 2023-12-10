import jwt from "jsonwebtoken";
import user_model from "../DB/Models/user_model.js";

//protected routes

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SecretKey
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Jwt token not matched",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await user_model.findById(req.user._id);
    if (user.role !== 1) {
      res.status(401).send({
        success: false,
        message: "You are not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin middleware",
    });
  }
};
