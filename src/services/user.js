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
}

export const userService = new UserService();