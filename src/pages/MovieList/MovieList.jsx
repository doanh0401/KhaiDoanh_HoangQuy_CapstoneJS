import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import { movieService } from "../../services/movie";
import { useNavigate } from "react-router-dom";
export default function MovieList() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi();
    setMovieList(result.data.content);
    console.log(result.data.content);
  };

  const handleBooking = (movieId) => {
    navigate(`/movie-detail/${movieId}`)
  };

  const renderMovieList = () => {
    return movieList.map((element) => {
      return (
        <div className="col-12 col-md-6 col-lg-3">
          <div className="movie-item">
          <div className="movie-pic">
            <img 
              src={element.hinhAnh}
              alt="..."
            />
          </div>
          <div className="movie-txt">
            <h3>{element.tenPhim}</h3>
          </div>
          <div className="movie-over">
              <p>{element.moTa}</p>
              <span className="atc" style={{display: "block"}}>...</span>
            <div className="button-group">
              <button onClick={() => navigate(`/movie-detail/${element.maPhim}`)}>Chi Tiết</button>
              <button onClick={() => handleBooking(element.maPhim)}>Đặt vé</button>
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
          <div className="row" style={{margin: "none"}}>
            {renderMovieList()}
          </div>
        </div>
      </div>
    </div>
  );
}
