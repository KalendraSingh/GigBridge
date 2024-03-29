import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { BaseUrl } from "../Auth/BaseUrl";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BaseUrl}/api/v1/user/logout`,

  //     );
  //     toast.success(response.data.message);
  //     setIsAuthorized(false);
  //     localStorage.removeItem("token")
  //     navigateTo("/login");
  //   } catch (error) {
  //     toast.error(error.response.data.message), setIsAuthorized(true);
  //   }
  // };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BaseUrl}/api/v1/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false); // Update the authentication state
      localStorage.removeItem("token"); // Remove token from local storage
      navigateTo("/login"); // Redirect to the login page
    } catch (error) {
      // Handle error if logout fails
      toast.error(error.response.data.message);
      setIsAuthorized(true); // Still update the authentication state even if logout fails
      // Still remove token from local storage
  // Redirect to the login page
    }
  };
  

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="GigBridge">

          <Link to={"/"} style={{textDecoration:"none",style:"none"}}>
            <h4 style={{ color: "#ffffff", padding: "20px"}}>GigBridge</h4>
          </Link>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
