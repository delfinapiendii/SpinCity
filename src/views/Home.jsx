import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


import Footer from '../components/Footer.jsx';

import Card from '../components/Card.jsx';
import inRainbows from "../assets/img/Inrainbowscover.png";
import rumours from "../assets/img/Rumourscover.png";
import folklore from "../assets/img/folklorecover.png";
import civilizacion from "../assets/img/lospiojoscivilizacion.webp";
import ohms from '../assets/img/ohms.jpg';
import am from '../assets/img/am.jpg';

import "../assets/css/home.css";

const Home = () => {
    const [vinilos, setVinilos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isHome,setisHome] = useState(false);

    useEffect(() => {
        // Función para obtener los vinilos desde la API
        const fetchVinilos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vinilos'); // Asegúrate de que esta URL es correcta
                if (!response.ok) {
                    throw new Error('Error al obtener los vinilos');
                }
                const data = await response.json();
                setVinilos(data.content); // Asegúrate de que 'data.content' es el lugar correcto donde están los vinilos
                console.log(data.content[0].image)
                
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchVinilos();
    }, []);
    return (
        <div>
            <section id="home-banner" className="d-flex justify-content-center align-items-center">
                <div className="padding-nav"></div>
                <h1 className="white-1 padding-nav-title cursor-default">Explora la música en vinilo</h1>
            </section>
            <main id="home-novedades" className="background-color-0 d-flex flex-column justify-content-center align-items-center cursor-default">
                <h2 className="black-1 fw-bold">Novedades</h2>
                <Carousel id="home-carousel">
                    <Carousel.Item>
                        <div className='home-container-cards d-flex justify-content-center align-items-center'>
                            {vinilos.slice(0, 3).map(vinilo => (
                                <div key={vinilo.id} className="home-card d-flex justify-content-center align-items-center">
                                    
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='home-container-cards d-flex justify-content-center align-items-center'>
                            {vinilos.slice(3, 6).map(vinilo => (
                                <div key={vinilo.id} className="home-card d-flex justify-content-center align-items-center">
                                   
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                </Carousel>
                <Link to="/Products" className="button-1 black-1 mb-4 mt-3" onClick={() => window.scrollTo(0, 0)}>Ver catálogo</Link>
            </main>
            <section id="home-quienes-somos" className="background-white-1 d-flex justify-content-center align-items-center cursor-default">
                <div id="home-background-1" className="w-50 h-100"></div>
                <div className="w-50 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="black-1 fw-bold">¿Quiénes somos?</h2>
                    <p>Desde 1967 nos dedicamos a preservar la magia atemporal de la música a través de uno de los formatos más queridos y auténticos: el vinilo. Con una pasión arraigada por el sonido analógico y la nostalgia de las portadas artísticas, ofrecemos una cuidadosa selección de álbumes que abarcan géneros, décadas y emociones.</p>
                </div>
            </section>
            <section id="home-contacto" className="background-color-0 d-flex flex-column justify-content-center align-items-center">
                <h2 className="black-1 fw-bold cursor-default">Contacto</h2>
                <div id="contacto-container" className="background-color-1 d-flex justify-content-center align-items-center p-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <iframe id="home-map" src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=Joaquín V. González 1125 CABA&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end align-items-start ms-5 h-100 cursor-default">
                        <p>contacto@spincity.com</p>
                        <p>Joaquín V. González 1125 CABA</p>
                        <p>4862-9345</p>
                    </div>
                </div>
            </section>
            <div className="footer-padding background-color-0"></div>
            <Footer />
        </div>
    );
}

export default Home;