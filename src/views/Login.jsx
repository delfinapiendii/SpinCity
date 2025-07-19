import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/login.css';
import { loginUser, registerUser, selectAuthError } from '../components/Redux/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hasAccount, setHasAccount] = useState('yes');
    const [forgotP, setForgotP] = useState('no');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [registerName, setRegisterName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerRole, setRegisterRole] = useState('');
    const authError = useSelector(selectAuthError);

    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            

            try {
                await dispatch(loginUser({ username, password })).unwrap();
                
                navigate('/Admin'); // Navega a la página principal después de iniciar sesión
                console.log('¡Inicio de sesión exitoso!');
            } catch (error) {
                setError(authError || 'Error al iniciar sesión');
            }
           
        } catch (error) {
            setError(error.message);
        }
    };

    
    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterRole('USER');
        try {
            await dispatch(registerUser({ 
                name: registerName, 
                lastname: registerLastName, 
                username: registerUsername, 
                password: registerPassword,
                role: registerRole 
            })).unwrap();
            navigate('/'); // Navega a la página principal después de registrarse
            console.log('¡Registro exitoso!');
        } catch (error) {
            setError(authError || 'Error al registrarse');
        }
        
    };


    const renderForgotP = () => {
        switch (forgotP) {
            case 'no':
                return (
                    <button id="forgot-p-button" onClick={() => setForgotP('yes :(')}><h6>¿Te olvidaste tu contraseña?</h6></button>
                );
            default:
                return (
                    <div id="forgot-p-button" className="p-difference-button">Te ha llegado un mail a tu casilla de correo</div>
                );
        }
    }

    const renderLogIn = () => {
        switch (hasAccount) {
            case 'no':
                return (
                    <div className="d-flex flex-column align-items-center">
                        <div className="padding-nav"></div>
                        <form id="login-form" className="background-color-1 d-flex flex-column align-items-center" onSubmit={handleRegister}>
                            <h3 className="fw-bold">Regístrate</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                            />
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Apellido"
                                value={registerLastName}
                                onChange={(e) => setRegisterLastName(e.target.value)}
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Usuario"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            {error && <div className="error-message">{error}</div>}
                            <button className="background-color-3 white-1" type="submit">Crear cuenta</button>
                        </form>
                        <p className="m-2 mt-5">¿Ya tenés cuenta?</p>
                        <button className="button-1 px-3" onClick={() => setHasAccount("yes")}>Iniciar sesión</button>
                    </div>
                );
            default:
                return (
                    <div className="d-flex flex-column align-items-center">
                        <div className="padding-nav"></div>
                        <form id="login-form" className="background-color-1 d-flex flex-column align-items-center" onSubmit={handleLogin}>
                            <h3 className="fw-bold">Iniciar Sesión</h3>
                            <input
                                type="text"
                                name="username"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                id="login-input-2"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {renderForgotP()}
                            {error && <div className="error-message">{error}</div>}
                            <button className="background-color-3 white-1" type="submit">Iniciar Sesión</button>
                        </form>
                        <p className="m-2 mt-5">¿No tenés cuenta?</p>
                        <button className="button-1 px-3" onClick={() => setHasAccount("no")}>Registrarse</button>
                    </div>
                );
        }
    }

    return (
        <div id="login" className="background-color-0 d-flex align-items-center justify-content-center">
            {renderLogIn()}
        </div>
    );
}

export default Login;
