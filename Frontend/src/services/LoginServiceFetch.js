const login_Rest_api_url = "https://spincitybackend.onrender.com/api/v1/auth/authenticate";

class LoginServiceFetch {
    getCuenta(){
        return fetch (login_Rest_api_url).then((res => res.json ));
    }
}

export default new LoginServiceFetch();