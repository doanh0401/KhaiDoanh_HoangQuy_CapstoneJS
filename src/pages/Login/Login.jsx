import React from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Register from "./components/Register";

export default function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {

    const result = await userService.loginUser(values);

    localStorage.setItem("USER_INFO", JSON.stringify(result.data.content));

    dispatch(setUserInfoAction(result.data.content));

    resetForm();

    navigate("/");
  };

  const LoginSchema = Yup.object().shape({
    taiKhoan: Yup.string().required("(*) Tài khoản không được để trống"),
    matKhau: Yup.string().required("(*) Mật khẩu không được để trống"),
  });

  return (
    <div className="background">
      <div className="container" id="container">
        <div className="form-container register-container">
          <Register />
        </div>
        <Formik
          initialValues={{
            taiKhoan: "",
            matKhau: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <div className="form-container login-container">
            <Form className="form-lg">
              <h1>Login here</h1>
              <div className="form-control2">
                <Field name="taiKhoan" type="text" placeholder="Tài khoản" />
                <span></span>
              </div>
              <ErrorMessage
                name="taiKhoan"
                component="label"
                className="form-label form-label-login text-danger"
              />
              <div className="form-control2">
                <Field name="matKhau" type="password" placeholder="Mật khẩu" />
                <span></span>
              </div>
              <ErrorMessage
                name="matKhau"
                component="label"
                className="form-label form-label-login text-danger"
              />
              <button type="submit">Login</button>
            </Form>
          </div>
        </Formik>
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
