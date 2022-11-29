import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ModalCalendar } from './';

export function Table({ calendars, currentUser }) {
	const [openModal, setOpenModal] = React.useState(false);
	const [calendarId, setCalendarId] = React.useState(null);
	const [isEditing, setIsEditing] = React.useState(false);

	const openModalCreation = () => {
		setOpenModal(true);
		setIsEditing(false);
		setCalendarId(null);
	};
	const openModalEditing = (id) => {
		setOpenModal(true);
		setIsEditing(true);
		setCalendarId(id);
	};

	return (
		<Container className="my-4 px-4 sm:px-6 lg:px-8">
			<ModalCalendar
				openModal={openModal}
				setOpenModal={setOpenModal}
				isEditing={isEditing}
				calendarId={calendarId}
			/>

			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">
						Team Calendars
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all team calendars you are a member of
					</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
						onClick={openModalCreation}
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>
						New Calendar
					</button>
				</div>
			</div>
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								Name
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Description
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
							>
								Category
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
								Users / Events count
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
								Your Role
							</th>
							<th
								scope="col"
								className="relative py-3.5 pl-3 pr-4 sm:pr-6"
							>
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{calendars.length
							? calendars.map((calendar, index) => (
									<tr
										key={index}
										className={
											index % 2 === 0
												? undefined
												: 'bg-gray-50'
										}
									>
										<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
											<Link
												to={`/calendars/${calendar.id}`}
											>
												{calendar.name}
											</Link>
											<dl className="font-normal lg:hidden">
												<dd className="mt-1 truncate text-gray-700">
													{calendar.description
														? calendar.description
														: 'No description'}
												</dd>
												<dd className="mt-1 truncate text-gray-500 sm:hidden">
													{calendar.calegory}
												</dd>
											</dl>
										</td>
										<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
											{calendar.description
												? calendar.description
												: 'No description'}
										</td>
										<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
											{calendar.calegory}
										</td>
										<td className="px-3 py-4 text-sm text-gray-500">
											{calendar.users.length} users /{' '}
											{calendar.events.length} events
										</td>
										<td className="px-3 py-4 text-sm text-gray-500">
											{calendar.users.map((user) => {
												if (
													user.id === currentUser.id
												) {
													return user.role;
												}
												return null;
											})}
										</td>
										<td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
											{calendar.users.map((user) => {
												if (
													user.id ===
														currentUser.id &&
													user.role === 'owner'
												) {
													return (
														<button
															onClick={() => {
																openModalEditing(
																	calendar.id
																);
															}}
															className="text-indigo-600 hover:text-indigo-900"
														>
															Edit
														</button>
													);
												}
												return null;
											})}
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
		</Container>
	);
}
