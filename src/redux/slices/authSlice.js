import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const postLogin = createAsyncThunk('auth/postLogin', async (params) => {
	try {
		const { data } = await axios.post('/auth/login', params);
		return data;
	} catch (error) {
		const customError = {
			statusText: error.response.statusText,
			message: error.response.data.message
		};
		throw customError;
	}
});

export const postRegister = createAsyncThunk(
	'auth/postRegister',
	async (params) => {
		try {
			const { data } = await axios.post('/auth/register', params);
			return data;
		} catch (error) {
			const customError = {
				statusText: error.response.statusText,
				message: error.response.data.message
			};
			throw customError;
		}
	}
);

export const getMyProfile = createAsyncThunk('auth/getMyProfile', async () => {
	const { data } = await axios.get('/auth/profile');
	return data;
});

const initialState = {
	data: null,
	token: null,
	status: 'loading'
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			state.status = 'loaded';
		}
	},
	extraReducers: {
		//postRegister
		[postRegister.pending]: (state, action) => {
			state.data = null;
			state.token = null;
			state.status = 'loading';
		},
		[postRegister.fulfilled]: (state, action) => {
			state.data = action.payload.user;
			state.token = action.payload.refreshToken;
			state.status = 'loaded';
		},
		[postRegister.rejected]: (state, action) => {
			state.data = null;
			state.token = null;
			state.status = 'error';
		},
		//postLogin
		[postLogin.pending]: (state, action) => {
			state.data = null;
			state.token = null;
			state.status = 'loading';
		},
		[postLogin.fulfilled]: (state, action) => {
			state.data = action.payload.user;
			state.token = action.payload.refreshToken;
			state.status = 'loaded';
		},
		[postLogin.rejected]: (state, action) => {
			state.data = null;
			state.token = null;
			state.status = 'error';
		},
		//getMe
		[getMyProfile.pending]: (state, action) => {
			state.data = null;
			state.status = 'loading';
		},
		[getMyProfile.fulfilled]: (state, action) => {
			state.data = action.payload.user;
			state.status = 'loaded';
		},
		[getMyProfile.rejected]: (state, action) => {
			state.data = null;
			state.status = 'error';
		}
	}
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
