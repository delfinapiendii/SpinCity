import React from 'react';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import "../assets/css/footer.css";
const Footer = () => {

    return (
        <footer className="d-flex flex-column align-items-center justify-content-center w-100">
            <div className="w-100 background-color-2 pt-3 w-100"></div>
            <div className="d-flex justify-content-center background-color-2b w-100 py-5">
                <div className="footer-section logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-section d-flex flex-column align-items-center">
                    <h3 className="black-1 cursor-default">Links Utiles:</h3>
                    <div id="footer-links" className="d-flex flex-column">
                        <Link to='/' className="footer-link text-decoration-none black-1" onClick={() => window.scrollTo(0, 0)}>Inicio</Link>
                        <Link to='/Products' className="footer-link text-decoration-none black-1" onClick={() => window.scrollTo(0, 0)}>Productos</Link>
                        <Link to={{ pathname: '/Cart' }} className="footer-link text-decoration-none black-1" onClick={() => window.scrollTo(0, 0)}>Carrito</Link>
                    </div>
                </div>
                <div id="footer-redes" className="footer-section d-flex flex-column align-items-end ms-3">
                    <h3 className="black-1 cursor-default">Nuestras Redes:</h3>
                    <div className="social-icons pe-2 me-2">
                        <a href="#"><i className="bi bi-instagram black-1 pe-1"></i></a>
                        <a href="#"><i className="bi bi-twitter black-1"></i></a>
                        <a href="#"><i className="bi bi-tiktok black-1"></i></a>
                    </div>
                </div>
            </div>
            <h3 id="copyright" className="background-color-2b color-2 w-100 text-center mb-0 pb-2 cursor-default">© 2024 Spin City. Todos los derechos reservados.</h3>
        </footer>
    );
}

export default Footer;
