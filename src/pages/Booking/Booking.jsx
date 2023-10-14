import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketService } from "../../services/tickect";
import { filter, sumBy } from "lodash";
import { ChairType } from "../../enums/api";
import { NearMe } from "@mui/icons-material";
import { Card } from "antd";
import "./Booking.scss";
import { formatDate } from "../../utils/date";
export default function Booking() {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [chairList, setChairList] = useState([]);

  const negative = useNavigate();
  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const fetchTicketDetail = async () => {
    const result = await ticketService.fetchTicketDetailApi(params.id);

    setMovieDetail(result.data.content.thongTinPhim);
    setChairList(
      result.data.content.danhSachGhe.map((element) => {
        return {
          ...element,
          dangChon: false,
        };
      })
    );
  };
  const handleSelect = (chair) => {
    const data = [...chairList];

    const idx = data.findIndex((element) => element.maGhe === chair.maGhe);

    data[idx].dangChon = !data[idx].dangChon;

    setChairList(data);
  };

  const renderChairList = () => {
    return chairList.map((element, idx) => {
      let className = "btn-dark";

      if (element.loaiGhe === ChairType.Vip) {
        className = "btn-warning";
      }

      if (element.dangChon) {
        className = "btn-primary";
      }

      return (
        <React.Fragment key={element.maGhe}>
          <button
            onClick={() => handleSelect(element)}
            disabled={element.daDat}
            style={{ width: 50, height: 50, padding: 0 }}
            className={`mr-1 mb-1 btn ${className}`}
          >
            {element.tenGhe}
          </button>

          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const renderSeatList = () => {
    const data = chairList.filter((element) => element.dangChon);

    return data.map((element) => {
      return (
        <p key={element.maGhe} className="badge badge-success mr-2 mb-0">
          {element.tenGhe}
        </p>
      );
    });
  };

  const renderTotalPrice = () => {
    const data = filter(chairList, "dangChon");

    const total = sumBy(data, "giaVe");

    return total.toLocaleString();
  };

  const handleBookTicket = async () => {
    if (window.confirm("Bạn có chắc muốn đặt ghế này không?")) {
      const data = filter(chairList, "dangChon");

      const body = {
        maLichChieu: params.id,
        danhSachVe: data.map((element) => {
          return {
            maGhe: element.maGhe,
            giaVe: element.giaVe,
          };
        }),
      };

      const result = await ticketService.bookTicket(body);
      alert("Đặt phim thành công!");
      window.location.reload();
    }
  };
  let cinema = {};
  if (localStorage.getItem("cinema")) {
    cinema = JSON.parse(localStorage.getItem("cinema"));
  }

  return (
    <div className="py-5">
      <div className="row">
        <div className="col-8 mb-4">
          <h2 style={{ marginBottom: 20 }}>Tên rạp: {cinema.tenRap}</h2>
          <h3 style={{ marginBottom: 20 }}>
            Thời lượng: {cinema.thoiLuong} phút
          </h3>
          <div style={{ width: "95%" }} className="mx-auto">
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
              Seats are booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
              Seats not booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
              Seats are being booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
              VIP seats
            </div>
          </div>
        </div>
        <div className="col-8">
          <hr className="screen" />
          <h2 style={{ marginBottom: "3rem" }}>Screen this way</h2>
          <div style={{ width: "95%" }} className="mx-auto">
            {renderChairList()}
          </div>
        </div>
        <div className="col-4">
          <Card
            title={movieDetail.tenPhim}
            bordered={false}
            style={{
              width: "90%",
              textAlign: "left",
              fontSize: 20,
            }}
          >
            <p>Ngày chiếu giờ chiếu: {formatDate(cinema.ngayChieuGioChieu)}</p>
            <p>Tên rạp: {cinema.tenRap}</p>
            <p>Giá vé: Ghế thường: {cinema.giaVe}VND, Ghế vip: 90000VND</p>
            <p>Thời lượng: {cinema.thoiLuong} phút</p>
            <p>Ghế đã chọn: {renderSeatList()}</p>
            <p>Tổng giá: {renderTotalPrice()}</p>

            <button
              style={{ width: "100%" }}
              onClick={handleBookTicket}
              className="btn btn-warning"
            >
              BOOK
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
