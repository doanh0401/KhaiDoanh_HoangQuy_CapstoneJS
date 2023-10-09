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
import { useFormik } from "formik";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { adminService } from "../../../services/admin";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinPhimAction } from "../../../store/actions/adminAction";
import { SET_THONG_TIN_PHIM } from "../../../store/types/adminType";
dayjs.extend(customParseFormat);

const Edit = () => {
  const { id } = useParams();
  const negative=useNavigate();
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinPhim } = useSelector((state) => state.adminReducer);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    try {
      const result = await adminService.layThongTinPhimApi(id);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log(values);
      values.maNhom = "GP01";
      let formData = new FormData();
      for (let key in values) {
        if (key === "hinhAnh") {
          if (values[key] !== null) {
            formData.append("File", values[key], values[key].name);
          }
        }
        else{
          formData.append(key, values[key]);
        }
      }
      console.log(formData);
      dispatch(capNhatPhimUpload(formData));
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value);
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
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue('hinhAnh', file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  const capNhatPhimUpload = async (formData) => {
    try {
      const result = await adminService.capNhatPhimUploadApi(formData);
      alert("Cập nhật phim thành công!");
      console.log(result.data.content);
      negative("/admin/film");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };

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
        <h3 style={{ marginBottom: "20px" }}>Cập nhật phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format="DD//MM/YYYY"
            onChange={handleChangeDatePicker}
            value={dayjs(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/jpeg, image/jpg, image/gif, image/png"
          />
          <br />
          <img
            width={200}
            height={150}
            src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          />
        </Form.Item>
        <Form.Item label="">
          <button type="submit">Cập nhật</button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Edit;
