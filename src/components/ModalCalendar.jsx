import React from 'react';
import axios from '../axios';
import { Dialog, Transition } from '@headlessui/react';
import 'react-datepicker/dist/react-datepicker.css';

export function ModalCalendar({
	openModal = false,
	setOpenModal,
	isEditing = false,
	calendarId = null
}) {
	const [calendarName, setCalendarName] = React.useState('');
	const [category, setCategory] = React.useState('task');
	const [description, setDescription] = React.useState('');

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`/calendars/${calendarId}/`);
				console.log(data);

				setCalendarName(data.calendar.name);
				setCategory(data.calendar.calegory);
				setDescription(data.calendar.description || '');
			} catch (error) {
				console.error(error.message);
			}
		};

		if (isEditing) {
			fetchData();
		}
	}, [isEditing, calendarId]);

	const sendData = async () => {
		try {
			const payload = {
				name: calendarName,
				category,
				description
			};

			if (isEditing) {
				await axios.patch(`/calendars/${calendarId}`, payload);
			} else {
				await axios.post(`/calendars`, payload);
			}

			setOpenModal(false);
		} catch (err) {
			console.warn(err);
		}
	};

	const deleteCalendar = async () => {
		await axios.delete(`/calendars/${calendarId}`);
	};

	return (
		<Transition appear show={openModal} as={React.Fragment}>
			<Dialog
				as="div"
				className="relative z-30"
				onClose={() => setOpenModal(false)}
			>
				<Transition.Child
					as={React.Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									{isEditing
										? 'Calendar Editing'
										: 'New Calendar Creation'}
								</Dialog.Title>
								<p className="mt-2 text-sm text-gray-500">
									Input data about calendar, including
									calendar name, category of calendar and
									description (optional)
								</p>
								<div className="my-2">
									<form>
										<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
											<div className="sm:col-span-6">
												<label
													htmlFor="Name"
													className="block text-sm font-medium text-gray-700"
												>
													Name
												</label>
												<div className="mt-1">
													<input
														id="name"
														name="name"
														type="text"
														required
														value={calendarName}
														onChange={(e) =>
															setCalendarName(
																e.target.value
															)
														}
														className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>

											<div className="sm:col-span-6">
												<label
													htmlFor="category"
													className="block text-sm font-medium text-gray-700"
												>
													Category
												</label>
												<div className="mt-1">
													<select
														id="category"
														name="category"
														required
														value={category}
														onChange={(e) =>
															setCategory(
																e.target.value
															)
														}
														className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													>
														<option>task</option>
														<option>
															arrangement
														</option>
														<option>
															reminder
														</option>
													</select>
												</div>
											</div>

											<div className="sm:col-span-6">
												<label
													htmlFor="description"
													className="block text-sm font-medium text-gray-700"
												>
													Description{' '}
													<span className="text-gray-400">
														(optional)
													</span>
												</label>
												<div className="mt-1">
													<textarea
														id="description"
														name="description"
														rows={3}
														value={description}
														onChange={(e) =>
															setDescription(
																e.target.value
															)
														}
														className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										</div>

										<div className="pt-10">
											<div className="flex justify-end">
												<button
													type="button"
													onClick={() =>
														setOpenModal(false)
													}
													className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
												>
													Cancel
												</button>
												<button
													type="submit"
													onClick={sendData}
													className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
												>
													{isEditing
														? 'Edit Calendar'
														: 'Create Calendar'}
												</button>

												{isEditing ? (
													<button
														type="submit"
														onClick={deleteCalendar}
														className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
													>
														Delete
													</button>
												) : null}
											</div>
										</div>
									</form>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
