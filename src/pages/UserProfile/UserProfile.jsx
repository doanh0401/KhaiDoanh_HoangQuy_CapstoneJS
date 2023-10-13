import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.scss";
import * as Yup from "yup";
import { Form, ErrorMessage, Field, Formik } from "formik";
import { userService } from "../../services/user";
import { formatDate } from "../../utils/date";
import { LoadingContext } from "../../contexts/LoadingContext";
import { Container, Divider, Grid, Typography, colors } from "@mui/material";

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("(*) Tài khoản không được để trống"),
  matKhau: Yup.string()
    .required("(*) Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  email: Yup.string()
    .email("(*) Email không hợp lệ")
    .required("(*) Email không được để trống"),
  soDT: Yup.string().required("(*) Số điện thoại không được để trống"),
  hoTen: Yup.string().required("(*) Họ tên không được để trống"),
});

export default function UserProfile() {
  //const [_, setIsLoading] = useContext(LoadingContext);
  const [userInfo, setUserInfo] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    hoTen: "",
    maNhom: "GP08",
    loaiNguoiDung: "",
  });

  const [isShow, setIsShow] = useState(false);

  const [fieldErrors, setFieldErrors] = useState("");

  const [ticketInfo, setTicketInfo] = useState([]);

  const handlePasswordShow = () => {
    setIsShow((current) => !current);
  };

  const handleChangeUserInfo = async (values, { resetForm }) => {
    try {
      await userService.updateUserInfo(values);
      handlefetchUserInfo();
      setFieldErrors("");
      resetForm();
    } catch (error) {
      setFieldErrors(error.response.data.content);
      resetForm();
    }
  };

  const handlefetchUserInfo = async () => {
    //setIsLoading({ isLoading: true });
    const result = await userService.fetchUserInfoApi();
    setUserInfo(result.data.content);
    setTicketInfo(result.data.content.thongTinDatVe);
    //setIsLoading({ isLoading: false });
  }; 

  useEffect(() => {
    handlefetchUserInfo();
  }, []);

  const renderTicketInfo = () => {
    return ticketInfo.map((element) => {
      return (
          <Grid key={element.maVe} className="ticketCinema" item={true} xs={12} md={6}>
            <Grid container={true} className="gridContainer">
              <Grid item xs={12}>
                <Typography gutterBottom={true} variant="h3">
                  Ngày Đặt: {formatDate(element.ngayDat)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h1">
                  Tên phim: {element.tenPhim}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">
                  Thời lượng: {element.thoiLuongPhim} phút, Giá vé: {element.giaVe} VND
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {element.danhSachGhe.slice(0, 1).map((element) => {
                  return <Typography style={{color:"#00ac4d"}} variant="h1" key={element.maCumRap}>{element.tenHeThongRap}</Typography>
                })}
              </Grid>
              <Grid item xs={12}>
                {element.danhSachGhe.slice(0, 1).map((element) => {
                  return (
                    <Typography
                      variant="h3"
                      key={element.maHeThongRap}
                    >
                      {element.tenCumRap}
                    </Typography>
                  );
                })}
                <Typography variant="h3">
                  Ghế số: {element.danhSachGhe.map((element) => {
                  return (
                    <span
                      key={element.maGhe}
                      className="ticket-details mr-1 d-inline-block text-danger"
                    >
                      {`${element.tenGhe} `}
                    </span>
                  );
                })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
      );
    });
  };

  return (
    <div className="profile-wrapper">
    <Container maxWidth="md">
      <div className="card mt-5 border-5 pt-2 pb-0 px-3">
        <div className="card-header">
          <div className="row">
            <div className="col-12">
              <h4 className="card-title">
                <b>Thông tin tài khoản</b>
              </h4>
            </div>
          </div>
        </div>
        <div className="card-body bg-white px-1">
          <Formik
            enableReinitialize
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={handleChangeUserInfo}
          >
            <Form className="register-form">
              <div className="row">
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    {" "}
                    <span className="text-red">* </span>Tài Khoản
                  </label>
                  <Field
                    readOnly={true}
                    className="form-control"
                    name="taiKhoan"
                    type="text"
                    placeholder="Tài khoản"
                  />
                  <span></span>
                  <ErrorMessage
                    name="taiKhoan"
                    component="label"
                    className="form-label text-danger"
                  />
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    <span className="text-red">* </span>Mật Khẩu{" "}
                  </label>
                  <Field
                    className="form-control"
                    name="matKhau"
                    type={isShow ? "text" : "password"}
                    placeholder="Mật khẩu"
                  />
                  <span></span>
                  <ErrorMessage
                    name="matKhau"
                    component="label"
                    className="form-label text-danger"
                  />
                  <div>
                    <input onChange={handlePasswordShow} type="checkbox" />{" "}
                    Show Password
                  </div>
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    <span className="text-red">* </span>Email{" "}
                  </label>
                  <Field
                    className="form-control"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  <span></span>
                  <ErrorMessage
                    name="email"
                    component="label"
                    className="form-label text-danger"
                  />
                  {fieldErrors && (
                    <label label className="text-danger">
                      {fieldErrors}
                    </label>
                  )}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    <span className="text-red">* </span>Số Điện Thoại{" "}
                  </label>
                  <Field
                    className="form-control"
                    name="soDT"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                  <span></span>
                  <ErrorMessage
                    name="soDT"
                    component="label"
                    className="form-label text-danger"
                  />
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    <span className="text-red">* </span>Họ Tên{" "}
                  </label>
                  <Field
                    className="form-control"
                    name="hoTen"
                    type="text"
                    placeholder="Họ Tên"
                  />
                  <span></span>
                  <ErrorMessage
                    name="hoTen"
                    component="label"
                    className="form-label text-danger"
                  />
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                  <label className="label-user">
                    <span className="text-red">* </span>Mã Loại Người Dùng{" "}
                  </label>
                  <Field
                    readOnly={true}
                    className="form-control"
                    name="loaiNguoiDung.tenLoai"
                    type="text"
                    placeholder="Mã Loại Người Dùng"
                  />
                  <span></span>
                  <ErrorMessage
                    name="maLoaiNguoiDung"
                    component="label"
                    className="form-label text-danger"
                  />
                </div>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-sm btnUserInfo">
                  Update
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Grid className="spacing-xs-3 ticketHistory">
        <Grid item xs={12} style={{padding:"0px"}}>
          <Typography variant="h1" style={{paddingTop:"5px"}}>Lịch sử đặt vé</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {renderTicketInfo()}
      </Grid>
    </Container>
  </div>
  );
}
