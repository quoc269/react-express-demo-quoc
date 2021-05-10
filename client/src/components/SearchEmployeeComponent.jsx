import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'


class SearchEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Tu_khoa: this.props.match.params.id,
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.searchEmployee =  this.searchEmployee.bind(this); 
    
    }
    searchEmployee(event){
             
        this.props.history.push(`/tra-cuu/${this.state.Tu_khoa}`)        
    }
    deleteEmployee(id){
        var IDNV = {"Ma_so": id}
        EmployeeService.deleteEmployee(IDNV).then( res => {
            this.props.history.push('/');
        });
    }
    viewEmployee(id){
        this.props.history.push(`/nhan-vien/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
    var Tu_khoa = {"Tu_khoa" : this.state.id}
    EmployeeService.searchEmployee(Tu_khoa).then((res) => {
                this.setState({ employees: res.data.dsnv});            
        })       
        
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    changeTuKhoaHandler= (event) => {
        this.setState({Tu_khoa: event.target.value});
    }

  

    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className="align-items-right py-5">
                    <div className="input-group">
                            <div className="form-outline text-right">
                                <input type="search" id="form1" className="form-control" value={this.state.Tu_khoa} onChange={this.changeTuKhoaHandler} />                            
                            </div>
                            <button type="button" className="btn-primary"  onClick={this.searchEmployee} >
                                Search
                            </button>
                    </div>

                 </div>
               
                 <div className = "row ">
                    <button  className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Hình Nhân viên</th>
                                    <th> Mã số</th>
                                    <th> Họ tên</th>
                                    <th> Giới tính</th>
                                    <th> Ngày sinh</th>
                                    <th>Mức lương</th>                                   
                                </tr>
                            </thead>
                            <tbody>
                           
                                {
                                 
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.Ma_so}>
                                            <td>
                                                <img src={process.env.PUBLIC_URL + `/Media/${employee.Ma_so}.png`}  alt={`${employee.Ma_so}.png`} style={{width: '150px', height: '200px'}} className="img-thumbnail " />
                                               
                                            </td>
                                             <td> { employee.Ma_so} </td>
                                             <td> { employee.Ho_ten} </td>   
                                             <td> {employee.Gioi_tinh}</td>
                                             <td> {employee.Ngay_sinh}</td>
                                             <td> {employee.Muc_luong}</td>

                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.Ma_so)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.Ma_so)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.Ma_so)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('./Media', false, /\.(png|jpe?g|svg)$/));
console.log(images)
export default SearchEmployeeComponent 