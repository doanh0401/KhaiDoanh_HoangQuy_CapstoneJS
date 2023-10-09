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
import { movieService } from "../../services/movie";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { adminService } from "../../services/admin";
import { useDispatch } from "react-redux";
const { Search } = Input;

export default function Film() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async (tenPhim='') => {
    const result = await movieService.fecthMovieListApi("GP01", tenPhim);
    setMovieList(result.data.content);
  };
  const fetchDelete = async (id) => {
    try {
      const result = await adminService.xoaPhimApi(id);
      alert("Xóa phim thành công!");
      dispatch(fetchMovieList());
      console.log(result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim.length - b.maPhim.length,
      sortDirections: ["descend"],
      width: 150,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} />
          </Fragment>
        );
      },
      width: 100,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: 800,
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 100
              ? film.moTa.substr(0, 100) + "..."
              : film.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              to={`/admin/edit/${film.maPhim}`}
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
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn xóa phim này không?")) {
                  dispatch(fetchDelete(film.maPhim));
                }
              }}
            >
              <DeleteOutlined />
            </span>
            <NavLink
              key={3}
              to={`/admin/showtimes/${film.maPhim}/${film.tenPhim}`}
              style={{ marginRight: "20px", fontSize: "30px", color: "green" }}
              onClick={()=>{
                localStorage.setItem('filmParams',JSON.stringify(film))
              }}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
      width: 200,
    },
  ];
  const data = movieList;
  const onSearch = value => {
    console.log(value);
    dispatch(fetchMovieList(value))
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Quản lí phim</h2>
      <Button
        onClick={() => navigate(`/admin/film/addnew`)}
        style={{ marginBottom: "20px" }}
      >
        Thêm phim
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
