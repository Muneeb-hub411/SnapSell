import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import TextField from "@mui/material/TextField";
// import "../../styles/Login.css";
import image_1 from "../../pages/images/image_1.png";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Forgot Password - SnapSell">
      <div className="container">
        <div className="row" style={{ height: "60%", marginTop: "30px" }}>
          <div className="col-md-7">
            <img
              src={image_1}
              alt="Dummy Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="detail_form">
            <h1 className="title">Reset password</h1>

            <div className="mb-3">
              <TextField
                label="Email"
                multiline
                maxRows={7}
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                aria-describedby="emailHelp"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Enter name of your First Pet"
                multiline
                maxRows={7}
                variant="standard"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter name of your First Pet"
                aria-describedby="emailHelp"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="New Password"
                variant="standard"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword" // Update ID if desired
                placeholder="Password"
                required
                style={{ width: "100%" }}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-danger"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
