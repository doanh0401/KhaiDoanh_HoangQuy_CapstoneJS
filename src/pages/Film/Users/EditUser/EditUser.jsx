import React, { createRef, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userService } from "../../../../services/user";
import { useLocation, useNavigate } from "react-router-dom";
export default function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const taiKhoanInputRef = createRef();
  const matKhauInputRef = createRef();
  const emailInputRef = createRef();
  const soDTInputRef = createRef();
  const hoTenInputRef = createRef();
  const loaiNguoiDungRef = createRef();
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    taiKhoan: "13123",
    matKhau: "13123abc@2910",
    email: "violet123@gmail.com",
    soDt: "012345678910",
    hoTen: "VIOLETES",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setUserInfo({
      // dynamic thông qua object literals
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    let isValid = true;

    isValid &=
      validateRequired(
        userInfo.matKhau,
        matKhauInputRef.current,
        "Chưa nhập mật khẩu"
      ) &&
      validateCheck(
        userInfo.matKhau,
        matKhauInputRef.current,
        "Định dạng mật khẩu chưa đúng",
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
      );

    isValid &=
      validateRequired(
        userInfo.soDt,
        soDTInputRef.current,
        "Chưa nhập số điện thoại"
      ) &&
      validateCheck(
        userInfo.soDt,
        soDTInputRef.current,
        "Vui lòng nhập số",
        /^[0-9]+$/
      ) &&
      validateCheckLength(
        userInfo.soDt,
        soDTInputRef.current,
        "Số điện thoại có 10 số",
        10
      );

    isValid &= validateRequired(
      userInfo.hoTen,
      hoTenInputRef.current,
      "Chưa nhập họ tên"
    );

    isValid &= validateRequired(
      userInfo.maLoaiNguoiDung,
      loaiNguoiDungRef.current,
      "Vui lòng chọn loại người dùng"
    );
    if (isValid) {
        editUser(userInfo);
        setUserInfo({
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDT: "",
          maNhom: "GP01",
          hoTen: "",
          maLoaiNguoiDung: "",
        });
      }
};

  const editUser = async (state) => {
    try {
      const result = await userService.fecthEditUserAdminApi(state);
      alert("Cập nhật người dùng thành công!");
      navigate("/admin/adduser");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };

  const validateRequired = (value, ref, mes) => {
    if (value !== "") {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };

  const validateCheckLength = (value, ref, mes, number) => {
    if (value.length === number) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };

  const validateCheck = (value, ref, mes, letter) => {
    if (letter.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = mes;
    return false;
  };
  
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      onSubmitCapture={handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Tài khoản">
        <Input onChange={handleChange} name="taiKhoan" value={userInfo.taiKhoan} disabled/>
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input onChange={handleChange} name="matKhau" value={userInfo.matKhau}/>
        <span className="text-danger" ref={matKhauInputRef}></span>
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input onChange={handleChange} name="hoTen" value={userInfo.hoTen}/>
        <span className="text-danger" ref={hoTenInputRef}></span>
      </Form.Item>
      <Form.Item label="Email">
        <Input onChange={handleChange} name="email" value={userInfo.email}/>
        <span className="text-danger" ref={emailInputRef}></span>
      </Form.Item>
      <Form.Item label="Số ĐT">
        <InputNumber onChange={handleChange} name="soDt"value={userInfo.soDt}/>
        <span className="text-danger" ref={soDTInputRef}></span>
      </Form.Item>
      <Form.Item label="Loại người dùng" value={userInfo.maLoaiNguoiDung}>
      <span className="text-danger" ref={loaiNguoiDungRef}></span>
      <Select
      defaultValue={userInfo.maLoaiNguoiDung}
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'KhachHang',
          label: 'Khách hàng',
        },
        {
          value: 'QuanTri',
          label: 'QuanTri',
        },
      ]}
    />
      </Form.Item>

      <button onClick={() => handleSubmit()} className="btn btn-success mr-2">Edit Người Dùng</button>
    </Form>
  );
};

