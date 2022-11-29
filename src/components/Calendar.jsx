import React from 'react';
import { startOfToday, format, getWeekOfMonth, add } from 'date-fns';

import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DotsHorizontalIcon
} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { Container } from './Container';
import {
	CalendarMonth,
	CalendarWeek,
	CalendarYear,
	ModalEvent,
	UsersList
} from '.';

export function Calendar({ calendarEvents, users = null, currentUser = null }) {
	let today = startOfToday();

	const [view, setView] = React.useState('Month view');
	const [currentDay, setCurrentDay] = React.useState(today);
	const [openModal, setOpenModal] = React.useState(false);

	let firstDayCurrent = currentDay;

	function next() {
		if (view === 'Week view') {
			let firstDayNext = add(firstDayCurrent, { weeks: 1 });
			setCurrentDay(firstDayNext);
		} else if (view === 'Month view') {
			let firstDayNext = add(firstDayCurrent, { months: 1 });
			setCurrentDay(firstDayNext);
		} else if (view === 'Year view') {
			let firstDayNext = add(firstDayCurrent, { years: 1 });
			setCurrentDay(firstDayNext);
		}
	}

	function previous() {
		if (view === 'Week view') {
			let firstDayNext = add(firstDayCurrent, { weeks: -1 });
			setCurrentDay(firstDayNext);
		} else if (view === 'Month view') {
			let firstDayNext = add(firstDayCurrent, { months: -1 });
			setCurrentDay(firstDayNext);
		} else if (view === 'Year view') {
			let firstDayNext = add(firstDayCurrent, { years: -1 });
			setCurrentDay(firstDayNext);
		}
	}

	function current() {
		setCurrentDay(today);
	}

	return (
		<Container className="lg:flex lg:h-full lg:flex-col">
			<div className="flex h-full flex-row flex-wrap gap-4">
				{users ? (
					<UsersList users={users} currentUser={currentUser} />
				) : null}
				<div className="flex flex-1 flex-col">
					<header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
						<h1 className="text-lg font-semibold text-gray-900">
							<time dateTime={format(today, 'MMMM yyyy')}>
								{view === 'Week view' ? (
									<>
										{getWeekOfMonth(firstDayCurrent, {
											weekStartsOn: 1
										})}{' '}
										week of{' '}
										{format(firstDayCurrent, 'MMMM yyyy')}
									</>
								) : null}
								{view === 'Month view'
									? format(firstDayCurrent, 'MMMM yyyy')
									: null}
								{view === 'Year view'
									? format(firstDayCurrent, 'yyyy')
									: null}
							</time>
						</h1>

						<div className="flex items-center">
							<div className="flex items-center rounded-md shadow-sm md:items-stretch">
								<button
									type="button"
									onClick={previous}
									className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
								>
									<ChevronLeftIcon
										className="h-5 w-5"
										aria-hidden="true"
									/>
								</button>

								<button
									type="button"
									onClick={current}
									className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
								>
									Today
								</button>

								<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

								<button
									type="button"
									onClick={next}
									className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
								>
									<ChevronRightIcon
										className="h-5 w-5"
										aria-hidden="true"
									/>
								</button>
							</div>

							<div className="hidden md:ml-4 md:flex md:items-center">
								<Menu as="div" className="relative">
									<Menu.Button
										type="button"
										className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
									>
										{view}
										<ChevronDownIcon
											className="ml-2 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</Menu.Button>

									<Transition
										as={React.Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Week view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block w-full px-4 py-2 text-sm`}
													>
														Week view
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Month view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block w-full px-4 py-2 text-sm`}
													>
														Month view
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Year view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block w-full px-4 py-2 text-sm`}
													>
														Year view
													</button>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
								{calendarEvents[0]?.type !== 'holiday' ? (
									<button
										type="button"
										onClick={() => setOpenModal(true)}
										className="ml-4 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Add event
									</button>
								) : null}
							</div>

							<ModalEvent
								openModal={openModal}
								setOpenModal={setOpenModal}
							/>

							<Menu as="div" className="relative ml-6 md:hidden">
								<Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
									<DotsHorizontalIcon
										className="h-5 w-5"
										aria-hidden="true"
									/>
								</Menu.Button>

								<Transition
									as={React.Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														onClick={() =>
															setOpenModal(true)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block px-4 py-2 text-sm`}
													>
														Add event
													</button>
												)}
											</Menu.Item>
										</div>
										<div className="py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														onClick={current}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block px-4 py-2 text-sm`}
													>
														Go to today
													</button>
												)}
											</Menu.Item>
										</div>
										<div className="py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Week view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block px-4 py-2 text-sm`}
													>
														Week view
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Month view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block px-4 py-2 text-sm`}
													>
														Month view
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														value="Year view"
														onClick={(e) =>
															setView(
																e.target.value
															)
														}
														className={`${
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700'
														} block px-4 py-2 text-sm`}
													>
														Year view
													</button>
												)}
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</header>
					{view === 'Week view' ? (
						<CalendarWeek
							weekStart={firstDayCurrent}
							events={calendarEvents}
							users={users}
						/>
					) : null}
					{view === 'Month view' ? (
						<CalendarMonth
							monthStart={firstDayCurrent}
							events={calendarEvents}
							users={users}
						/>
					) : null}
					{view === 'Year view' ? (
						<CalendarYear
							yearStart={firstDayCurrent}
							events={calendarEvents}
							users={users}
						/>
					) : null}
				</div>
			</div>
		</Container>
	);
}
