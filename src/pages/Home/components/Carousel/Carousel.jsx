import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../../../services/movie";
import { useSelector } from "react-redux";
import "./Carousel.scss";
import { Pagination } from "antd";

export default function Carousel() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [isNowPlaying, setIsNowPlaying] = useState();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    fetchMovieList();
    fetchMovieListPerPage();
  }, []);

  const handleNowPlaying = (key) => {
    setIsNowPlaying(key);
  }

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi("GP01");
    setMovieList(result.data.content);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handleBooking = (movieId) => {
    if (userState.userInfo) {
      navigate(`/movie-detail/${movieId}`);
    } else {
      navigate("/login");
    }
  };

  const handleChange = (page) => {
    setCurrentPage(page);
    fetchMovieListPerPage();
  };

  const [movieListPerPage, setMovieListPerPage] = useState([]);

  const fetchMovieListPerPage = async () => {
    const result = await movieService.fecthPageMovieListApi(currentPage);
    setMovieListPerPage(result.data.content.items);
  };

  const renderMovieList = () => {
    const renderData = movieListPerPage.filter((element) => {
      if (isNowPlaying) {
        return element.dangChieu === true;
      } else if (isNowPlaying === false) {
        return element.dangChieu === false;
      } else {
        return element;
      }
    });

    return renderData .map((element) => {
      return (
        <div
          key={element.maPhim}
          onClick={() => handleBooking(element.maPhim)}
          className="card movie_card"
        >
          <img src={element.hinhAnh} className="card-img-top" alt="..." />
          <div className="card-body">
            <i
              className="fas fa-play play_button"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Play Trailer"
            ></i>
            <h5 className="card-title">{element.tenPhim}</h5>
            {/* <p>{element.moTa.substring(0, 20)} {element.moTa >= 20 && '...'}</p> */}
            <span className="movie_info">2019</span>
            <span className="movie_info float-right">
              <i className="fas fa-star" /> 4 / 5
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-center">Phim sắp chiếu</h2>
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button
              onClick={() => handleNowPlaying()}
              className="px-3 btn btn-secondary btn-sm mr-1 text-capitalize active"
            >
              Tất cả
            </button>
            <button
              onClick={() => handleNowPlaying(true)}
              className="btn btn-secondary mr-1 text-capitalize"
            >
              Đang chiếu
            </button>
            <button
              onClick={() => handleNowPlaying(false)}
              className="btn btn-secondary btn-sm text-capitalize"
            >
              Sắp chiếu
            </button>
          </div>
      <div className="py-5">
        <div className="row justify-content-center">{renderMovieList()}</div>
        <div className="ant-pagination">
        <Pagination
          onChange={handleChange}
          total={movieList.length}
          defaultPageSize={8}
          defaultCurrent={currentPage}
          current={currentPage}
        />
        </div>
      </div>
    </div>
  );
}
