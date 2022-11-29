import React from 'react';
import { useSelector } from 'react-redux';
import {
	startOfToday,
	format,
	eachDayOfInterval,
	eachMonthOfInterval,
	startOfYear,
	endOfYear,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isSameMonth,
	isSameDay,
	isToday,
	isEqual
} from 'date-fns';
import { ModalEvent, FullEvent } from './';

export function CalendarYear({ yearStart, events, users }) {
	let today = startOfToday();
	const userData = useSelector((state) => state.auth.data);
	const [openModal, setOpenModal] = React.useState(false);
	const [selectedDay, setSelectedDay] = React.useState(today);
	const [eventId, setEventID] = React.useState();
	let months = [];

	let monthsNew = eachMonthOfInterval({
		start: startOfYear(yearStart, { weekStartsOn: 1 }),
		end: endOfYear(yearStart, { weekStartsOn: 1 })
	});

	monthsNew.forEach((month) => {
		let days = eachDayOfInterval({
			start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
			end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
		});

		let newMonth = {
			name: month,
			days
		};

		months.push(newMonth);
	});

	return (
		<div>
			<div className="flex flex-col items-center bg-white">
				<ModalEvent
					openModal={openModal}
					setOpenModal={setOpenModal}
					isEditing={true}
					eventId={eventId}
				/>

				<div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
					{months.map((month) => (
						<section
							key={format(month.name, 'MMMM')}
							className="text-center"
						>
							<h2 className="font-semibold text-gray-900">
								{format(month.name, 'MMMM')}
							</h2>

							<div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
								<div>M</div>
								<div>T</div>
								<div>W</div>
								<div>T</div>
								<div>F</div>
								<div>S</div>
								<div>S</div>
							</div>

							<div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
								{month.days.map((day, dayIdx) => (
									<button
										key={day}
										type="button"
										onClick={() => setSelectedDay(day)}
										className={`
											${(isEqual(day, selectedDay) || isToday(day)) && 'font-semibold'}
											${isEqual(day, selectedDay) && 'text-white'}
											${!isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600'}
											${
												isSameMonth(day, month.name)
													? 'bg-white text-gray-900'
													: 'bg-gray-50 text-gray-400'
											}
											${dayIdx === 0 && 'rounded-tl-lg'}
											${dayIdx === 6 && 'rounded-tr-lg'}
											${dayIdx === month.days.length - 7 && 'rounded-bl-lg'}
											${dayIdx === month.days.length - 1 && 'rounded-br-lg'}
											flex flex-col items-center py-1.5 hover:bg-gray-100 focus:z-10`}
									>
										<time
											dateTime={format(
												day,
												'MMMM-yyyy-dd'
											)}
											className={`${
												isSameDay(day, selectedDay) &&
												'bg-indigo-600 font-semibold text-white'
											}
												mx-auto flex h-7 w-7 items-center justify-center rounded-full`}
										>
											{format(day, 'd')}
										</time>

										{events.filter((event) =>
											isSameDay(event.start_time, day)
										).length > 0 && (
											<div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
												{events
													.filter((event) =>
														isSameDay(
															event.start_time,
															day
														)
													)
													.map((event) => (
														<div
															key={event.id}
															className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
														/>
													))}
											</div>
										)}
									</button>
								))}
							</div>
						</section>
					))}
				</div>

				{events.filter((event) =>
					isSameDay(event.start_time, selectedDay)
				).length > 0 && (
					<div className="w-1/2 py-10 px-4">
						<ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
							{events
								.filter((event) =>
									isSameDay(event.start_time, selectedDay)
								)
								.map((event) => (
									<FullEvent
										event={event}
										setOpenModal={setOpenModal}
										setEventID={setEventID}
										current_user={userData}
										users={users}
										key={event.id}
									/>
								))}
						</ol>
					</div>
				)}
			</div>
		</div>
	);
}
