import React, { useState } from "react";
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
const AddUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maNhom: "GP01",
    maLoaiNguoiDung: [],
  });
  const maLoaiNguoiDung = async()=>{
    try{
        const result = await userService.maLoaiNguoiDungApi();
        setUserInfo({...userInfo, maLoaiNguoiDung:result.data.content});
        console.log(result.data.content);
    }
    catch (errors) {
        console.log("errors", errors);
      }
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setUserInfo({
      // dynamic thông qua object literals
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUser(userInfo));
  };
  const addUser = async (state) => {
    try {
      const result = await userService.fetchAdduserApi(state);
      alert("Thêm người dùng thành công!");
      console.log(result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
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
        <Input onChange={handleChange} name="taiKhoan"/>
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input onChange={handleChange} name="matKhau"/>
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input onChange={handleChange} name="hoTen" />
      </Form.Item>
      <Form.Item label="Email">
        <Input onChange={handleChange} name="email"/>
      </Form.Item>
      <Form.Item label="Số ĐT">
        <InputNumber onChange={handleChange} name="soDt"/>
      </Form.Item>
      <Form.Item label="Loại người dùng">
        <Select>
          
        </Select>
      </Form.Item>

      <button className="btn btn-success mr-2">Thêm người dùng</button>
    </Form>
  );
};
export default AddUser;
