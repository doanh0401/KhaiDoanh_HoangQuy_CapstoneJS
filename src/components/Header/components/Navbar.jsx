import React from "react";
import "./navbar.scss"
export default function Navbar() {
  return (
    <nav className="page-header navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="page-header-container container">
        <a className="navbar-brand" href="#">
          <img src="././img/cgvlogo.png" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropMovieLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Phim
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropMovieLink">
              <a className="dropdown-item" href="#">Phim Đang Chiếu</a>
              <a className="dropdown-item" href="#">Phim Sắp Chiếu</a>
          </div>
      </li>
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Rạp CGV
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Tất Cả Các Rạp</a>
              <a className="dropdown-item" href="#">Rạp Đặc Biệt</a>
              <a className="dropdown-item" href="#">Rạp 3D</a>
          </div>
      </li>
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Thành viên
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Tài khoản CGV</a>
              <a className="dropdown-item" href="#">Quyền lợi</a>
          </div>
      </li>
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Cultureplex
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Quầy Online</a>
              <a className="dropdown-item" href="#">Thuê Rạp & Vé Nhóm</a>
              <a className="dropdown-item" href="#">e-CGV</a>
              <a className="dropdown-item" href="#">CGV eGift</a>
              <a className="dropdown-item" href="#">CGV Rules</a>
          </div>
      </li>
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tuyển dụng
              <img className='hot-job' src="././img/hot-jobs.png" alt="hot-job" />
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Tuyển dụng</a>
              <a className="dropdown-item" href="#">Khối Văn Phòng</a>
              <a className="dropdown-item" href="#">Khối Cụm Rạp</a>
          </div>
      </li>
  </ul>
        </div>
        <div className='header-search'>
                        <div className='header-search-left'>
                            <p className='kenhcine'>
                                <img src="././img/kenhcine.gif" alt="kên cine" />
                            </p>
                        </div>
                        <div className='header-search-right'>
                            <p>
                                <a href="">
                                    <img src="././img/mua-ve_ngay.png" alt="mua-ve" />
                                </a>
                            </p>
                        </div>
                    </div>
      </div>
    </nav>
  );
}
