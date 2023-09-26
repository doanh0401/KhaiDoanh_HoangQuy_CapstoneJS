import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import { movieService } from "../../services/movie";
import { useNavigate } from "react-router-dom";
export default function MovieList() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);
  const navigate = useNavigate();

  const fetchMovieList = async () => {
    const result = await movieService.fecthMovieListApi();
    setMovieList(result.data.content);
    console.log(result.data.content);
  };

  const renderMovieList = () => {
    return movieList.map((element) => {
      return (
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card mb-4">
            <img
              className="card-img-top card-img"
              src={element.hinhAnh}
              alt="..."
            />
            <div style={{ background: "#fdfcf0" }} className="card-body">
              <h2 style={{ fontSize: 20 }} className="card-title text-center">
                {element.tenPhim}
              </h2>
              <p></p>
              <button className="btn btn-success ">
                <i class="fa-regular fa-thumbs-up"></i> Like: {element.danhGia}
              </button>
              <button onClick={()=>navigate(`/movie-detail/${element.maPhim}`)} className="btn btn-danger ml-lg-2">Đặt vé</button>
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
          <div className="row">
            {renderMovieList()}
          </div>
        </div>
      </div>
    </div>
  );
}
