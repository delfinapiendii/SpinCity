import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from "../components/ProductList.jsx";
import Footer from '../components/Footer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setProductosSeleccionados, calcularTotal, setAdress, setSeleccionEnvio,setCodigoDescuento  } from '../components/Redux/carritoSlice.js'; 
import { decrement } from '../components/Redux/counter';
import { addProductToCart, getDiscountByCode } from '../components/Redux/carritoAPI';
import "../assets/css/cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const seleccionEnvio = useSelector((state) => state.carrito.seleccionEnvio);
    const productosSeleccionados = useSelector((state) => state.carrito.productosSeleccionados);
    const totalPrice = useSelector((state) => state.carrito.totalPrice);
    const direccion = useSelector((state) => state.carrito.adress);
    const descuento = useSelector((state) => state.carrito.codigoDescuento);

    const count = useSelector((state) => state.counter.value);
    const username = useSelector((state) => state.auth.username);

    useEffect(() => {
        dispatch(calcularTotal());  // Calcular el total basado en los vinilos seleccionados
    }, [productosSeleccionados, dispatch]);

    const handleClick = (productId) => {
        dispatch(decrement());
        dispatch(setProductosSeleccionados(productosSeleccionados.filter(item => item.id !== productId)));
    };

    const handleDireccionChange = (e) => {
        dispatch(setAdress(e.target.value));  // Actualiza la dirección en el estado global
    };
    
    const handledescuentoChange = async (e) => {
        const code = e.target.value;
        dispatch(setCodigoDescuento(code));
      
        try {
          const result = await dispatch(getDiscountByCode({ discountCode: code }));
          if (getDiscountByCode.fulfilled.match(result)) {
            console.log("Descuento aplicado:", result.payload + "%");
          } else {
            console.warn("Código no válido.");
          }
        } catch (err) {
          console.error("Error buscando descuento:", err);
        }
      };
      
    

    const handleEnvioChange = (e) => {
        dispatch(setSeleccionEnvio(e.target.value));
    };
    const handleAddToCart = async () => {
        try {
          const addPromises = productosSeleccionados.map(product => {
            console.log("Agregando producto al carrito:", product.id);
            return dispatch(addProductToCart({ username, productId: product.id }));
          });
      
          await Promise.all(addPromises); // ⬅️ Esperamos todos los despachos
      
          navigate('/payment');
        } catch (error) {
          console.error("Error al agregar productos al carrito:", error);
        }
      };
      
    const renderPago = () => {
        if (count === 0) {
            return (
                <div className="d-flex flex-column align-items-center pb-5">
                    <h2 className="color-1 m-5 pb-5">No hay productos en el carrito :(</h2>
                    <div className="p-4"></div>
                </div>
            );
        }

        return (
            <div className='cart-checkout d-flex'>
                <div className="cart-envio">
                    <h3 className="text-center pb-2 cursor-default">Tipo de envío:</h3>
                    <select value={seleccionEnvio} onChange={handleEnvioChange}>
                        <option value="false">Retiro en Sucursal</option>
                        <option value="true">Envío a domicilio</option>
                    </select>
                    {seleccionEnvio === 'true' && (
                        <div className="d-flex flex-column mt-3 ">
                            <label htmlFor="direccion" className="text-center pb-2">Dirección de Envío:</label>
                            <input 
                                id="direccion"
                                type="text" 
                                placeholder="Ingrese la dirección de envío" 
                                value={direccion} 
                                onChange={handleDireccionChange}
                            />
                        </div>
                    )}
                </div>
                <div className="cart-descuento">
                    <h3 className="text-center pb-2 cursor-default">Código de descuento:</h3>
                    <input 
                        type="text" 
                        placeholder="Código de descuento" 
                        value={descuento}
                        onChange={handledescuentoChange}
                    />
                </div>
                
                <div className="cart-total">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                </div>
                {username && productosSeleccionados.length > 0 && (
                    <div className="cart-finalizar" >
                        <button id="cart-finalizar-button" onClick={handleAddToCart}>Comprar</button>
                    </div>
                )}
                
            </div>
        );
    }

    return (
        <div className='cart d-flex flex-column align-items-center'>
            <section id="cart-banner" className="d-flex justify-content-center align-items-center">
                <div className="padding-nav"></div>
                <h1 className="white-1 padding-nav-title cursor-default">Carrito</h1>
            </section>
            <div className='cart-items'>
                <div className="product-list-header d-flex align-items-center fw-bold ps-2">
                    <span id="cart-padding-titulo" className="cursor-default">Título</span>
                    <span id="cart-padding-artista" className="cursor-default">Artista</span>
                    <span id="cart-padding-precio" className="cursor-default">Precio</span>
                    <span></span>
                </div>
                <div>
                    {productosSeleccionados.map(product => (
                        <ProductList
                            key={product.id}
                            imageSrc={product.image}
                            title={product.title}
                            subtitle={product.subtitle}
                            price={product.price}
                            handleClick={() => { handleClick(product.id); }}
                        />
                    ))}
                </div>
            </div>
            {renderPago()}
            <Footer />
        </div>
    );
}

export default Cart;
