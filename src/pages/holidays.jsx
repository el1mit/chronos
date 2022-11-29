import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { NavBar, Calendar } from '../components';

export function Holidays() {
	const userData = useSelector((state) => state.auth.data);
	const [calendar, setCalendar] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const { data } = await axios.get(
					`https://calendarific.com/api/v2/holidays?&api_key=b9242fed061902b252efca0d74d458fc3ffe46db&country=UA&year=2022`
				);
				data.response.holidays = data.response.holidays.map(
					({ name, date }, index) => ({
						id: index,
						type: 'holiday',
						name: name,
						start_time: Date.parse(date.iso),
						end_time: Date.parse(date.iso)
					})
				);

				setCalendar(data.response.holidays);

				setIsLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchData();
	}, []);
	console.log(calendar);
	return (
		<>
			<NavBar user={userData} />
			{!isLoading ? <Calendar calendarEvents={calendar} /> : null}
		</>
	);
}
