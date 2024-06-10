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
import {
  Button,
  ButtonGroup,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
} from "react-bootstrap";

import { connect } from "react-redux";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import BgImg from "../../assests/assets/login/cbm_bg_test.jpg";
import UsernameIcon from "../../assests/assets/login/Username.png";
import PasswordLock from "../../assests/assets/login/password_lock.png";

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
        // email: email,
        // password: password,

        {
          username: "harshita17",
          password:
            "Jik2HooKzKsEQdsWzUCB5aCFjMSlU99jZcMVETsHa4VM2qf36g58C7q2E5JdEsVKXBGRedcsnNmj1iYE1cespDp1ZzN/M1IA06n0cSG8Wsp1HJ8xy22cYHuZefBbRQZAfDrI5BVhq7xfWLYnFZKGKYiTgGB3fPBBeybvjzKw21E=",
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
      <div
        class="login"
        style={{
          backgroundImage: `url(${BgImg})`,
          height: "100vh",
          backgroundRepeat: "no-repeat ",
          backgroundSize: "contain",
        }}
      >
        <section class="banner ">
          <div class="login-welcome">
            <div class="container-fluid">
              <div>
                <div class="main_login   p-0 m-0 no-gutters  d-sm-flex d-xl-flex d-lg-flex justify-content-center align-items-center vh-100">
                  {/* login division */}
                  <div class="login-form  position-relative">
                    <div>
                      {/* <div>
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
                      </div> */}
                      <div style={{ textAlign: "center" }}>
                        <br />
                        <h1 className="loginHeader">User Login</h1>
                      </div>
                      <div class="form">
                        {/* user input field  */}

                        <div
                          class="form-group"
                          style={{ position: "relative" }}
                        >
                          <img
                            src={UsernameIcon}
                            alt="User Image"
                            style={{
                              position: "absolute",

                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                          <input
                            type="id"
                            autoFocus
                            class="form-control "
                            id="usernaname"
                            placeholder="UserName"
                            // autocomplete="off"
                            // maxLength={30}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              border: "none",
                              borderBottom: "3px solid #00a3e4", // Change color as needed
                              paddingLeft: "30px", // Adjust padding to accommodate the icon
                              outline: "none", // Remove default focus outline
                              borderRadius: "7px",
                              // fontSize:'14px',
                              boxShadow: "none",
                            }}
                          />
                          <div class="invalid-error">
                            <i class="fa-solid fa-circle-exclamation me-2"></i>
                            {usernameerror ? "Username is required *" : ""}
                          </div>
                        </div>
                        {/* password field  */}
                        <div class="form-group input-pass position-relative mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            autocomplete="off"
                            required
                            autoFocus
                            name="pass"
                            class="form-control input-pass "
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                              border: "none",
                              borderBottom: "3px solid #00a3e4", // Change color as needed
                              paddingLeft: "30px", // Adjust padding to accommodate the icon
                              outline: "none", // Remove default focus outline
                              borderRadius: "7px",
                              // fontSize:'14px',
                              boxShadow: "none",
                            }}
                          />
                          <img
                            src={PasswordLock}
                            alt="User Image"
                            style={{
                              position: "absolute",

                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                          <div class="invalid-error">
                            <i class="fa-solid fa-circle-exclamation me-2"></i>
                            {passworderror ? "Password is required *" : ""}
                          </div>
                          {/* <div
                            class="log-eye"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye /> : <EyeSlash />}
                          </div> */}
                        </div>
                        <FormGroup controlId="formBasicCheckbox">
                          <FormCheck
                            type="checkbox"
                            label="Remember Me"
                            style={{ color: "#673392" }}
                            // checked={rememberMe}
                            // onChange={(e) => this.handleCheck(e.target.checked)}
                          />
                        </FormGroup>
                        {/* button  */}
                        <button
                          // variant="primary"
                          // block
                          style={{
                            width: "40%",
                            margin: "0 auto",
                            fontSize: "22px",
                            background: "#00a3e4",
                            color: "#ffffff",
                            display: "flex",
                            
                            justifyContent: "center",
                            padding:'6px',
                            borderRadius:'6px',
                            boxShadow:'0px 6px 6px 6px rgb(229 216 216 / 75%)'
                            // rgb(62, 138, 222)
                            // Add hover styles
                            
                            
                          }}
                          type="submit"
                          class="  btn-hover-effect"
                          onClick={login}
                        >
                          {spinner ? (
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "LOGIN"
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
                {/* <div class="col-md-7 col-lg-7 log-img-main d-none d-lg-flex d-xl-flex justify-content-center align-items-center">
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
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default connect(mapStateToProps, {})(Login);
