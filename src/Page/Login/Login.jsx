import React, { useEffect, useState } from "react";
import "../../assests/assets/css/style.css";
import inaipilogo from "../../assests/assets/images/Inaipi_Logo.png";
import bell from "../../assests/assets/login/bell.webp";
import chat from "../../assests/assets/login/chat.webp";
import sms from "../../assests/assets/login/sms.webp";
import phone from "../../assests/assets/login/phone.png";
import smartphone from "../../assests/assets/login/girl_on_smartphone.webp";
import { BaseUrl } from "../Constant/BaseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { Eye, EyeSlash } from "@phosphor-icons/react";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    auth: data.auth,
  };
};

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameerror, setUsernameerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const tenantID = new URLSearchParams(window.location.search).get(
      "tenantID"
    );
    localStorage.setItem("TenantId", tenantID);
  }, []);

  const login = async () => {
    setSpinner(true);
    await axios
      .post(
        BaseUrl + "/login/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TenantID: localStorage.getItem("TenantId"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.status);
        setSpinner(true);
        if (response.data.status == "OK") {
          setSpinner(false);
          localStorage.setItem(
            "userinformation",
            JSON.stringify(response.data.dataList)
          );

          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setSpinner(false);
          toast.warning(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })

      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div class="login">
        <section class="banner set-bg">
          <div class="login-welcome">
            <div class="container-fluid">
              <div class="row">
                <div class="main_login col-lg-5 col-md-12 col-sm-12  p-0 m-0 no-gutters  d-sm-flex d-xl-flex d-lg-flex justify-content-center align-items-center vh-100">
                  <div class="hero__caption inaipi-welcome animate__animated animate__bounceIn animate__slow position-relative">
                    <div class="w-100">
                      <div>
                        <div class="logo animate__animated animate__fadeIn animate__slow">
                          <img
                            width="50"
                            height="50"
                            src={inaipilogo}
                            alt="Inaipi_logo"
                          />
                        </div>
                        <div class="welcm_note">
                          <strong>CBM V2.0</strong>
                        </div>
                        <h3 class="com-name  mb-4 animate__animated animate__flipInX animate__slow mt-4 pl-1 pr-1">
                          Log in
                        </h3>
                      </div>
                      <div class="form">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="usernaname"
                            placeholder="Enter your Email"
                            autocomplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div class="invalid-error">
                            <i class="fa-solid fa-circle-exclamation me-2"></i>
                            {usernameerror ? "Username is required *" : ""}
                          </div>
                        </div>
                        <div class="form-group input-pass position-relative mb-5">
                          <input
                            type={showPassword ? "text" : "password"}
                            autocomplete="off"
                            required
                            name="pass"
                            class="form-control input-pass"
                            id="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div class="invalid-error">
                            <i class="fa-solid fa-circle-exclamation me-2"></i>
                            {passworderror ? "Password is required *" : ""}
                          </div>
                          <div
                            class="log-eye"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye /> : <EyeSlash />}
                          </div>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-blue-primary"
                          onClick={login}
                        >
                          {spinner ? (
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <footer class="copyrights">
                    <div class="animate__animated animate__slideInUp animate__slow">
                      <a href="www.inaipiapp.com" target="_blank">
                        inaipi
                      </a>
                      &copy; <p>2024</p>
                    </div>
                  </footer>
                </div>
                <div class="col-md-7 col-lg-7 log-img-main d-none d-lg-flex d-xl-flex justify-content-center align-items-center">
                  <div>
                    <div class="glassmorphism position-relative">
                      <div class="login_img  animate__animated animate__slideInUp">
                        <div class="round">
                          <img
                            class="image-2 fly-sm animate__animated animate__pulse"
                            width="118"
                            height="105"
                            src={bell}
                            alt="bell"
                            priority
                          />
                          <img
                            class="image-3 fly-sm animate__animated animate__pulse"
                            width="117"
                            height="118"
                            src={chat}
                            alt="chat"
                            priority
                          />
                          <img
                            class="image-4 fly-sm animate__animated animate__pulse"
                            width="127"
                            height="95"
                            src={sms}
                            alt="sms"
                            priority
                          />
                          <img
                            class="image-5 fly-sm animate__animated animate__pulse"
                            width="127"
                            height="95"
                            src={phone}
                            alt="sms"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    <div class="main_img">
                      <img
                        class="image-1  animate__animated animate__slideInUp"
                        width="600"
                        height="600"
                        src={smartphone}
                        alt="girl_on_smartphone"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default connect(mapStateToProps, {})(Login);
