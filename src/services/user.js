import { request } from "../configs/api";

class UserService {
    loginUser(data) {
        return request({
            url: `/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            data,
        })
    }
    signUpUser(data) {
        return request({
            url: `/QuanLyNguoiDung/DangKy`,
            method: "POST",
            data,
        })
    }
    fetchUserInfoApi(data) {
        return request({
            url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method: "POST",
            data,
        })
    }
    updateUserApi(data) {
        return request({
            url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method: "PUT",
            data,
        })
    }
    fetchUserListApi(id, hoTen=""){
        if (hoTen.trim() != "") {
            return request({
                url:`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${id}&tuKhoa=${hoTen}`,
                method:"GET"
            })
        }
        return request({
            url:`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${id}`,
            method:"GET"
        })
    }
    fetchAdduserApi(data){
        return request({
            url:`QuanLyNguoiDung/ThemNguoiDung`,
            method:"POST",
            data
        })
    }
    maLoaiNguoiDungApi(){
        return request({
            url:`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
            method:"GET",
        })
    }
    fecthEditUserAdminApi(data) {
        return request({
          url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
          method: "POST",
          data,
        });
    }
}

export const userService = new UserService();