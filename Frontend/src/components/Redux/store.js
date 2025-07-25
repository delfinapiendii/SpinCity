import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counter';
import authSlice from './authSlice';
import carritoSlice from './carritoSlice';
import carritoAPI from './carritoAPI';
import productSlice from './productSlice';
import productsReducer from './productSlice'; // ruta correcta

import pagoAPI from '../Redux/pagoAPI';

const store = configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
        carrito: carritoSlice,
        carritoAPI: carritoAPI,
        product: productSlice,
        products: productsReducer,
        pedidos: pagoAPI.reducer,  // Corregir aquí
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
