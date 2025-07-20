import axios from 'axios'

const login_Rest_api_url = "https://spincitybackend.onrender.com/api/v1/auth/authenticate";

class LoginService {
    getCuenta(){
        return axios.get(login_Rest_api_url);
    }
}
export default new LoginService();