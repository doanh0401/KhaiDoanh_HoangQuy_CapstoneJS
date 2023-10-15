import { SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_PHIM } from "../types/adminType";

const DEFAULT_STATE= {
    thongTinNguoiDung:{},
    thongTinPhim: {},
    adminInfo: null,
};
const stringify = localStorage.getItem("USER_INFO");

if(stringify) {
    DEFAULT_STATE.adminInfo = JSON.parse(stringify);
}
export const adminReducer = (state = DEFAULT_STATE, action ) => {
    switch(action.type){
        case SET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            break;
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            break;
        }
    }
    return {...state};

}