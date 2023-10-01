import React, { useEffect, useState } from "react";
import { movieService } from "../../../../services/movie";
import "./Banner.scss"

export default function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetchBanner();
  },[]);

  const fetchBanner = async () => {
    const result = await movieService.fetchBannerApi();
    setBanner(result.data.content);
  };

  const renderBanner = () => {
    return banner.map((element,index) => {
      return (
        <div className={`carousel-item ${index === 0 && "active"}`}>
        <img src={element.hinhAnh} className="d-block w-100 img-fluid imgbanner" alt="..." />
      </div>
      );
    });
  };

  return (
    <div className="bd-example">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleCaptions" data-slide-to={1} />
          <li data-target="#carouselExampleCaptions" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          {renderBanner()}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
