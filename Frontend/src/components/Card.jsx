import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../assets/css/styles.css";
import "../assets/css/card.css";
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../components/Redux/productSlice';


function Card({ product, handleClick, isHome }) {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {   
    }, [product]);



    const handleAddToCart = () => {
        handleClick();  
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    const handleVerMasClick = () => {
        console.log("Ver más clickeado para el producto:", product.id);
        window.scrollTo(0, 0);
    };

    return (
        <div className="card">
            

            <div className="card-body">
            <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.title}
                className="card-img"
            />
            <h2 className="card-title">{product.title}</h2>
            <h3 className="card-subtitle">{product.subtitle}</h3>
            {!isHome && (
                <div className='d-flex'>
                <p className="card-price">$ {product.price}</p>
                <button
                    id="add-cart-button"
                    className="card-button bi bi-bag-fill mb-1"
                    onClick={handleAddToCart}
                ></button>
                
                    <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                        handleVerMasClick();
                        dispatch(setSelectedProduct(product)); // ✅ guardamos en redux
                    }}
                    className="link-info"
                    >
                    <i className="bi bi-info-circle-fill info-product"></i>
                    </Link>

                </div>
            )}
            </div>

            {showPopup && (
                <div className="popup">
                    <p>Agregado al carrito</p>
                </div>
            )}
        </div>
    );
}

export default Card;
