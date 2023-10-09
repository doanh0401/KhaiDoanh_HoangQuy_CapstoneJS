import { notification } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function AuthGuard(props) {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.userReducer);

    useEffect(() => {
        if(!userState.userInfo) {
            notification.warning({
                message: "Chưa đăng nhập không thể vào trang admin!"
            })
            navigate("/login")
          }else{
            if(userState.userInfo.maLoaiNguoiDung !== "QuanTri"){
                notification.warning({
                    message:"Bạn không có quyền truy cập trang admin!"
                });
                navigate("/")
            }
          }
    },[])

  return (
    <>{props.children}</>
  )
}