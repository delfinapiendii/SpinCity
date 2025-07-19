import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../config';

export const loginUser = createAsyncThunk('accounts/loginUser', async (credentials, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        // Save token and username in localStorage
        localStorage.setItem('token', data.token);
        // Return token and username to the payload
        return { token: data.token, username: credentials.username };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk('accounts/registerUser', async (userDetails, { rejectWithValue }) => {
    try {
        const response = await fetch(API_ENDPOINTS.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            throw new Error('Could not create account');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const cuentaSlice = createSlice({
    name: 'accounts',
    initialState: {
        token: localStorage.getItem('token') || '',
        username: '',
        error: null,
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('token');
            state.token = '';
            state.username = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = cuentaSlice.actions;

export const selectAuthToken = (state) => state.accounts.token;
export const selectAuthUsername = (state) => state.accounts.username;
export const selectAuthError = (state) => state.accounts.error;

export default cuentaSlice.reducer;
