import React, { Fragment, useEffect, useState } from "react";
import { Button, Calendar, Table } from "antd";
import { size } from "lodash";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieService } from "../../../services/movie";
import { adminService } from "../../../services/admin";
import { userService } from "../../../services/user";
const { Search } = Input;

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetchUsersList();
  }, []);
  const fetchUsersList = async (hoTen = "") => {
    const result = await userService.fetchUserListApi("GP01", hoTen);
    setUsersList(result.data.content);
  };
  //   const fetchDelete = async (id) => {
  //     try {
  //       const result = await adminService.xoaPhimApi(id);
  //       alert("Xóa phim thành công!");
  //       dispatch(fetchUsersList());
  //       console.log(result.data.content);
  //     } catch (errors) {
  //       console.log("errors", errors.response?.data);
  //     }
  //   };
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: 150,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: 150,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "soDT",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              style={{ marginRight: "20px", fontSize: "30px", color: "blue" }}
            >
              <EditOutlined />
            </NavLink>
            <span
              key={2}
              style={{
                marginRight: "20px",
                fontSize: "30px",
                color: "red",
                cursor: "pointer",
              }}
            >
              <DeleteOutlined />
            </span>
          </Fragment>
        );
      },
      width: 100,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = value => {
    console.log(value);
    dispatch(fetchUsersList(value))
  }
  const data = usersList;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Quản lí người dùng</h2>
      <Button
        onClick={() => navigate(`/admin/adduser`)}
        style={{ marginBottom: "20px" }}
      >
        Thêm người dùng
      </Button>
      <Search
        style={{ marginBottom: "20px" }}
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
