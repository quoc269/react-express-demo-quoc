import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "/nhan-vien";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post( "/them-nhan-vien", employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee){
        return axios.post("/cap-nhat-nhan-vien", employee );
    }

    deleteEmployee(Ma_so){
        return axios.post("/xoa-nhan-vien", Ma_so)
    }

    searchEmployee(tk){
        return axios.post("/tim-nhan-vien", tk)
    }
}
export default new EmployeeService()