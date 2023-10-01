import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../../services/user';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmitRegister = async (values, { resetForm }) => {
        await userService.signUpUser(values);

        resetForm();

        navigate("/login");
    }
    const SignUpSchema = Yup.object().shape({
        taiKhoan: Yup.string().required("(*) Tài khoản không được để trống"),
        matKhau: Yup.string().required("(*) Mật khẩu không được để trống"),
        email: Yup.string().required("(*) Email không được để trống"),
        soDt: Yup.string().required("(*) Số điện thoại không được để trống"),
        hoTen: Yup.string().required("(*) Họ tên không được để trống"),
    });

  return (
    <div>
      <h1>Register here</h1>
      <Formik
        initialValues={{
          taiKhoan: '',
          matKhau: '',
          email: '',
          soDt: '',
          maNhom: 'GP08',
          hoTen: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmitRegister}
      >
        <Form className="register-form">
          <div className='form-control2'>
            <Field name='taiKhoan' type='text' placeholder='Tài khoản' />
            <span></span>
            <ErrorMessage name='taiKhoan' component='label' className='form-label text-danger' />
          </div>
          <div className='form-control2'>
            <Field name='matKhau' type='password' placeholder='Mật khẩu' />
            <span></span>
            <ErrorMessage name='matKhau' component='label' className='form-label text-danger' />
          </div>
          <div className='form-control2'>
            <Field name='email' type='text' placeholder='Email' />
            <span></span>
            <ErrorMessage name='email' component='label' className='form-label text-danger' />
          </div>
          <div className='form-control2'>
            <Field name='soDt' type='text' placeholder='Số điện thoại' />
            <span></span>
            <ErrorMessage name='soDt' component='label' className='form-label text-danger' />
          </div>
          <div className='form-control2'>
            <Field name='hoTen' type='text' placeholder='Họ Tên' />
            <span></span>
            <ErrorMessage name='hoTen' component='label' className='form-label text-danger' />
          </div>
          <button type='submit'>Register</button>
        </Form>
      </Formik>
    </div>
  )
}
