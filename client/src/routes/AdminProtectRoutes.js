import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import axios from "axios";

const AdminProtectRoutes = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/admin-auth");
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
        navigate("/");
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminProtectRoutes;
