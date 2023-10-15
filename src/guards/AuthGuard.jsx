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
            message: "Chưa đăng nhập!"
        })
        navigate("/login")
      }else{
        if(userState.userInfo.maLoaiNguoiDung !== "KhachHang"){
            notification.warning({
                message:"Bạn không có quyền đặt vé!"
            });
            navigate("/")
        }
      }
    },[])

  return (
    <>{props.children}</>
  )
}