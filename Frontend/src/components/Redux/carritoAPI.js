import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addProductToCart = createAsyncThunk(
    'carrito/addProductToCart',
    async ({ username, productId }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://spincitybackend.onrender.com/api/cuentas/add-item-cart?username=${encodeURIComponent(username)}&viniloId=${productId}&cantidad=1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto al carrito');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getDiscountByCode = createAsyncThunk(
  'carrito/getDiscountByCode',
  async ({ discountCode }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://spincitybackend.onrender.com/api/descuentos/titulo/${discountCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();

      if (!response.ok || typeof data.off !== 'number') {
        throw new Error('Código de descuento inválido');
      }

      return data.off; // porcentaje
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const carritoAPI = createSlice({
    name: 'carritoAPI',
    initialState: {
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            
    },
});

export default carritoAPI.reducer;
