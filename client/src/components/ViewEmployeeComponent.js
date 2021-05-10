import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import DateTime from 'react-datetime';
import moment from 'moment';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,           
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
        
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
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
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label> Hình: </label>
                            <div>  <img src={process.env.PUBLIC_URL + `/Media/${this.state.Ma_so}.png`}  alt={`${this.state.Ma_so}.png`} style={{width: '150px', height: '200px'}} className="img-thumbnail " /></div>
                        </div>
                        <div className = "row">
                            <label> Họ tên: </label>
                            <div> { this.state.Ho_ten }</div>
                        </div>
                        <div className = "row">
                            <label> Mã số: </label>
                            <div> { this.state.Ma_so }</div>
                        </div>
                        <div className = "row">
                            <label> Giới tính: </label>
                            <div> { this.state.Gioi_tinh }</div>
                        </div>
                        <div className = "row">
                            <label> Ngày sinh: </label>
                            <div> { this.state.Ngay_sinh }</div>
                        </div>
                        <div className = "row">
                            <label> Mức lương: </label>
                            <div> { this.state.Muc_luong }</div>
                        </div>
                        <div className = "row">
                            <label> Điện thoại:  </label>
                            <div> { this.state.Dien_thoai }</div>
                        </div>
                        <div className = "row">
                            <label> Địa chỉ:  </label>
                            <div> { this.state.Dia_chi }</div>
                        </div>
                        <div className = "row">
                            <label> Tên Đơn vị: </label>
                            <div>{ this.state.Don_vi.Ten } </div>
                        </div>
                        <div className = "row">
                            <label> Tên Chi nhánh: </label>
                            <div>{ this.state.Don_vi.Chi_nhanh.Ten } </div>
                        </div>
                        <div className = "row">
                        <label> Khả  Ngoại ngữ: </label>
                        </div>
                        <ul>
                        {this.state.Danh_sach_Ngoai_ngu.map(nn =>
                            <li>{nn.Ten}</li>
                        )}
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent