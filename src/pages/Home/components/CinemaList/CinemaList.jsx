import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cinemaService } from "../../../../services/cinema";
import "./CinemaList.scss";
import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import TabPanel from "./components/TabPanel";
import { formatDateHome } from "../../../../utils/date";

export default function () {
  const navigate = useNavigate();
  const [cinema, setCinema] = useState([]);
  const [cinemaBrand, setCinemaBrand] = useState([]);
  const [cinemaMovie, setCinemaMovie] = useState([]);

  useEffect(() => {
    fetchCinema();
  }, []);

  const fetchCinema = async () => {
    const result = await cinemaService.fetchCinemaApi();
    setCinema(result.data.content);
  };

  const renderCinemaBrand = () => {
    return cinema.map((element) => {
      return (
        <Tab
          key={element.maHeThongRap}
          value={element.maHeThongRap}
          className="box"
          label={<Avatar src={element.logo} className="logo" />}
        />
      );
    });
  };
  const [value, setValue] = useState("BHDStar");

  const handleChange = (_, newValue) => {
    setValue(newValue);
    if(newValue = "BHDStar") {
      handleChange1(_,"bhd-star-cineplex-pham-hung");
    }
    if(newValue = "CGV") {
      handleChange1(_,"cgv-aeon-tan-phu")
    }
    if(newValue = "CineStar") {
      handleChange1(_,"cns-hai-ba-trung");
    }
    if(newValue = "LotteCinima") {
      handleChange1(_,"lotte-cong-hoa");
    }
    if(newValue = "MegaGS") {
      handleChange1(_,"megags-cao-thang");
    }
    if(newValue = "Galaxy") {
      handleChange1(_,"glx-huynh-tan-phat");
    }
  };

  const renderCinema = (data) => {
    return data.map((element) => {
      return (
        <Tab
          key={element.maCumRap}
          value={element.maCumRap}
          className="secondcolumnitem"
          label={
            <span className="MuiTab-wrapper item">
              <div>
                <Typography variant="h4">{element.tenCumRap}</Typography>
                <Typography variant="h6">{element.diaChi}</Typography>
                <a href="/">[Chi tiet]</a>
              </div>
            </span>
          }
        ></Tab>
      );
    });
  };

  const [cinemaSite, setCinemaSite] = useState("bhd-star-cineplex-pham-hung");

  const handleChange1 = (_, newValue) => {
    setCinemaSite(newValue);
  };

  const renderColumn2 = () => {
    return cinema.map((element) => {
      return (
        <>
        <TabPanel
          key={element.maHeThongRap}
          value={value}
          index={element.maHeThongRap}
          className="column2"
        >
          <Tabs
            value={cinemaSite}
            onChange={handleChange1}
            TabIndicatorProps={{
              className: "indicatorColor indicatorPosition test",
            }}
            orientation="vertical"
          >
            {renderCinema(element.lstCumRap)}
          </Tabs>
        </TabPanel>
            {renderColumn3(element.lstCumRap)}
        </>
      );
    });
  };

  const renderColumn3Item = (data) => {
    return data.map((element,idx) => {
      return (
        <div key={idx} className="itemContainer">
          <img src={element.hinhAnh} alt={element.tenPhim} />
          <div className="time">
            <Typography variant="h2">
              <span className="C18">C18</span>{element.tenPhim}
            </Typography>
            <div className="flexContainer">
              {renderLichChieu(element.lstLichChieuTheoPhim)}
            </div>
          </div>
        </div>
      );
    });
  };
  
  const renderLichChieu = (data) => {
    return data.map((element) => {
      const dateTime = formatDateHome(element.ngayChieuGioChieu); 
      const [date, time] = dateTime.split(',').map(part => part.trim());
      return (
        <a key={element.maLichChieu} onClick={() => navigate(`/booking/${element.maLichChieu}`)}>
          <div className="flexContainer">
            <Typography variant="p" className="date MuiTypography-body1">{date}</Typography>
            <Typography variant="p" className="MuiTypography-body1">&nbsp;~&nbsp;</Typography>
            <Typography variant="h3" className="timeText">{time}</Typography>
          </div>
        </a>
      )
    })
  }

  const renderColumn3 = (data) => {  
    return data.map((element) => {
      return (
        <TabPanel className="column3" key={element.maCumRap} value={cinemaSite} index={element.maCumRap}>
          {renderColumn3Item(element.danhSachPhim)}
        </TabPanel>
      );
    })
  };
  return (
    <Container className="cinemaContainer" maxWidth="md">
        <Tabs
          onChange={handleChange}
          value={value}
          TabIndicatorProps={{ className: "indicatorColor indicatorPosition" }}
          className="column1"
          orientation="vertical"
        >
          {renderCinemaBrand()}
        </Tabs>
        {renderColumn2()}
    </Container>
  );
}
