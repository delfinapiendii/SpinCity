import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define la acción asíncrona para procesar el login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch('https://spincitybackend.onrender.com/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        const isAdmin = await fetchUserRole(username);
        localStorage.setItem('token', data.access_token);  // Guarda el token en localStorage
        console.log("Datos de respuesta:", data);

        console.log('Token guardado:', localStorage.getItem('token'));
        return { token: data.access_token, username, isAdmin };  // Devolvemos el token, el username y el rol
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Define la acción asíncrona para registrar un nuevo usuario
export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, lastname, username, password, role }, { rejectWithValue }) => {
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
        localStorage.setItem('token', data.token);  // Guarda el token en localStorage

        return { token: data.token, username, isAdmin: role === 'ADMIN' };  // Devolvemos el token, el username y el rol
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Nueva función para obtener el rol del usuario
export const fetchUserRole = async (username) => {
    try {
        const userResponse = await fetch(`https://spincitybackend.onrender.com/api/cuentas/username/${username}`);
        if (!userResponse.ok) {
            throw new Error('User not found');
        }

        const userData = await userResponse.json();
        return userData.role === 'ADMIN';  // Verifica si el rol es ADMIN
    } catch (error) {
        throw new Error(error.message);
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || '',
        isAdmin: false,
        username: '',
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = '';
            state.username = '';
            state.isAdmin = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.isAdmin = action.payload.isAdmin;
                localStorage.setItem('token', action.payload.token);
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.isAdmin = action.payload.isAdmin;
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
export const selectAuthIsAdmin = (state) => state.auth.isAdmin;  // Selector para el estado de admin
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
