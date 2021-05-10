import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import DateTime from 'react-datetime';
import moment from 'moment';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            Tu_khoa:"",
            date: "",           
            Ho_ten: "", 
            Ma_so:"",          
            CMND: "",
            Gioi_tinh: "",
            Dien_thoai: "",
            Dia_chi: "",
            Mail: "",
            Ten_Dang_nhap: "",
            Mat_khau: "",
            Muc_luong: 0,
            Ngay_sinh: "",           
            Don_vi: {
                Ten: "",
                Ma_so: "",
                Chi_nhanh: {
                    Ten: "",
                    Ma_so: ""
                }
            },
            Ngoai_ngu:{Ten: "", Ma_so:""},
            Danh_sach_Ngoai_ngu: [ ]
        }
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
       
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data.Nhan_vien;
                this.setState({
                    Ho_ten: employee.Ho_ten,
                    Ma_so: employee.Ma_so,
                    CMND: employee.CMND,
                    Gioi_tinh: employee.Gioi_tinh,
                    Dien_thoai: employee.Dien_thoai,
                    Dia_chi: employee.Dia_chi,
                    Mail: employee.Mail,
                    Ten_Dang_nhap: employee.Ten_Dang_nhap,
                    Mat_khau: employee.Mat_khau,
                    Muc_luong: employee.Muc_luong,
                    date: moment(employee.Ngay_sinh),
                    Don_vi:{ Ten: employee.Don_vi.Ten, Ma_so: employee.Don_vi.Ma_so, Chi_nhanh:{Ten: employee.Don_vi.Chi_nhanh.Ten, Ma_so:employee.Don_vi.Chi_nhanh.Ma_so} },
                    Danh_sach_Ngoai_ngu: employee.Danh_sach_Ngoai_ngu
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let Ngoai_ngu = {Ten: this.state.Ngoai_ngu.Ten, Ma_so: this.state.Ngoai_ngu.Ma_so}      
        const Danh_sach_Ngoai_ngu_moi= [...this.state.Danh_sach_Ngoai_ngu, Ngoai_ngu]
          
        let employee = {
            firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,
            Ho_ten: this.state.Ho_ten,           
            CMND: this.state.CMND,
            Gioi_tinh: this.state.Gioi_tinh,
            Dien_thoai: this.state.Dien_thoai,
            Dia_chi: this.state.Dia_chi,
            Mail: this.state.Mail,
            Ten_Dang_nhap: this.state.Ten_Dang_nhap,
            Mat_khau: this.state.Mat_khau,
            Muc_luong: this.state.Muc_luong,
            Ngay_sinh: this.state.date,
            Don_vi: {
                Ten: this.state.Don_vi.Ten,
                Ma_so: this.state.Don_vi.Ma_so,
                Chi_nhanh: {
                    Ten: this.state.Don_vi.Chi_nhanh.Ten,
                    Ma_so: this.state.Don_vi.Chi_nhanh.Ma_so
                }
            },
            Danh_sach_Ngoai_ngu: Danh_sach_Ngoai_ngu_moi
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){  
            
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            let Update_employee = {
                Ho_ten: this.state.Ho_ten,  
                Ma_so: this.state.Ma_so,         
                CMND: this.state.CMND,
                Gioi_tinh: this.state.Gioi_tinh,
                Dien_thoai: this.state.Dien_thoai,
                Dia_chi: this.state.Dia_chi,
                Mail: this.state.Mail,
                Ten_Dang_nhap: this.state.Ten_Dang_nhap,
                Mat_khau: this.state.Mat_khau,
                Muc_luong: this.state.Muc_luong,
                Ngay_sinh: this.state.date,
                Don_vi: {
                    Ten: this.state.Don_vi.Ten,
                    Ma_so: this.state.Don_vi.Ma_so,
                    Chi_nhanh: {
                        Ten: this.state.Don_vi.Chi_nhanh.Ten,
                        Ma_so: this.state.Don_vi.Chi_nhanh.Ma_so
                    }
                },
                Danh_sach_Ngoai_ngu: this.state.Danh_sach_Ngoai_ngu
            };
            EmployeeService.updateEmployee(Update_employee).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    
    // Nhan vien envet handle
    changeHoTenHandler= (event) => {
        this.setState({Ho_ten: event.target.value});
    }
    changeCMNDHandler= (event) => {
        this.setState({CMND: event.target.value});
    }
    changeGioiTinhHandler= (event) => {
        this.setState({Gioi_tinh: event.target.value});
    }
    changeDienThoaiHandler= (event) => {
        this.setState({Dien_thoai: event.target.value});
    }
    changeDiaChiHandler= (event) => {
        this.setState({Dia_chi: event.target.value});
    }
    changeMailHandler= (event) => {
        this.setState({Mail: event.target.value});
    }
    changeTenDangNhapHandler= (event) => {
        this.setState({Ten_Dang_nhap: event.target.value});
    }
    changeMatKhauHandler= (event) => {
        this.setState({Mat_khau: event.target.value});
    }
    changeMucLuongHandler= (event) => {
        this.setState({Muc_luong: event.target.value});
    }
    changeNgaySinhHandler= (event) => {
        this.setState({date: event.target.value});
    }
    changeTenDonViHandler= (event) => {
        this.setState({Don_vi:{...this.state.Don_vi, Ten: event.target.value}});
    }
    changeMaDonViHandler= (event) => {
        this.setState({Don_vi:{...this.state.Don_vi, Ma_so: event.target.value}});
    }
    changeMaChiNhanhHandler= (event) => {
        this.setState({Don_vi:{...this.state.Don_vi,  Chi_nhanh:{...this.state.Don_vi.Chi_nhanh, Ma_so: event.target.value}}});
    }
    changeTenChiNhanhHandler= (event) => {
        this.setState({Don_vi:{...this.state.Don_vi,  Chi_nhanh:{...this.state.Don_vi.Chi_nhanh, Ten: event.target.value}}});
    }
    changeTenNgoaiNguhHandler= (event) => {
        this.setState({Ngoai_ngu:{...this.state.Ngoai_ngu, Ten: event.target.value}});
    }
    changeMaNgoaiNguhHandler= (event) => {
        this.setState({Ngoai_ngu:{...this.state.Ngoai_ngu, Ma_so: event.target.value}});
    }
   

    handleChange = (key, e) => {
        const dsnn = this.state.Danh_sach_Ngoai_ngu
        dsnn.map(nn=>{
         if(nn.Ma_so === key){
             nn.Ma_so = e.target.value
            
         }        
     })
       this.setState( this.state.Danh_sach_Ngoai_ngu = dsnn )        
      }

      TenhandleChange = (key, e) => {
        const dsnn = this.state.Danh_sach_Ngoai_ngu
        dsnn.map(nn=>{        
         if(nn.Ten === key){
            nn.Ten = e.target.value
        }
     })
       this.setState( this.state.Danh_sach_Ngoai_ngu = dsnn )        
      }

    // change datetime
    changeDate = (event) => {
        console.log(event.toDate()) // Tue Nov 24 2020 00:00:00 GMT+0400 (Gulf Standard Time)
        console.log(event.format("DD-MM-YYYY")) //24-11-2020
        this.setState({...this.state, date: event.format("DD-MM-YYYY")}) 
   }
    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        var dsnn = this.state.Danh_sach_Ngoai_ngu.length
        if(dsnn >0){
            return (
                <div>
                    <br></br>
                       <div className = "container">
                            <div className = "row">
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body">
                                        <form> 
                                            <div className = "form-group">
                                                <label> Họ tên: </label>
                                                <input placeholder="Họ tên" name="Ho_ten" className="form-control" 
                                                    value={this.state.Ho_ten} onChange={this.changeHoTenHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mã số: </label>
                                                <input placeholder="Mã số" name="Ma_so" className="form-control" 
                                                    value={this.state.Ma_so} onChange={this.changeMaSoHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> CMND: </label>
                                                <input placeholder="CMND" name="CMND" className="form-control" 
                                                    value={this.state.CMND} onChange={this.changeCMNDHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Giới tính: </label>
                                                <input placeholder="Giới tính" name="Gioi_tinh" className="form-control" 
                                                    value={this.state.Gioi_tinh} onChange={this.changeGioiTinhHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Điện thoại: </label>
                                                <input placeholder="Điện thoại" name="Dien_thoai" className="form-control" 
                                                    value={this.state.Dien_thoai} onChange={this.changeDienThoaiHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Địa chỉ: </label>
                                                <input placeholder="Địa chỉ" name="Dia_chi" className="form-control" 
                                                    value={this.state.Dia_chi} onChange={this.changeDiaChiHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mail: </label>
                                                <input placeholder="Mail" name="Mail" className="form-control" 
                                                    value={this.state.Mail} onChange={this.changeMailHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Đăng nhập: </label>
                                                <input placeholder="Tên Đăng Nhập" name="Ten_Dang_nhap" className="form-control" 
                                                    value={this.state.Ten_Dang_nhap} onChange={this.changeTenDangNhapHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mật khẩu: </label>
                                                <input placeholder="Mật khẩu" name="Mat_khau" className="form-control" 
                                                    value={this.state.Mat_khau} onChange={this.changeMatKhauHandler}/>
                                            </div>
                                           
                                            <div className = "form-group">
                                                <label> Mức lương: </label>
                                                <input placeholder="Mức lương" name="Muc_luong" className="form-control" 
                                                    value={this.state.Muc_luong} onChange={this.changeMucLuongHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Ngày sinh: </label>
                                                <DateTime
                                                id="datepicker"
                                                    viewMode="days"
                                                    timeFormat={false}
                                                    dateFormat="DD-MM-YY"
                                                    value={this.state.date}
                                                    onChange={this.changeDate}
    
                                                />
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Đơn vị: </label>
                                                <input placeholder="Tên Đơn vị" name="Ten_Don_vi" className="form-control" 
                                                    value={this.state.Don_vi.Ten} onChange={this.changeTenDonViHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mã số Đơn vị: </label>
                                                <input placeholder="Mã số Đơn vị" name="Ma_Don_vi" className="form-control" 
                                                    value={this.state.Don_vi.Ma_so} onChange={this.changeMaDonViHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mã số Chi nhánh: </label>
                                                <input placeholder="Mã số Chi nhánh" name="Ma_Chi_nhanh" className="form-control" 
                                                    value={this.state.Don_vi.Chi_nhanh.Ma_so} onChange={this.changeMaChiNhanhHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Chi nhánh: </label>
                                                <input placeholder="Tên Chi nhánh" name="Ten_Chi_nhanh" className="form-control" 
                                                    value={this.state.Don_vi.Chi_nhanh.Ten} onChange={this.changeTenChiNhanhHandler}/>
                                            </div> 
                                            {
                                            this.state.Danh_sach_Ngoai_ngu.map(nn =>
                                             <div> 
                                            <label> Mã Ngoại ngữ: </label>  
                                            <input className="form-control"  type="text" onChange={(e) => { this.handleChange(nn.Ma_so, e) }} value={ nn.Ma_so} />
                                            <label> Tên Ngoại ngữ: </label>
                                            <input className="form-control"  type="text" onChange={(e) => { this.TenhandleChange(nn.Ten, e) }} value={ nn.Ten} />
                                            </div> 
                                            )}
                                            <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                       </div>
                </div>
            )
        }else{
            return (
                <div>
                    <br></br>
                       <div className = "container">
                            <div className = "row">
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body">
                                        <form>
                                            <div className = "form-group">
                                                <label> Họ tên: </label>
                                                <input placeholder="Họ tên" name="Ho_ten" className="form-control" 
                                                    value={this.state.Ho_ten} onChange={this.changeHoTenHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> CMND: </label>
                                                <input placeholder="CMND" name="CMND" className="form-control" 
                                                    value={this.state.CMND} onChange={this.changeCMNDHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Giới tính: </label>
                                                <input placeholder="Giới tính" name="Gioi_tinh" className="form-control" 
                                                    value={this.state.Gioi_tinh} onChange={this.changeGioiTinhHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Điện thoại: </label>
                                                <input placeholder="Điện thoại" name="Dien_thoai" className="form-control" 
                                                    value={this.state.Dien_thoai} onChange={this.changeDienThoaiHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Địa chỉ: </label>
                                                <input placeholder="Địa chỉ" name="Dia_chi" className="form-control" 
                                                    value={this.state.Dia_chi} onChange={this.changeDiaChiHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mail: </label>
                                                <input placeholder="Mail" name="Mail" className="form-control" 
                                                    value={this.state.Mail} onChange={this.changeMailHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Đăng nhập: </label>
                                                <input placeholder="Tên Đăng Nhập" name="Ten_Dang_nhap" className="form-control" 
                                                    value={this.state.Ten_Dang_nhap} onChange={this.changeTenDangNhapHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mật khẩu: </label>
                                                <input placeholder="Mật khẩu" name="Mat_khau" className="form-control" 
                                                    value={this.state.Mat_khau} onChange={this.changeMatKhauHandler}/>
                                            </div>
                                           
                                            <div className = "form-group">
                                                <label> Mức lương: </label>
                                                <input placeholder="Mức lương" name="Muc_luong" className="form-control" 
                                                    value={this.state.Muc_luong} onChange={this.changeMucLuongHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Ngày sinh: </label>
                                                <DateTime
                                                id="datepicker"
                                                    viewMode="days"
                                                    timeFormat={false}
                                                    dateFormat="DD-MM-YY"
                                                    value={this.state.date}
                                                    onChange={this.changeDate}
    
                                                />
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Đơn vị: </label>
                                                <input placeholder="Tên Đơn vị" name="Ten_Don_vi" className="form-control" 
                                                    value={this.state.Don_vi.Ten} onChange={this.changeTenDonViHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mã số Đơn vị: </label>
                                                <input placeholder="Mã số Đơn vị" name="Ma_Don_vi" className="form-control" 
                                                    value={this.state.Don_vi.Ma_so} onChange={this.changeMaDonViHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Mã số Chi nhánh: </label>
                                                <input placeholder="Mã số Chi nhánh" name="Ma_Chi_nhanh" className="form-control" 
                                                    value={this.state.Don_vi.Chi_nhanh.Ma_so} onChange={this.changeMaChiNhanhHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                <label> Tên Chi nhánh: </label>
                                                <input placeholder="Tên Chi nhánh" name="Ten_Chi_nhanh" className="form-control" 
                                                    value={this.state.Don_vi.Chi_nhanh.Ten} onChange={this.changeTenChiNhanhHandler}/>
                                            </div>
    
                                            <div className = "form-group">
                                                <label> Tên Ngoại ngữ: </label>
                                                <input placeholder="Tên Ngoại ngữ" name="Ten_Ngoai_ngu" className="form-control" 
                                                    value={this.state.Ngoai_ngu.Ten} onChange={this.changeTenNgoaiNguhHandler}/>
                                            </div>
    
                                            <div className = "form-group">
                                                <label> Mã Ngoại ngữ: </label>
                                                <input placeholder="Mã Ngoại ngữ" name="Ma_Ngoai_ngu" className="form-control" 
                                                    value={this.state.Ngoai_ngu.Ma_so} onChange={this.changeMaNgoaiNguhHandler}/>
                                            </div>
                                            <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                       </div>
                </div>
            )
        }
       
    }
}


export default CreateEmployeeComponent