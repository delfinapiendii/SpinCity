import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Async thunk para obtener todos los productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch(`${API_BASE_URL}/vinilos`);
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [], // Array para mantener la lista de productos
        status: 'idle', // Status: 'idle', 'loading', 'succeeded', 'failed'
        error: null, // Error object si ocurre algún error durante las operaciones async
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
export const productActions = {
    ...productSlice.actions,
    fetchProducts,
};
