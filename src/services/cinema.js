import axios from "axios";
import { request } from "../configs/api";
class CinemaService {
  fetchShowtimeApi(movieId) {
    return axios({
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      method: "GET",
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MSIsIkhldEhhblN0cmluZyI6IjIzLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODY0NjQwMDAwMCIsIm5iZiI6MTY4MDM2ODQwMCwiZXhwIjoxNzA4Nzk0MDAwfQ.m054V9MFrBY26j2t-FxqIXGcOVQim2UUk_G-OoewJUY",
      },
    });
  }
  layThongTinHeThongRapApi(){
    return request({
      url:`/QuanLyRap/LayThongTinHeThongRap`,
      method:"GET",
    })
  }
  layThongTimCumRapApi(maHTR){
    return request({
      url:`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`,
      method:"GET",
    })
  }
}
export const cinemaService = new CinemaService();
