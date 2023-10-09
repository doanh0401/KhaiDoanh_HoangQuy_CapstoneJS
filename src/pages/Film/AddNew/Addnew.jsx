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
import { useFormik } from "formik";
import moment from "moment";
import { redirect } from "react-router-dom";
import { adminService } from "../../../services/admin";
import { useDispatch } from "react-redux";
const Addnew = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("")
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (value) => {
        value.maNhom= "GP01";
      let formData = new FormData();
      for(let key in value){
        if(key === 'hinhAnh'){
          formData.append('File', value[key], value[key].name)
        }else{
          formData.append(key, value[key]);
            
        }
      }
      console.log(formData.get('File'));
      dispatch(themPhimUpLoadHinh(formData));
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) =>{
    let file = e.target.files[0];
    if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png'){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            setImgSrc(e.target.result);
    }
    formik.setFieldValue('hinhAnh', file)
    }
  };
  const themPhimUpLoadHinh = async (formData) =>{
        try{
            const result = await adminService.themPhimUpLoadHinhApi(formData);
            alert('Thêm phim thành công!')
            console.log(result);
        }
        catch (errors){
            console.log(errors.response?.data);
        }
    }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
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
        <h3 style={{ marginBottom: "20px" }}>Thêm phim mới</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD//MM/YYYY"}
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/jpeg, image/jpg, image/gif, image/png" />
          <br/>
          <img width={200} height={150} src={imgSrc} alt="" />
        </Form.Item>
        <Form.Item label="">
          <button type="submit">Thêm phim</button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Addnew;
