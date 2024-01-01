import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./DB/db.js";
import authRoutes from "./routes/authRouter.js";
import cors from 'cors'

//environment variable
dotenv.config();

//DBConnection
connectDB();

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 5000;

//routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("SnapSell erver running");
});
app.get("/api/checkConnection", (req, res) => {
  res.json({ message: "connected with backend :)" });
});
app.listen(port, (e) => {
  if (e) {
    console.error(e);
  } else {
    console.log("Server Running on Port :" + port);
  }
});
