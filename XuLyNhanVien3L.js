const FS = require('fs');
const PATH = require('path');
//Thư mục dùng chung 
var thuMucDuLieu = PATH.join(__dirname, "Du_lieu")
var thuMucCongTy = thuMucDuLieu + "/Cong_ty"
var thuMucNhanVien = thuMucDuLieu+ "/Nhan_vien"


//XU LY LUU TRU
//--Doc_Danh_sach_Nhan_vien
Doc_Danh_sach_Nhan_vien = ()=>{
    danhSach =[]
    var danhSachTenTapTin = FS.readdirSync(thuMucNhanVien)
    danhSachTenTapTin.forEach(item => {
        var duongDan = thuMucNhanVien+"/"+item;
        var chuoiJSON = FS.readFileSync(duongDan,"utf-8")
        var nhanVien = JSON.parse(chuoiJSON);
        danhSach.push(nhanVien)
    });
    return danhSach
}

// Doc_Cong_ty
Doc_Cong_ty = () => {
    var duongDan = PATH.join(thuMucCongTy, "Cong_ty.json");
    var chuoiJSON = FS.readFileSync(duongDan, "utf-8");  
    var Cong_ty = JSON.parse(chuoiJSON);      
    return Cong_ty
}

// Tim nhan vien 

Doc_Nhan_vien = (maSo) => {
  var dsnv = Doc_Danh_sach_Nhan_vien()
  var Nhan_vien = {}
  dsnv.forEach(nv => {
    if(nv.Ma_so == maSo){
      Nhan_vien  = nv    
    }
  });
  return Nhan_vien
}



//Doc_Khung_HTML
Doc_Khung_HTML= ()=>{
    var chuoiHTML = "";
    var thuMucDuLieu = PATH.join(__dirname, "Du_lieu")
    var thuMucHTML = PATH.join(thuMucDuLieu,"HTML");
    var duongDan = PATH.join(thuMucHTML, "Khung.html");
    chuoiHTML = FS.readFileSync(duongDan, "utf-8");  
    return chuoiHTML;
}

//Ghi_Nhan_vien
Ghi_Nhan_vien =(Nhan_vien) => {
    Nhan_vien_Cap_nhat = {}
    var thuMucDuLieu = PATH.join(__dirname, "Du_lieu")
    var thuMucNhanVien = thuMucDuLieu+"/Nhan_vien";
    var Duong_dan = `${thuMucNhanVien}/${Nhan_vien.Ma_so}.json`
    var Chuoi_JSON = JSON.stringify(Nhan_vien)
    FS.writeFileSync(Duong_dan, Chuoi_JSON)
    Nhan_vien_Cap_nhat = Nhan_vien
    return Nhan_vien_Cap_nhat 
}

//Ghi_moi_Nhan_vien
Ghi_Moi_Nhan_vien =(Nhan_vien) => {
  var dsnv = Doc_Danh_sach_Nhan_vien()
  var thuMucDuLieu =PATH.join(__dirname, "Du_lieu")
  var thuMucNhanVien = thuMucDuLieu+"/Nhan_vien";
  Nhan_vien.Ma_so = `NV_${dsnv.length + 1}`  
  var Duong_dan = `${thuMucNhanVien}/${Nhan_vien.Ma_so}.json`
  var Chuoi_JSON = JSON.stringify(Nhan_vien)
  FS.writeFileSync(Duong_dan, Chuoi_JSON)
  
}
//Xoa nhan vien
Xoa_Nhan_vien = (Ma_so_Nhan_vien) =>{
  var thuMucDuLieu =PATH.join(__dirname, "Du_lieu")
  var thuMucNhanVien = thuMucDuLieu+"/Nhan_vien";
  var Duong_dan = `${thuMucNhanVien}/${Ma_so_Nhan_vien}.json`
  console.log(Duong_dan)
  FS.unlinkSync(Duong_dan)  
}

//tra cuu nhan vien
Tra_cuu_Nhan_vien = (Tu_khoa) =>{
  var Danh_sach_Tra_cuu = Doc_Danh_sach_Nhan_vien()
    var tuKhoa = Tu_khoa.toLowerCase()
    Danh_sach_Tra_cuu = Danh_sach_Tra_cuu.filter(x =>x.Ho_ten.toLowerCase().includes(tuKhoa) || x.Gioi_tinh.toLowerCase().includes(tuKhoa) || x.Don_vi.Ten.includes(tuKhoa)
    )
return Danh_sach_Tra_cuu
}
//Ghi_Hinh_Nhan_vien
Ghi_Hinh_Nhan_vien = (Nhan_vien, Hinh) =>{
  var ThuMucMedia ="./Media"
  var Duong_dan = `${ThuMucMedia}\\${Nhan_vien.Ma_so}.png`
  FS.writeFileSync(Duong_dan, Hinh)
}

