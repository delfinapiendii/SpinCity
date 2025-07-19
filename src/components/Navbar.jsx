import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../components/Redux/counter';
import { selectAuthIsAdmin } from '../components/Redux/authSlice';

import logo from "../assets/img/logo.png";

import "../assets/css/navbar.css";

const Navbar = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const isAdmin = useSelector(selectAuthIsAdmin); 

    return (
        <nav className='d-flex align-items-center justify-content-between background-color-2'>
            <div className="d-flex align-items-center nav-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className='nav-pages'>
                <ul className='nav-links d-flex color-3 p-0 ps-4'>
                    <li><Link to='/' onClick={() => window.scrollTo(0, 0)}>Inicio</Link></li>
                    <li><Link to='/Products' onClick={() => window.scrollTo(0, 0)}>Productos</Link></li>
                    <li><Link to={{ pathname: '/Cart' }} onClick={() => window.scrollTo(0, 0)}>Carrito</Link></li>
                    {isAdmin && <li><Link to="/Admin" onClick={() => window.scrollTo(0, 0)} >Admin</Link></li>}
                </ul>
            </div>
            <div className="d-flex align-items-center">
                <ul className='nav-links color-3 p-0 m-0 nav-login'>
                    <li>
                        <Link to='/Login' onClick={() => window.scrollTo(0, 0)}>
                            <i class="bi bi-person-circle pe-2"></i>
                            Acceder
                        </Link>
                    </li>
                </ul>
                <Link to="/Cart" className='nav-cart black-1'>
                    <i class="bi bi-cart-fill pe-1"></i>
                    <div>{count}</div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
