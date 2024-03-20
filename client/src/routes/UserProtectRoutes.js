import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import axios from "axios";

const UserProtectRoutes = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/user-auth");

      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
        navigate("/login");
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default UserProtectRoutes;
