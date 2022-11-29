import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getCalendars = createAsyncThunk(
	'calendars/getCalendars',
	async (calendars) => {
		let calendarsList = [];
		for (let i = 0; i < calendars.length; i++) {
			let calendar = await axios.get(`/calendars/${calendars[i]}`);
			calendarsList[i] = calendar.data.calendar;
		}
		return calendarsList;
	}
);

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
	const { data } = await axios.delete(`/posts/${id}`);
	return data;
});

export const editPost = createAsyncThunk('posts/editPost', async (params) => {
	const { data } = await axios.patch(`/posts/${params.id}`, params.payload);
	return data;
});

const initialState = {
	calendars: [],
	message: '',
	status: 'loading'
};

const calendarsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		//getCalendars
		[getCalendars.pending]: (state, action) => {
			state.status = 'loading';
		},
		[getCalendars.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.calendars = action.payload;
		},
		[getCalendars.rejected]: (state, action) => {
			state.status = 'error';
			state.calendars = null;
		},

		//removePost
		[removePost.pending]: (state, action) => {
			state.status = 'pending';
			state.posts = state.posts.filter(
				(obj) => obj.id !== action.meta.arg
			);
		},
		[removePost.fulfilled]: (state, action) => {
			state.status = 'fullfilled';
		},
		[removePost.rejected]: (state, action) => {
			state.status = 'error';
		},
		//editPost
		[editPost.pending]: (state, action) => {
			state.status = 'loading';
			state.posts = state.posts.map((post) => {
				if (post.id === action.meta.arg.id) {
					post = { ...post, ...action.meta.arg.payload };
				}
				return post;
			});
		},
		[editPost.fulfilled]: (state, action) => {
			state.status = 'loaded';
		},
		[editPost.rejected]: (state, action) => {
			state.status = 'error';
		}
	}
});

export const calendarsReducer = calendarsSlice.reducer;
