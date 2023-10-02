import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../../../services/movie";
import { useSelector } from "react-redux";
import "./Carousel.scss";

export default function Carousel() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    fetchMovieList();
    fetchMovieListPerPage();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi("GP01");
    setMovieList(result.data.content);
    console.log(result.data.content);
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
    return movieList.map((element) => {
      return (
        <div onClick={() => handleBooking(element.maPhim)} className="card movie_card">
          <img
            src={element.hinhAnh}
            className="card-img-top"
            alt="..."
          />
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
    <div className="container mt-5">
      <h2 className="text-center">Phim sắp chiếu</h2>
      <div className="row justify-content-center">
            {renderMovieList()}
      </div>
    </div>
  );
}
