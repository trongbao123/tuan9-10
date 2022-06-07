function DanhSachNhanVien() {
    this.mangNV = [];

    // Method
    this.themNV = function (nv) {
        this.mangNV.push(nv);
    }


    this.timViTri = function (tk) {
        var viTri = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taikhoan === tk) {
                // nếu tìm thấy 
                viTri = index;
            }
        });
        return viTri;
    }
    
    this.xoaNV = function(taikhoan){
        var viTriXoa = this.timViTri(taikhoan);
        console.log("id func", taikhoan)
        if(viTriXoa > -1){
             // tìm thấy
             this.mangNV.splice(viTriXoa,1);
        }
     }

    this.CapNhat = function (nv) {
        var viTriCapNhat = this.timViTri(nv.taikhoan);
        if (viTriCapNhat > -1) {
            this.mangNV[viTriCapNhat] = nv ;
        }
    }
    
    DanhSachNhanVien.prototype.timKiemTen = function(ten){
        var mangTK = [];
        var tenThuong = ten.toLowerCase();
        this.mangNV.map(function(nv){
            var tenNVThuong = nv.ten.toLowerCase();
            if(tenNVThuong.indexOf(tenThuong) > -1){
                mangTK.push(nv);
            }
        })
        return mangTK;
    
    }
}


