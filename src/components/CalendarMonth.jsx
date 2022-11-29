import React from 'react';
import { useSelector } from 'react-redux';
import {
	startOfToday,
	format,
	eachDayOfInterval,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	isToday,
	isSameMonth,
	isEqual,
	getDay,
	isSameDay
} from 'date-fns';

import { ModalEvent, Event, FullEvent } from './';

export function CalendarMonth({ monthStart, events, users }) {
	let today = startOfToday();
	const userData = useSelector((state) => state.auth.data);
	const [openModal, setOpenModal] = React.useState(false);
	const [selectedDay, setSelectedDay] = React.useState(today);
	const [eventId, setEventID] = React.useState();

	let days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(monthStart), { weekStartsOn: 1 }),
		end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 })
	});

	let colStartClasses = [
		'col-start-7',
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6'
	];

	return (
		<>
			<div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
				<ModalEvent
					openModal={openModal}
					setOpenModal={setOpenModal}
					isEditing={true}
					eventId={eventId}
				/>

				<div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
					<div className="bg-white py-2">
						M<span className="sr-only sm:not-sr-only">on</span>
					</div>
					<div className="bg-white py-2">
						T<span className="sr-only sm:not-sr-only">ue</span>
					</div>
					<div className="bg-white py-2">
						W<span className="sr-only sm:not-sr-only">ed</span>
					</div>
					<div className="bg-white py-2">
						T<span className="sr-only sm:not-sr-only">hu</span>
					</div>
					<div className="bg-white py-2">
						F<span className="sr-only sm:not-sr-only">ri</span>
					</div>
					<div className="bg-white py-2">
						S<span className="sr-only sm:not-sr-only">at</span>
					</div>
					<div className="bg-white py-2">
						S<span className="sr-only sm:not-sr-only">un</span>
					</div>
				</div>

				<div className="flex bg-gray-200 text-sm leading-6 text-gray-700 lg:flex-auto">
					<div className="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
						{days.map((day, index) => (
							<div
								type="button"
								key={day.toString()}
								onClick={() => setSelectedDay(day)}
								className={`
									${index === 0 && colStartClasses[getDay(day)]}
									${isSameMonth(day, monthStart) ? 'bg-white' : 'bg-gray-50'}
									${(isEqual(day, selectedDay) || isToday(day)) && 'font-semibold'}
									${isEqual(day, selectedDay) && 'text-white'}
									${!isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600'}
									${
										!isEqual(day, selectedDay) &&
										isSameMonth(day, monthStart) &&
										!isToday(day) &&
										'text-gray-900'
									}
									${
										!isEqual(day, selectedDay) &&
										!isSameMonth(day, monthStart) &&
										!isToday(day) &&
										'text-gray-500'
									}
									relative cursor-pointer py-2 px-3 text-left hover:bg-gray-100`}
							>
								<time
									dateTime={format(day, 'yyyy-MM-dd')}
									className={`${
										isEqual(day, selectedDay) &&
										'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600'
									}
										${isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600'}
										${isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900'}'ml-auto'`}
								>
									{format(day, 'd')}
								</time>

								{events.filter((event) =>
									isSameDay(event.start_time, day)
								).length > 0 ? (
									<ol className="mt-2 divide-y divide-gray-200">
										{events
											.filter((event) =>
												isSameDay(event.start_time, day)
											)
											.slice(0, 2)
											.map((event) => (
												<Event
													event={event}
													setOpenModal={setOpenModal}
													setEventID={setEventID}
													current_user={userData}
													users={users}
													key={event.id}
												/>
											))}

										{events.filter((event) =>
											isSameDay(event.start_time, day)
										).length > 2 && (
											<li className="text-gray-500">
												+{' '}
												{events.filter((event) =>
													isSameDay(
														event.start_time,
														day
													)
												).length - 2}{' '}
												more
											</li>
										)}
									</ol>
								) : null}
							</div>
						))}
					</div>

					<div className="isolate grid w-full grid-cols-7 gap-px lg:hidden">
						{days.map((day, index) => (
							<button
								key={day.toString()}
								type="button"
								onClick={() => setSelectedDay(day)}
								className={`
									${index === 0 && colStartClasses[getDay(day)]}
									${isSameMonth(day, monthStart) ? 'bg-white' : 'bg-gray-50'}
									${(isEqual(day, selectedDay) || isToday(day)) && 'font-semibold'}
									${isEqual(day, selectedDay) && 'text-white'}
									${!isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600'}
									${
										!isEqual(day, selectedDay) &&
										isSameMonth(day, monthStart) &&
										!isToday(day) &&
										'text-gray-900'
									}
									${
										!isEqual(day, selectedDay) &&
										!isSameMonth(day, monthStart) &&
										!isToday(day) &&
										'text-gray-500'
									}
									flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10`}
							>
								<time
									dateTime={format(day, 'yyyy-MM-dd')}
									className={`${
										isEqual(day, selectedDay) &&
										'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600'
									}
										${isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600'}
										${isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900'}'ml-auto'`}
								>
									{format(day, 'd')}
								</time>

								{events.filter((event) =>
									isSameDay(event.start_time, day)
								).length > 0 && (
									<div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
										{events
											.filter((event) =>
												isSameDay(event.start_time, day)
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
				</div>
			</div>

			{events.filter((event) => isSameDay(event.start_time, selectedDay))
				.length > 0 && (
				<div className="py-10 px-4 sm:px-6">
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
		</>
	);
}
