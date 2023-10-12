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
}

export const userService = new UserService();