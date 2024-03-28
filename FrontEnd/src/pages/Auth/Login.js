import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import "../../styles/Login.css";
import image_1 from "../../pages/images/image_1.png";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - SnapSell">
       <div className="container">
      <div className="row" style={{ height: "60%", marginTop: "30px" }}>
        <div className="col-md-7">
          <img
            src={image_1}
            alt="Dummy Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

          <div style={{ width: "35%" }}>
          <h1 className="title">Log in to SnapSell</h1>

            <div className="mb-3">
              {/* <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
              /> */}

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
                aria-describedby="emailHelp"
                placeholder="Email"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              {/* <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              /> */}
              
              <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"  // Update ID if desired
                placeholder="Password"
                aria-describedby="emailHelp"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>  
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-danger"
              >
                LOGIN
              </button>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
