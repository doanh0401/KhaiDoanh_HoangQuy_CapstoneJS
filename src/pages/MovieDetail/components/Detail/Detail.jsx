import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../../../services/movie";
import { formatDate } from "../../../../utils/date";
import { Rate } from "antd";
import "./Detail.scss"
export default function Detail() {
  const param = useParams();
  const [detail,setDetail]=useState({});
  useEffect(()=>{
    fecthMovieDetail();
  }, [])

  const fecthMovieDetail = async () =>{
    const result = await movieService.fecthMovieDetailApi(param.movieId);
    setDetail(result.data.content);
  }
  console.log(detail);
  return (
    <div className="row">
      <div className="col-3">
        <img
          className="w-100"
          src={detail.hinhAnh}
        />
      </div>
      <div className="col-9" style={{textAlign:"left", paddingLeft:"3rem"}}>
        <h4 style={{paddingBottom:20, fontSize:"3rem", fontWeight:600}}>{detail.tenPhim}</h4>
        <p style={{paddingBottom:20, fontSize:24}}>{detail.moTa}</p>
        <p style={{fontSize:"2rem",fontWeight:600}}>Ngày chiếu: {formatDate(detail.ngayKhoiChieu)}</p>
        <p style={{fontSize:"2rem",fontWeight:600, paddingBottom:20}}>Đánh giá: <Rate allowHalf value={detail.danhGia/2} /></p>
        <div>
          <button className="btn btn-success trailer">TRAILER</button>
        </div>
      </div>
    </div>
  );
}
