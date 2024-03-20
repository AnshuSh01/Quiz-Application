import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !name || !password) {
        toast.error("Please provide all fields");
      } else {
        const { data } = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          toast.success(data.msg);
          navigate("/login");
        } else {
          toast.error("Please enter valid credentials");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <form className="container mt-3">
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Register;