// xu ly giao dien dang nhap nhan vien
Tao_Chuoi_HTML_Dang_Nhap_Nhan_Vien = (tenDangNhap ="", matKhau="", thongBaoDangNhap="") =>{
    var Cong_ty = Doc_Cong_ty()    
    var chuoiHTML = `<div class= "container px-3"> <h1 class="text-danger"> ${thongBaoDangNhap} </h1> </div>` 
    chuoiHTML += `<div class= "container px-3"> <h1 class="text-primary">Tên Công ty:  ${Cong_ty.Ten} </h1> </div>`
    chuoiHTML += `<div class= "container px-3">
        <form action="/Nhan_vien/kiem-tra-dang-nhap" method="POST">            
            <div class="form-group">
              <label class="text-primary" for="name">Tên Đăng nhập</label>
              <input type="text" class="form-control" name="txtTenDangNhap" id="name" value="${tenDangNhap}" placeholder="Nhập tên đăng nhập: NV_1, NV_2, ... " >
            </div>
            <div class="form-group">
              <label class="text-primary" for="pass">Mật khẩu</label>
              <input type="password" class="form-control" name="txtMatKhau" value="${matKhau}"  id="pass" placeholder="Nhập mật khẩu:  NV_1, NV_2, ... ">
            </div>
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </form>
      </div> `
    return chuoiHTML
}

