import { createSlice } from '@reduxjs/toolkit';

const carritoSlice = createSlice({
    name: 'carrito',
    initialState: {
        productosSeleccionados: [],
        seleccionEnvio: 'false',
        codigoDescuento: '',
        descuentoAplicado: 0,
        precioConDescuento: 0,
        totalPrice: 0,
        adress:'',
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
        setDescuentoAplicado(state, action) {
            state.descuentoAplicado = action.payload;
        },
        calcularTotal: (state, action) => {
            const totalPrice = state.productosSeleccionados.reduce((total, product) => total + product.price, 0);
            state.totalPrice = action.payload !== undefined ? action.payload : totalPrice;
        },
        setAdress(state, action) {
            state.adress = action.payload;
        }
    },
});

export const { setProductosSeleccionados, setSeleccionEnvio, setCodigoDescuento, setDescuentoAplicado, calcularTotal,setAdress } = carritoSlice.actions;
export default carritoSlice.reducer;
