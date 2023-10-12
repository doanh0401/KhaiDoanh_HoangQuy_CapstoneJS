import React from "react";
import Navbar from "./components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";


export default function Header() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
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
    }
    else {
      return ( <>
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
            <div className="dropdown-menu w-25" style={{zIndex:9999}} >
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
      )
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  }

  return (
    <div className="mtw_banner_top">
      <div className="mtw_banner_top_content">
        <a
          href="https://advserver.cgv.vn/www/delivery/ck.php?oaparams=2__bannerid=71__zoneid=2__cb=19d2e0e33e__oadest=https%3A%2F%2Fwww.cgv.vn%2Fdefault%2Fnewsoffer%2Fcgv-zalo-092023%2F"
          target="_blank"
        >
          <img
            style={{ width: 980, height: 80 }}
            src="./img/zalopay.jpg"
            alt="zalo"
          />
        </a>
      </div>
      <div className="header-language-background">
        <div className="header-container">
          <div className="header-language-right">
            <div className="header-career mn-newsoffer">
              <p>
                <a href="">Tin mới & Ưu đãi</a>
              </p>
            </div>
            <div className="header-career mn-myticket">
              <p>
                <a href="">Vé Của Tôi</a>
              </p>
            </div>
            <div className="header-top-account">
              {renderLogin()}
            </div>
          </div>
        </div>
      </div>
      {/* ----------Start-Navbar--------  */}
      <Navbar />
      {/* ----------End-Navbar--------  */}
    </div>
  );
}
