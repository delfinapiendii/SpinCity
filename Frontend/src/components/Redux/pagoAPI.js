import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define la acción asíncrona para procesar el pago
export const addPedido = createAsyncThunk(
    'pedidos/addPedido',
    async ({ username, seleccionEnvio, direccion, codigoDescuento }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://spincitybackend.onrender.com/api/pedidos/add-pedido?username=${encodeURIComponent(username)}&delivery=${encodeURIComponent(seleccionEnvio)}&adress=${encodeURIComponent(direccion)}&descuento=${encodeURIComponent(codigoDescuento)}&metodoPago=tarjeta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                throw new Error('Error al agregar el pedido a la base');
            }

            const data = await response.json();  // Obtener la respuesta como JSON
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const pagoAPI = createSlice({
    name: 'pedidos',
    initialState: {
        tarjetaView: 'no',
        comprado: 'no',
        total: 0,
        colorMaster: 'background-white-1',
        colorVisa: 'background-white-1',
        buttonFinalizar: 'button-pago-blocked',
        datosTarjeta: {
            numero: '',
            titular: '',
            vtoMes: '',
            vtoYear: '',
            codigoSeguridad: '',
        },
        status: 'idle',
        error: null,
    },
    reducers: {
        setDatosTarjeta: (state, action) => {
            state.datosTarjeta = action.payload;
        },
        setTarjetaView: (state, action) => {
            state.tarjetaView = action.payload;
        },
        setComprado: (state, action) => {
            state.comprado = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        cambiarColor: (state, action) => {
            const { tarjeta } = action.payload;
            switch (tarjeta) {
                case 'visa':
                    state.colorMaster = 'background-white-1';
                    state.colorVisa = 'background-color-2';
                    break;
                case 'master':
                    state.colorMaster = 'background-color-2';
                    state.colorVisa = 'background-white-1';
                    break;
                default:
                    break;
            }
        },
        setButtonFinalizar: (state, action) => {
            state.buttonFinalizar = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPedido.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addPedido.fulfilled, (state) => {
                state.status = 'succeeded';
                state.comprado = 'si';
                state.tarjetaView = 'no';
            })
            .addCase(addPedido.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {
    setDatosTarjeta,
    setTarjetaView,
    setComprado,
    setTotal,
    cambiarColor,
    setButtonFinalizar,
} = pagoAPI.actions;

export default pagoAPI.reducer;
