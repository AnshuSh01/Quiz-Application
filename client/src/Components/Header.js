import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { AiFillCaretDown } from "react-icons/ai";
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogOut = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("LogOut successfully");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to={"/"}>
              Quizzer
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
            {auth?.user ? (
              <>
                <div className="d-flex m-3">
                  <h6>Hello {auth?.user?.name} 🙂</h6>
                </div>
                <div
                  className="d-flex m-3"
                  style={{ border: "1px solid lightblue" }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/dashboard/user"}
                  >
                    Score Dashboard
                  </Link>
                </div>
                <div class="dropdown">
                  <button>
                    Dashboard <AiFillCaretDown />
                  </button>
                  <div class="dropdown-content">
                    <Link
                      className="nav-link active"
                      to={
                        auth?.user
                          ? `/dashboard/${
                              auth?.user?.role === 0 ? "user" : "admin"
                            }`
                          : "/login"
                      }
                    >
                      {auth?.user?.role === 0
                        ? "User Dashboard"
                        : "Admin Dashboard"}
                    </Link>

                    <Link style={{ textDecoration: "none" }} to={"/quiz"}>
                      Attempt Quiz
                    </Link>

                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/create-quiz"}
                    >
                      Create Quiz
                    </Link>
                  </div>
                </div>
                <div className="d-flex m-2">
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline-success"
                  >
                    LogOut
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex  ">
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-outline-success"
                  >
                    Login
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate("/register")}
                    className="btn btn-outline-success"
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
