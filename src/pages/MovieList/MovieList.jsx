import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import { movieService } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
export default function MovieList() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
    fetchMovieListPerPage();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi("GP06");
    setMovieList(result.data.content);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handleBooking = (movieId) => {
    navigate(`/movie-detail/${movieId}`);
    navigate(`/movie-detail/${movieId}`);
  };

  const handleChange = (page) => {
    setCurrentPage(page);
    console.log(page);
    fetchMovieListPerPage();
  }

  const [movieListPerPage,setMovieListPerPage] = useState([])

  const fetchMovieListPerPage = async () => { 
    const result = await movieService.fecthPageMovieListApi(currentPage);
    setMovieListPerPage(result.data.content.items);
  }


  const renderMovieList = () => {
    return movieListPerPage.map((element) => {
      return (
        <div key={element.maPhim} className="col-12 col-md-6 col-lg-3">
          <div className="movie-item">
            <div className="movie-pic">
              <img src={element.hinhAnh} alt="..." />
            </div>
            <div className="movie-txt">
              <h3>{element.tenPhim}</h3>
            </div>
            <div className="movie-over">
              <p>{element.moTa}</p>
              <span className="atc" style={{ display: "block" }}>
                ...
              </span>
              <div className="button-group">
                <button
                  onClick={() => navigate(`/movie-detail/${element.maPhim}`)}
                >
                  Chi Tiết
                </button>
                <button onClick={() => handleBooking(element.maPhim)}>
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="main">
      <div className="title-movie">
        <div className="page-title category-title">
          <h1>Phim Đang Chiếu</h1>
        </div>
        <div className="py-5">
          <div className="row" style={{ margin: "none" }}>
            {renderMovieList()}
          </div>
          <Pagination onChange={handleChange}
            total={movieList.length}
            defaultPageSize={10}
            defaultCurrent={1}
          />
        </div>
      </div>
    </div>
  );
}
