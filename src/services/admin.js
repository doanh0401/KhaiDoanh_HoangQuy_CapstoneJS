import { request } from "../configs/api";

class AdminService {
  themPhimUpLoadHinhApi(formData) {
    return request({
      url: `/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data: formData,
      
    });
  }
  layThongTinPhimApi(id) {
    return request({
      url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
    });
  }
  capNhatPhimUploadApi(formData) {
    return request({
      url: `/QuanLyPhim/CapNhatPhimUpload`,
      method: "POST",
      data: formData,
    });
  }
  xoaPhimApi(id) {
    return request({
      url: `/QuanLyPhim/XoaPhim?MaPhim=${id}`,
      method: "DELETE",
    })
  }
  
}
export const adminService = new AdminService();
