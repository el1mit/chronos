import React from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { Calendar, NavBar } from '../components';

export function Home() {
	const userData = useSelector((state) => state.auth.data);
	const [calendar, setCalendar] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const { data } = await axios.get(
					`/calendars/${userData.own_calendars[0]}`
				);

				data.calendar.events = data.calendar.events.map((event) => ({
					...event,
					type: 'event'
				}));

				setCalendar(data.calendar);

				setIsLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchData();
	}, [userData]);

	return (
		<>
			<NavBar user={userData} />
			{!isLoading ? (
				<Calendar
					calendarEvents={calendar.events}
					currentUser={userData}
				/>
			) : null}
		</>
	);
}
