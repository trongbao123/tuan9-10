
function getEle(id) {
    return document.getElementById(id);
}

//  hàm lưu local storange
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

//  hàm lấy local storange
function getLocalStrorage() {
    var valueStorange = JSON.parse(localStorage.getItem("DSNV"));
    valueStorange.map(function(nv, index){
        dsnv.themNV(nv)
    })
}


const dsnv = new DanhSachNhanVien();
const validation = new Validation();


function ThemNhanVien() {
    var taikhoan = document.getElementById('tknv').value;
    var ten = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matkhau = document.getElementById('password').value;
    var Ngay = Date(document.getElementById('datepicker').value);
    var luong = Number(document.getElementById('luongCB').value);
    var chucvu = document.getElementById('chucvu').value;
    var gioLam = Number(document.getElementById('gioLam').value);

    // kết quả kt dữ liệu
    var isValid = true;


    isValid &= validation.kiemTraRong(taikhoan, "tbTKNV", "tài khoản nhân viên không được để trống!") && validation.kiemTraTrung(taikhoan, "tbTKNV", "tài khoản không được trùng", dsnv.mangNV);


    // isValid (ten) = isValid (ma) & kiemTraRong(ten)
    isValid &= validation.kiemTraRong(ten, "tbTen", "Tên sinh viên không được để trống") && validation.kiemTraTen(ten, "tbTen", "Tên nhân viên phải là chữ");

    //?kiem tra email
    isValid &= validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");

    //?kiem tra pass
    isValid &= validation.kiemTraPass(matkhau, "tbMatKhau", "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số,1 đặc biêt, và từ 6-10 chữ");

   

    //? kiem tra lương
    isValid &= validation.kiemTraluong(luong,"tbLuongCB","lương chưa được nhập!");

    //? kiem tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "chọn chức vụ phù hợp");

    //? kiem tra giờ làm
    isValid &= validation.kiemTraGioLam(gioLam, "tbGiolam", "giờ làm phải là số");
   

    if (isValid) {
        var NV = new NhanVien(taikhoan, ten, email, matkhau,Date(Ngay), Number(luong), chucvu, Number(gioLam));
        NV.tongluong();
        console.log(NV);
        console.table(NV);


        dsnv.themNV(NV);
        // lưu trữ local storange
        setLocalStorage();

        // lấy dữ liệu Local storange
        getLocalStrorage();

        hienThiTable();
    }


}

function hienThiTable(mangNV) {
    var content = "";
    mangNV.map(function (nv, index) {

        var trELE = `<tr>
            <td>${nv.taikhoan}</td>
            <td>${nv.ten}</td>
            <td>${nv.email}</td>
            <td>${nv.Ngay}</td>
            <td>${nv.chucvu}</td>
            <td>${nv.tongluong}</td>
            <td>${nv.xeploai}</td>

            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taikhoan}')">xóa</button>
                <button class="btn btn-info" onclick="hienThiChiTiet('${nv.taikhoan}')">xem</button>
            </td>
        </tr>`

        content += trELE;
    });

    getEle("tableDanhSach").innerHTML = content;
}


function xoaNhanVien(taikhoan) {
    console.log(taikhoan);
    dsnv.xoaNV(taikhoan);
    setLocalStorage();

    // lấy dữ liệu Local storange
    getLocalStrorage();
    hienThiTable();
}

function hienThiChiTiet(tk) {
    var viTri = dsnv.timViTri(tk);
    console.log(viTri);
    console.log(dsnv.mangNV[viTri]);
    if (viTri > -1) {
        getEle('tknv').value = dsnv.mangNV[viTri].taikhoan;
        getEle('tknv').disable = true;
        getEle('name').value = dsnv.mangNV[viTri].ten;
        getEle('email').value = dsnv.mangNV[viTri].email;
        getEle('password').value = dsnv.mangNV[viTri].matkhau;
        getEle('datepicker').value = dsnv.mangNV[viTri].Ngay;
        getEle('luongCB').value = dsnv.mangNV[viTri].luong;
        getEle('chucvu').value = dsnv.mangNV[viTri].chucvu;
        getEle('gioLam').value = dsnv.mangNV[viTri].gioLam;
    }
}

function CapNhatNhanVien() {
    var taikhoan = document.getElementById('tknv').value;
    var ten = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matkhau = document.getElementById('password').value;
    var Ngay = document.getElementById('datepicker').value;
    var luong = Number(document.getElementById('luongCB').value);
    var chucvu = document.getElementById('chucvu').value;
    var gioLam = Number(document.getElementById('gioLam').value);

    var nv = new NhanVien(taikhoan, ten, email, matkhau, Ngay, luong, chucvu, gioLam);
    nv.tongluong();

    dsnv.CapNhat(nv);

    setLocalStorage();
    getLocalStrorage();

    hienThiTable();
}

getEle("btnTimNV").onclick = function(){
    var ten = getEle("searchName").value;
    var mangTK = [];

    mangTK = dsnv.timKiemTen(ten);
    hienThiTable(mangTK);
}

window.addEventListener("load", function(){
    getLocalStrorage();
    hienThiTable(dsnv.mangNV);
})