// Xu ly giao dien Nhan vien
Tao_Chuoi_HTML_Xem_Nhan_Vien = (Nhan_vien) =>{
    
    var chuoiHTML = `<div class="container-fluid p-2 justify-content-end "> 
    <div>
        <h5 class="text-danger">Đang đăng nhập: ${Nhan_vien.Ten_Dang_nhap} </h5>        
    </div>
    <div class="container-fluid">
        <form action="/Nhan_vien/thoat-dang-nhap" method="POST">               
            <button type="submit" class="btn btn-primary">Thoát Đăng nhập</button>
        </form>
      </div>
    </div> `
    var Chuoi_HTML_Ngoai_ngu = ''
    var Chuoi_Ngoai_Ngu  = ''
    var Danh_sach_Ngoai_ngu_Cap_nhat =[]
    var Danh_sach_Ngoai_ngu_Cap_nhat = Doc_Cong_ty().Danh_sach_Ngoai_ngu  
    Nhan_vien.Danh_sach_Ngoai_ngu.forEach(nn =>{
      Chuoi_Ngoai_Ngu += `<span class="badge badge-primary mx-3"> ${nn.Ten}</span> `
      Danh_sach_Ngoai_ngu_Cap_nhat = Danh_sach_Ngoai_ngu_Cap_nhat.filter(x => x.Ma_so != nn.Ma_so )
    })
   
    Danh_sach_Ngoai_ngu_Cap_nhat.forEach(nnbs => {
      Chuoi_HTML_Ngoai_ngu += `<div class="col">          
    <button type="submit" class="btn btn-warning" name="btnMaNgoaiNgu" value="${nnbs.Ma_so}" >${nnbs.Ten}</button>  
    </div>`
    })
    chuoiHTML += `  <!--button chuc data-toggle cua nhan vien -->
    <div class="container py-3">
      <div class=" row py-3">
          <div class="col-3">
             <button class=" btn btn-danger" type="button" data-toggle="collapse" data-target="#CapNhatDienThoai" aria-expanded="false" aria-controls="collapseExample">
                 Cập nhật Điện thoại
               </button>
          </div>  
          <div class="col-3">
             <button class=" btn btn-danger" type="button" data-toggle="collapse" data-target="#CapNhatDiaChi" aria-expanded="false" aria-controls="collapseExample">
                 Cập nhật Địa chỉ
               </button>
          </div>  
          <div class="col-3">
             <button class=" btn btn-danger" type="button" data-toggle="collapse" data-target="#CapNhatHinh" aria-expanded="false" aria-controls="collapseExample">
                 Cập nhật Hình
               </button>
          </div>  
          <div class="col-3">
             <button class=" btn btn-danger" type="button" data-toggle="collapse" data-target="#BoSungNgoaiNgu" aria-expanded="false" aria-controls="collapseExample">
                 Bổ sung Ngoại ngữ
               </button>
          </div>    
         </div>
    </div>
  <!--/button chuc data-toggle cua nhan vien -->
    <!--form cap nhat dien thoai-->
    <div class="container collapse bg-info" id="CapNhatDienThoai">
    <h3 class="text-danger text-center">CẬP NHẬT ĐIỆN THOẠI CỦA NHÂN VIÊN</h3>
      <div class="container text-center py-2">
          <form action="/Nhan_vien/chuc-nang-cap-nhat" method="post">
              <input type="hidden" name="Ma_Xu_ly" value="Cap_nhat_Dien_thoai" /> 
              <input class="form-control" type="text" name = "txtDienThoai" value="${Nhan_vien.Dien_thoai}" /> <br> <br>
              <input type="submit" class="btn btn-primary" value="Cập nhật" />
          </form>
      </div>
    </div>
     <!--/form cap nhat dien thoai-->
    <!--form cap nhat dia chi-->
    <div class="container collapse bg-info" id="CapNhatDiaChi">
    <h3 class="text-danger text-center">CẬP NHẬT ĐỊA CHỈ CỦA NHÂN VIÊN</h3>
      <div class="container text-center py-2">
          <form action="/Nhan_vien/chuc-nang-cap-nhat" method="post">
              <input type="hidden" name="Ma_Xu_ly" value="Cap_nhat_Dia_chi" /> 
              <textarea name="txtDiaChi" id="" cols="100" rows="6" > ${Nhan_vien.Dia_chi}</textarea>   <br> <br>
              <div class="text-center">
                  <input type="submit" class="btn btn-primary mx-auto" value="Cập nhật"></input>
              </div>
            
          </form>
      </div>
    </div>
     <!--/form cap nhat dia chi-->  
     <!--form cap nhat Hinh-->
     <div class="container collapse bg-info " id="CapNhatHinh">
    
      <div class="container py-2">  
          <h3 class="text-danger text-center">CẬP NHẬT HÌNH NHÂN VIÊN</h3>
          <form method="POST" action="/Nhan_vien/chuc-nang-cap-nhat" enctype="multipart/form-data">
            <input type="hidden" name="Ma_Xu_ly" value="Cap_nhat_Hinh" />
            <p><input type="file" name="Hinh_Nhan_vien"></p>
            <p><input type="submit" value="Cập nhật" class="btn btn-primary text-center"></p>
          </form>
      </div>
      </div>
     <!--/form cap nhat Hinh-->  
     <!--form cap nhat Ngoai ngu-->
     
    <div class="container collapse bg-info" id="BoSungNgoaiNgu">
      <div class="container py-3">
        <h3 class="text-danger text-center ">BỔ SUNG NGOẠI NGỮ NHÂN VIÊN</h3>
          <form action="/Nhan_vien/chuc-nang-cap-nhat" method="post">
          <input type="hidden" name="Ma_Xu_ly" value="Bo_sung_ngoai_ngu" />
             <div class="row">
                ${Chuoi_HTML_Ngoai_ngu}
                 
             </div>             

          </form>
      </div>
    </div>
     <!--/form cap nhat ngoai ngu-->   `    

    chuoiHTML += ` <div class="container">
    <div class="row">
        <div class="col-4">
         <img src="/Media/${Nhan_vien.Ma_so}.png" alt="${Nhan_vien.Ma_so}.png" class="img-thumbnail" style = "width:200px; height:250px">
        </div>
        <div class="col-8">
         <p>Họ tên: ${Nhan_vien.Ho_ten} - Giới tính: ${Nhan_vien.Gioi_tinh} </p>
         <p>CMND: ${Nhan_vien.CMND} - Ngày sinh: ${Nhan_vien.Ngay_sinh} - Mức lương: ${Nhan_vien.Muc_luong.toLocaleString('en-US', {style : 'currency', currency : 'VND'})} </p>
         <p>Điện thoại: ${Nhan_vien.Dien_thoai} - Email: ${Nhan_vien.Mail}     </p>
         <p>Địa chỉ:${Nhan_vien.Dia_chi} - Đơn vị: ${Nhan_vien.Don_vi.Ten} </p> 
         <p>Khả năng ngoại ngữ: ${Chuoi_Ngoai_Ngu}</p>               
        </div>
    </div>
</div> `
    return chuoiHTML
}



 // export module
 module.exports ={
     Tao_Chuoi_HTML_Dang_Nhap_Nhan_Vien: Tao_Chuoi_HTML_Dang_Nhap_Nhan_Vien,
     Doc_Danh_sach_Nhan_vien: Doc_Danh_sach_Nhan_vien,     
     Tao_Chuoi_HTML_Xem_Nhan_Vien: Tao_Chuoi_HTML_Xem_Nhan_Vien,
     Doc_Khung_HTML: Doc_Khung_HTML,
     Doc_Cong_ty: Doc_Cong_ty,
     Ghi_Nhan_vien: Ghi_Nhan_vien,
     Ghi_Hinh_Nhan_vien: Ghi_Hinh_Nhan_vien,
     Doc_Nhan_vien: Doc_Nhan_vien,
     Ghi_Moi_Nhan_vien: Ghi_Moi_Nhan_vien,
     Xoa_Nhan_vien: Xoa_Nhan_vien,
     Tra_cuu_Nhan_vien: Tra_cuu_Nhan_vien     
 }