import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import TextField from "@mui/material/TextField";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register",
        { name, email, password, phone, address, answer }
      );
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate("/login");
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - SnapSell">
      <div className="form-container">
        <h1 className="title">REGISTER FORM</h1>

        <div style={{width:"25%"}}>
          <div className="mb-3">
            {/* <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              placeholder="Full Name"
              required
            /> */}
            <TextField
                label="Full Name"
                multiline
                maxRows={7}
                variant="standard"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Full Name"
                required
                style={{ width: "100%" }}
              />
          </div>
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
                multiline
                maxRows={7}
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                aria-describedby="emailHelp"
                placeholder="Password"
                required
                style={{ width: "100%" }}
              />
          </div>
          <div className="mb-3">
            {/* <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              aria-describedby="phoneHelp"
              placeholder="Phone"
              required
            /> */}
            <TextField
                label="Phone"
                multiline
                maxRows={7}
                variant="standard"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="phoneHelp"
                placeholder="Phone"
                required
                style={{ width: "100%" }}
              />
          </div>
          <div className="mb-3">
            {/* <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              aria-describedby="addressHelp"
              placeholder="Address"
              required
            /> */}
            <TextField
                label="Address"
                multiline
                maxRows={7}
                variant="standard"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                aria-describedby="addressHelp"
                placeholder="Address"
                required
                style={{ width: "100%" }}
              />
          </div>
          <div className="mb-3">
            {/* <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              aria-describedby="answerHelp"
              placeholder="What is the name of your first pet?"
              required
            /> */}
            <TextField
                label="What is the name of your first pet?"
                multiline
                maxRows={7}
                variant="standard"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                aria-describedby="addressHelp"
                placeholder="What is the name of your first pet?"
                required
                style={{ width: "100%" }}
              />
          </div>

          <button type="submit" className="btn btn-danger" onClick={handleSubmit}>
            REGISTER
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Register;