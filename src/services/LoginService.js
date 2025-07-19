import axios from 'axios'

const login_Rest_api_url = "http://localhost:8080/api/v1/auth/authenticate";

class LoginService {
    getCuenta(){
        return axios.get(login_Rest_api_url);
    }
}
export default new LoginService();