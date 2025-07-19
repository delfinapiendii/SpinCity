const login_Rest_api_url = "http://localhost:8080/api/v1/auth/authenticate";

class LoginServiceFetch {
    getCuenta(){
        return fetch (login_Rest_api_url).then((res => res.json ));
    }
}

export default new LoginServiceFetch();