import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";

export default function Login() {
  const [isSignUpActive, setSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setSignUp(true);
  };

  const handleSignInClick = () => {
    setSignUp(false);
  };

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [signUpInfo, setSignUpInfo] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange1 = (event) => {
    setSignUpInfo({
      ...signUpInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    const result = await userService.signUpUser(signUpInfo);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await userService.loginUser(state);

    localStorage.setItem("USER_INFO", JSON.stringify(result.data.content));

    dispatch(setUserInfoAction(result.data.content));

    navigate("/");
  };

  return (
    <div className="box">
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              onChange={handleChange1}
              type="text"
              placeholder="Name"
              name="hoTen"
            />
            <input
              onChange={handleChange1}
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              onChange={handleChange1}
              type="text"
              placeholder="Tai Khoan"
              name="taiKhoan"
            />
            <input onChange={handleChange1} type="number" name="soDt" />
            <input
              onChange={handleChange1}
              type="password"
              placeholder="Password"
              name="matKhau"
            />
            <button onClick={handleSubmit1}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your account</span>
            <input
              onChange={handleChange}
              type="text"
              placeholder="tai khoan"
              name="taiKhoan"
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="matKhau"
            />
            <a href="#">Forgot your password?</a>
            <button onClick={handleSubmit}>Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
