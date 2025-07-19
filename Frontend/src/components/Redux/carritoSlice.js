// src/components/Redux/carritoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getDiscountByCode } from './carritoAPI';

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    productosSeleccionados: [],
    seleccionEnvio: 'false',
    codigoDescuento: '',
    descuentoAplicado: 0,
    totalPrice: 0,
    adress: '',
  },
  reducers: {
    setProductosSeleccionados(state, action) {
      state.productosSeleccionados = action.payload;
    },
    setSeleccionEnvio(state, action) {
      state.seleccionEnvio = action.payload;
    },
    setCodigoDescuento(state, action) {
      state.codigoDescuento = action.payload;
    },
    setAdress(state, action) {
      state.adress = action.payload;
    },
    calcularTotal(state) {
      const subtotal = state.productosSeleccionados.reduce((acc, p) => acc + p.price, 0);
      const descuento = state.descuentoAplicado || 0;
      const totalConDescuento = subtotal - (subtotal * (descuento / 100));
      state.totalPrice = totalConDescuento;
    },
    setDescuentoAplicado(state, action) {
      state.descuentoAplicado = action.payload;
    },
    resetCarrito: (state) => {
        state.productosSeleccionados = [];
        state.seleccionEnvio = 'false';
        state.codigoDescuento = '';
        state.descuentoAplicado = 0;
        state.totalPrice = 0;
        state.adress = '';
      }
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountByCode.fulfilled, (state, action) => {
        const off = action.payload;
        if (off > 0 && off <= 100) {
          state.descuentoAplicado = off;
        } else {
          state.descuentoAplicado = 0;
        }

        const subtotal = state.productosSeleccionados.reduce((acc, p) => acc + p.price, 0);
        state.totalPrice = subtotal - (subtotal * (state.descuentoAplicado / 100));
      })
      .addCase(getDiscountByCode.rejected, (state) => {
        state.descuentoAplicado = 0;
        state.totalPrice = state.productosSeleccionados.reduce((acc, p) => acc + p.price, 0);
      });
  }
});

export const {
  setProductosSeleccionados,
  setSeleccionEnvio,
  setCodigoDescuento,
  calcularTotal,
  setAdress,
  setDescuentoAplicado,
  resetCarrito
} = carritoSlice.actions;


export default carritoSlice.reducer;
