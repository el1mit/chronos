import React from 'react';
import { useSelector } from 'react-redux';
import {
	startOfToday,
	format,
	eachDayOfInterval,
	startOfWeek,
	endOfWeek,
	isSameWeek,
	isEqual,
	getDay,
	isSameDay,
	differenceInMinutes
} from 'date-fns';
import { ModalEvent } from './';

export function CalendarWeek({ weekStart, events, users }) {
	const container = React.useRef(null);
	const containerNav = React.useRef(null);
	const containerOffset = React.useRef(null);

	const userData = useSelector((state) => state.auth.data);
	const [openModal, setOpenModal] = React.useState(false);
	const [eventId, setEventID] = React.useState();

	React.useEffect(() => {
		const currentMinute = new Date().getHours() * 60;
		container.current.scrollTop =
			((container.current.scrollHeight -
				containerNav.current.offsetHeight -
				containerOffset.current.offsetHeight) *
				currentMinute) /
			1440;
	}, []);

	let today = startOfToday();
	const [selectedDay, setSelectedDay] = React.useState(today);

	let days = eachDayOfInterval({
		start: startOfWeek(weekStart, { weekStartsOn: 1 }),
		end: endOfWeek(weekStart, { weekStartsOn: 1 })
	});

	function calcMinutes(event) {
		return differenceInMinutes(event.end_time, event.start_time) * 0.2;
	}

	function calcStartHOurs(start) {
		return (Number(format(start, 'k')) + format(start, 'm') / 60) * 12 + 2;
	}

	let colStartClasses = [
		'col-start-7',
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6'
	];

	function open(event) {
		if (event.creater_id === userData.id) {
			setEventID(event.id);
			setOpenModal(true);
		}
	}

	return (
		<>
			<div
				ref={container}
				className="flex flex-auto flex-col overflow-auto bg-white shadow ring-1 ring-black ring-opacity-5"
			>
				<ModalEvent
					openModal={openModal}
					setOpenModal={setOpenModal}
					isEditing={true}
					eventId={eventId}
				/>

				<div
					style={{ width: '165%' }}
					className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
				>
					<div
						ref={containerNav}
						className="sticky top-0 z-10 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-4"
					>
						<div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
							{days.map((day) => (
								<button
									key={day}
									type="button"
									onClick={() => setSelectedDay(day)}
									className="flex flex-col items-center pt-2 pb-3"
								>
									{format(day, 'EEEEE')}{' '}
									<span
										className={`${
											isEqual(day, selectedDay)
												? 'mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
												: 'mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'
										}`}
									>
										{format(day, 'dd')}
									</span>
								</button>
							))}
						</div>

						<div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
							<div className="col-end-1 w-14" />
							{days.map((day) => (
								<div className="flex items-center justify-center py-3">
									<span
										className={`${
											isSameDay(day, today)
												? 'flex items-baseline'
												: ''
										}`}
									>
										{format(day, 'E')}{' '}
										<span
											className={`${
												isSameDay(day, today)
													? 'ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
													: 'items-center justify-center font-semibold text-gray-900'
											}`}
										>
											{format(day, 'dd')}
										</span>
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex flex-auto">
						<div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
						<div className="grid flex-auto grid-cols-1 grid-rows-1">
							<div
								className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
								style={{
									gridTemplateRows:
										'repeat(48, minmax(3.5rem, 1fr))'
								}}
							>
								<div
									ref={containerOffset}
									className="row-end-1 h-7"
								></div>
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										24
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										1
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										2
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										3
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										4
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										5
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										6
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										7
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										8
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										9
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										10
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										11
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										12
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										13
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										14
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										15
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										16
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										17
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										18
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										19
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										20
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										21
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										22
									</div>
								</div>
								<div />
								<div>
									<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
										23
									</div>
								</div>
								<div />
							</div>

							<div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
								<div className="col-start-1 row-span-full" />
								<div className="col-start-2 row-span-full" />
								<div className="col-start-3 row-span-full" />
								<div className="col-start-4 row-span-full" />
								<div className="col-start-5 row-span-full" />
								<div className="col-start-6 row-span-full" />
								<div className="col-start-7 row-span-full" />
								<div className="col-start-8 row-span-full w-4" />
							</div>

							<ol
								className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-4"
								style={{
									gridTemplateRows:
										'1.75rem repeat(288, minmax(0, 1fr)) auto'
								}}
							>
								{events
									.filter((event) =>
										isSameWeek(
											event.start_time,
											weekStart,
											{ weekStartsOn: 1 }
										)
									)
									.map((event) => {
										if (event.type !== 'holiday') {
											return (
												<li
													className={`${
														colStartClasses[
															getDay(
																event.start_time
															)
														]
													} relative mt-px flex`}
													style={{
														gridRow: `${calcStartHOurs(
															event.start_time
														)} / span ${calcMinutes(
															event
														)}`
													}}
												>
													{users ? (
														users.map((user) =>
															user.id ===
															event.creater_id ? (
																<button
																	onClick={() =>
																		open(
																			event
																		)
																	}
																	className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-left text-sm leading-5 text-white hover:shadow-md"
																	style={{
																		backgroundColor:
																			user.color
																	}}
																>
																	<p className="order-1 font-semibold">
																		{
																			event.name
																		}
																	</p>
																	<p>
																		<time
																			dateTime={format(
																				event.start_time,
																				'MMM-dd-yyyy kk:mm:ss'
																			)}
																		>
																			{format(
																				event.start_time,
																				'kk:mm'
																			)}{' '}
																			-{' '}
																			{format(
																				event.end_time,
																				'kk:mm'
																			)}
																		</time>
																	</p>
																</button>
															) : null
														)
													) : (
														<button
															onClick={() =>
																open(event)
															}
															className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-700 p-2 text-left text-sm leading-5 text-white hover:shadow-md"
														>
															<p className="order-1 font-semibold">
																{event.name}
															</p>
															<p>
																<time
																	dateTime={format(
																		event.start_time,
																		'MMM-dd-yyyy kk:mm:ss'
																	)}
																>
																	{format(
																		event.start_time,
																		'kk:mm'
																	)}{' '}
																	-{' '}
																	{format(
																		event.end_time,
																		'kk:mm'
																	)}
																</time>
															</p>
														</button>
													)}
												</li>
											);
										}
										return (
											<li
												className={`${
													colStartClasses[
														getDay(event.start_time)
													]
												} relative mt-px flex`}
												style={{
													gridRow: '4 / span 288'
												}}
											>
												<div className="absolute inset-1 flex flex-col items-center justify-center overflow-y-auto rounded-lg bg-blue-100 p-2 text-center text-2xl leading-5 hover:bg-blue-200">
													<p className="order-1 font-semibold text-blue-700 ">
														{event.name}
													</p>
												</div>
											</li>
										);
									})}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
