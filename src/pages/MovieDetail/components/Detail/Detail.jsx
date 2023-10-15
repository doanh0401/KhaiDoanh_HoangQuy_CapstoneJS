import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../../../services/movie";
import { formatDate } from "../../../../utils/date";
import { Modal, Rate } from "antd";
import "./Detail.scss"

export default function Detail() {
  const param = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [iframeKey, setIframeKey] = useState(1);
  const [detail,setDetail]=useState({});
  useEffect(()=>{
    fecthMovieDetail();
  }, [])

  const fecthMovieDetail = async () =>{
    const result = await movieService.fecthMovieDetailApi(param.movieId);
    setDetail(result.data.content);
  }

  const showModal = (videoUrl) => {
    console.log(videoUrl);
    const videoUrlWithParams = `${videoUrl}`;
    setVideoUrl(videoUrlWithParams);
    setIsModalVisible(true);
    setIframeKey(prevKey => prevKey + 1);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setVideoUrl("");
  };

  return (
    <div>
    <div className="row">
      <div className="col-3 col-md-6 col-sm-6">
        <img
          className="w-100"
          src={detail.hinhAnh}
        />
      </div>
      <div className="col-9 col-md-6 col-sm-6 movieDetail" style={{textAlign:"left", paddingLeft:"3rem"}}>
        <h4>{detail.tenPhim}</h4>
        <p>{detail.moTa}</p>
        <p><span className="highlight">Ngày chiếu:</span> {formatDate(detail.ngayKhoiChieu)}</p>
        <p className="highlight">Đánh giá: <Rate allowHalf value={detail.danhGia/2} /></p>
        <div>
          <button onClick={() => showModal(detail.trailer)} className="btn btn-success trailer">TRAILER</button>
        </div>
      </div>
    </div>
    <Modal title="TRAILER"
        open={isModalVisible}
        onCancel={() => handleModalClose()}
        width={800}
        footer={null}>
    <iframe
          key={iframeKey}
          title="YouTube Video"
          width="100%"
          height="400"
          src={videoUrl}
          allowFullScreen
        ></iframe>
    </Modal>
    </div>
  );
}
