import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCalendars } from '../redux/slices/calendarSlice';
import { NavBar, Table } from '../components';

export function TeamCalendars() {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { calendars } = useSelector((state) => state.calendars);

	React.useEffect(() => {
		dispatch(
			getCalendars(
				userData.own_calendars
					.slice(1)
					.concat(userData.available_calendars)
			)
		);
	}, [dispatch, userData]);

	return (
		<>
			<NavBar user={userData} />
			<Table calendars={calendars} currentUser={userData} />
		</>
	);
}
