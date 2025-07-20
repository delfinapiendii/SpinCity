import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDescuento = createAsyncThunk('auth/registerUser', async ({ name, lastname, username, password, role }, { rejectWithValue }) => {
    try {
        const response = await fetch('https://spincitybackend.onrender.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, lastname, username, password, role }),
        });

        if (!response.ok) {
            throw new Error('Could not create account');
        }

        const data = await response.json();
        return { token: data.token, username };  // Devolvemos el token y el username
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || '',
        username: '',
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = '';
            state.username = '';
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                localStorage.setItem('token', action.payload.token);
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                localStorage.setItem('token', action.payload.token);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthUsername = (state) => state.auth.username;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
