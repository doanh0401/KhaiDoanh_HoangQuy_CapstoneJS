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
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userService } from "../../../../services/user";
import * as Yup from "yup";

const AddUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const addUser = Yup.object().shape({
    taiKhoan:Yup.string().required("Tài khoản không được để trống!"),
    matKhau:Yup.string().required("Mật khẩu không được để trống!"),
    email:Yup.string().required("Email không được để trống!").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Vui lòng nhập đúng định dạng!"),
    soDT:Yup.string().required("Giá vé không được để trống!").matches(/^[0-9]+$/,"Vui lòng nhậ đúng định dạng!"),
    hoTen: Yup.string().required("Họ tên không được để trống!").matches(/^[ aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/,"Vui lòng nhập đúng định dạng!"),
    maLoaiNguoiDung:Yup.string().required("Loại người dùng không được để trống!"),

  })
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
    },
    validationSchema:addUser,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const result = await userService.fetchAdduserApi(values);
        alert("Thêm người dùng thành công!");
      } catch (errors) {
        console.log(errors.response?.data);
      }
    },
  });
  const [userInfo, setUserInfo] = useState({
    maLoaiNguoiDung: [],
  });
  const handleChangeNguoiDung = async (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
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
        maxWidth: 600,
      }}
      onSubmitCapture={formik.handleSubmit}

    >
      <h3 style={{ marginBottom: "20px" }}>Thêm người dùng</h3>
      <Form.Item label="Tài khoản">
        <Input name="taiKhoan" onChange={formik.handleChange} />
        {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <span className='form-label text-danger'>{formik.errors.taiKhoan}</span>
          )}
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input name="matKhau" onChange={formik.handleChange} />
        {formik.errors.matKhau && formik.touched.matKhau && (
            <span className='form-label text-danger'>{formik.errors.matKhau}</span>
          )}
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input name="hoTen" onChange={formik.handleChange} />
        {formik.errors.hoTen && formik.touched.hoTen && (
            <span className='form-label text-danger'>{formik.errors.hoTen}</span>
          )}
      </Form.Item>
      <Form.Item label="Email">
        <Input name="email" onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email && (
            <span className='form-label text-danger'>{formik.errors.email}</span>
          )}
      </Form.Item>
      <Form.Item label="Số ĐT">
        <Input name="soDT" onChange={formik.handleChange} />
        {formik.errors.soDT && formik.touched.soDT && (
            <span className='form-label text-danger'>{formik.errors.soDT}</span>
          )}
      </Form.Item>
      <Form.Item label="Loại người dùng">
        <Select
          options={userInfo.maLoaiNguoiDung?.map((mlnd, idx) => ({
            label: mlnd.tenLoai,
            value: mlnd.maLoaiNguoiDung,
          }))}
          onChange={handleChangeNguoiDung}
          placeholder="Chọn loại khách hàng"
        />
         {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung && (
            <span className='form-label text-danger'>{formik.errors.maLoaiNguoiDung}</span>
          )}
      </Form.Item>
      <Button htmlType="submit">Thêm người dùng</Button>
    </Form>
  );
};
export default AddUser;
