import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, selectIsAuth } from './redux/slices/authSlice';

import {
	Login,
	Register,
	NotFound,
	Home,
	Holidays,
	TeamCalendars,
	CalendarPage
} from './pages/';

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getMyProfile());
	}, [dispatch]);

	const isAuth = useSelector(selectIsAuth);
	// const isAuth = false;

	return (
		<>
			<Routes>
				<Route path="/" element={isAuth ? <Home /> : <Login />} />
				<Route
					path="/login"
					element={
						isAuth ? <Navigate to="/" replace={true} /> : <Login />
					}
				/>
				<Route
					path="/register"
					element={
						isAuth ? (
							<Navigate to="/" replace={true} />
						) : (
							<Register />
						)
					}
				/>
				<Route
					path="/calendars"
					element={
						isAuth ? (
							<TeamCalendars />
						) : (
							<Navigate to="/login" replace={true} />
						)
					}
				/>
				<Route
					path="/calendars/:id"
					element={
						isAuth ? (
							<CalendarPage />
						) : (
							<Navigate to="/login" replace={true} />
						)
					}
				/>
				<Route
					path="/holidays-calendar"
					element={
						isAuth ? (
							<Holidays />
						) : (
							<Navigate to="/login" replace={true} />
						)
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
