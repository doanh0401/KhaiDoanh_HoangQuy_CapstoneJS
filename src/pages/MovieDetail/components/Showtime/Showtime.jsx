import React, { useEffect, useState } from "react";
import { cinemaService } from "../../../../services/cinema";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/date";
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd";
import "./Showtime.scss";
export default function Showtime() {
  const param = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchShowtime();
  }, []);
  const fetchShowtime = async () => {
    const result = await cinemaService.fetchShowtimeApi(param.movieId);
    setData(result.data.content);
  };
  console.log(data);
  const renderTabList = () => {
    return data.heThongRapChieu?.map((htr, idx) => {
      return (
        <TabPane
          tab={
            <div>
              <img src={htr.logo} width={50} height={50} alt={htr.logo} />
            </div>
          }
          key={idx}
        >
          {htr.cumRapChieu?.map((cumRap, idx) => {
            return (
              <div style={{ textAlign: "left" , padding:20}} key={idx}>
                <div className="row">
                  <img className="col-1"
                    style={{ width: 60, height: 60 }}
                    src={cumRap.hinhAnh}
                  />
                  <div className="col-11">
                    <p style={{fontSize:20,lineHeight:1}}>{cumRap.tenCumRap}</p>
                    <p style={{color:"#a6a1a1"}}>{cumRap.diaChi}</p>
                  </div>
                </div>
                <div className="lichChieu">
                  <div className="row">
                    <div className="col-1"></div>
                    {cumRap.lichChieuPhim?.map((lichChieu,idx)=>{
                      return(
                        <div key={lichChieu.maRap} className="col-3" >
                          <NavLink to={`/booking/${lichChieu.maLichChieu}`}>{formatDate(lichChieu.ngayChieuGioChieu)}</NavLink>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };
  return (
    <div>
      <Tabs
        tabPosition={"left"}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: "8px",
          boxShadow:
            "rgba(46, 41, 51, 0.08) 0px 2px 4px, rgba(71, 63, 79, 0.16) 0px 5px 10px",
        }}
      >
        {renderTabList()}
      </Tabs>
    </div>
  );
}
