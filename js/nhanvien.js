function NhanVien(taikhoan, ten, email, matkhau, ngay, luong, chucvu, gioLam) {
    this.taikhoan = taikhoan;
    this.ten = ten;
    this.email = email;
    this.matKhau = matkhau;
    this.Ngay = ngay;
    this.luong = luong;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
    this.xeploai = "";
    this.tongluong = 0;
   
 


    // method
    this.tongluong = function () {
        switch (chucvu) {
            case "sếp":
                this.tongluong = this.luong * 3;
                break;
            case "trưởng phòng":
                this.tongluong = this.luong * 2;
                break;
            case "nhân viên":
                this.tongluong = this.luong *1;
                break;
            default:
                this.tongluong = "chức vụ chưa được nhập";
                break;
        }
    }


    function loai(){
        if (gioLam>=192) {
            return "nhân viên xuất sắc";
        }
        if (gioLam>=176) {
            return "nhân viên giỏi";
        }
        if (gioLam>=160) {
            return "nhân viên xuất sắc";
        }
        if (gioLam<160) {
            return "nhân viên trung bình";
        }
    }

   

    this.xeploai = loai();


}