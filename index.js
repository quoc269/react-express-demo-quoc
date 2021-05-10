const EXPRESS = require('express');
const PATH = require('path')
const { Doc_Danh_sach_Nhan_vien, Doc_Nhan_vien, Ghi_Moi_Nhan_vien, Ghi_Nhan_vien, Xoa_Nhan_vien, Tra_cuu_Nhan_vien } = require('./XuLyNhanVien3L.js');
const XuLy = require('./XuLyNhanVien3L.js');
const axios = require('axios');
const bodyParser = require('body-parser');

//Khai bao su dung ung dung
var UngDung = EXPRESS();

UngDung.use(EXPRESS.urlencoded())
UngDung.use(bodyParser.json());
UngDung.use(bodyParser.urlencoded({
    extended: true
}));

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  UngDung.use(EXPRESS.static('client/build'));
  // Express serve up index.html file if it doesn't recognize route  
  UngDung.get('*', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'client', 'built', 'index.html'));
  });
}

UngDung.get("/nhan-vien", (req,res) =>{
    res.json({dsnv : Doc_Danh_sach_Nhan_vien()})
})

UngDung.get("/nhan-vien/:Ma_so", (req,res) =>{
  var Ma_so = req.params.Ma_so
  res.json({Nhan_vien : Doc_Nhan_vien(Ma_so)})
})

UngDung.post("/them-nhan-vien", (req,res) =>{
  var emp= req.body
  Ghi_Moi_Nhan_vien(emp)
  console.log(emp);
  res.json({dsnv : Doc_Danh_sach_Nhan_vien()})
})
UngDung.post("/cap-nhat-nhan-vien", (req,res) =>{
  var Nhan_vien = req.body  
  Ghi_Nhan_vien(Nhan_vien)  
  console.log(Nhan_vien);  
  res.json({dsnv : Doc_Danh_sach_Nhan_vien()})
})

UngDung.post("/xoa-nhan-vien", (req,res) =>{
  var id = req.body  
  var Ma_so_Nhan_vien = id.Ma_so   
  Xoa_Nhan_vien(Ma_so_Nhan_vien)
  console.log (Ma_so_Nhan_vien);  
  res.json({dsnv : Doc_Danh_sach_Nhan_vien()})
})

UngDung.post("/tim-nhan-vien", (req,res) =>{
  var tk = req.body  
  var Tu_khoa = tk.Tu_khoa   
  console.log(Tu_khoa)
  var Danh_sach_Tra_cuu = Tra_cuu_Nhan_vien(Tu_khoa)
  res.json({dsnv : Danh_sach_Tra_cuu})
})



  
//thiet lap server port va khoi dong server
UngDung.set('port', process.env.PORT || 9000);
UngDung.listen(UngDung.get('port'), ()=>{
console.log(`Server is running at port ${UngDung.get('port')}`)
})