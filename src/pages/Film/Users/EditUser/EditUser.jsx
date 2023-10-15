import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { userService } from "../../../../services/user";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { SET_THONG_TIN_NGUOI_DUNG } from "../../../../store/types/adminType";

const EditUser = () => {
  const { taikhoan } = useParams();
  const negative = useNavigate();
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector((state) => state.adminReducer);
  useEffect(() => {
    fetchUserDetail();
  }, []);
  const fetchUserDetail = async () => {
    try {
      const result = await userService.fetchUserDetailApi(taikhoan);
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        thongTinNguoiDung: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung?.taiKhoan,
      matKhau: thongTinNguoiDung?.matKhau,
      email: thongTinNguoiDung?.email,
      soDT: thongTinNguoiDung?.soDT,
      hoTen: thongTinNguoiDung?.hoTen,
      maNhom: "GP01",
      maLoaiNguoiDung: thongTinNguoiDung?.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      console.log(values);
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(capNhatNguoiDung(values));
    },
  });
  const [userInfo, setUserInfo] = useState({
    maLoaiNguoiDung: [],
  });
  const capNhatNguoiDung = async (formData) => {
    try {
      const result = await userService.fecthEditUserAdminApi(formData);
      alert("Cập nhật thành công!");
      console.log(result.data.content);
      negative("/admin/users");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
  const handleChangeNguoiDung = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  useEffect(() => {
    maLoaiNguoiDung();
  }, []);
  const maLoaiNguoiDung = async () => {
    try {
      const result = await userService.maLoaiNguoiDungApi();
      setUserInfo({ ...userInfo, maLoaiNguoiDung: result.data.content });
    } catch (errors) {
      console.log("errors", errors);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
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
        maxWidth: 800,
      }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 style={{ marginBottom: "20px" }}>Cập nhật người dùng</h3>
      <Form.Item label="Tài khoản">
        <Input disabled
          name="taiKhoan"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>
      <Form.Item label="Số ĐT">
        <Input
          name="soDT"
          onChange={formik.handleChange}
          value={formik.values.soDT}
        />
      </Form.Item>
      <Form.Item label="Loại người dùng">
        <Select
          value={formik.values.maLoaiNguoiDung}
          options={userInfo.maLoaiNguoiDung?.map((mlnd, idx) => ({
            label: mlnd.tenLoai,
            value: mlnd.maLoaiNguoiDung,
          }))}
          onChange={handleChangeNguoiDung("maLoaiNguoiDung")}
          placeholder="Chọn loại khách hàng"
        />
      </Form.Item>
      <button type="submit">Cập nhật</button>
    </Form>
  );
};
export default EditUser;
