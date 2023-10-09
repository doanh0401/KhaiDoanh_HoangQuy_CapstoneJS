import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderLogin = () => {
    if (!userState.userInfo) {
      return (
        <div className="account-header-wrapper mn-login">
          <a href="" className="topskip-link skip-account">
            <span onClick={() => navigate("/login")} className="label">
              Đăng nhập/ Đăng ký
            </span>
          </a>
        </div>
      );
    } else {
      return (
        <>
          <div className="navbar-nav ml-auto navbar-logout">
            <div className="nav-item-logout dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-link-info nav-img dropdown-toggle user-action"
              >
                {/* <img src={avatar} className="avatar" alt="Avatar" /> */}
                Hello {userState.userInfo.hoTen} <b className="caret"></b>
              </a>
              <div className="dropdown-menu w-25">
                <NavLink to="/profile" className="dropdown-item">
                  <i className="fa-regular fa-user"></i> Profile
                </NavLink>
                <NavLink to="/profile" className="dropdown-item">
                  <i className="fa fa-sliders"></i> Settings
                </NavLink>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogOut}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/admin/users">Users</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
            <Menu.Item key="10" icon={<FileOutlined />}>
              <NavLink to={"/admin/film"}>Films</NavLink>
            </Menu.Item>
            <Menu.Item key="11" icon={<FileOutlined />}>
              <NavLink to="/admin/film/addnew">Add New</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink to="/admin/showtime">Showtime</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 20,
            background: colorBgContainer,
          }}
        >
          {renderLogin()}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            <Breadcrumb>
              <NavLink to={"/"}>Home</NavLink>
            </Breadcrumb>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
