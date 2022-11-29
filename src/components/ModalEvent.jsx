import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import axios from '../axios';
import { Dialog, Transition } from '@headlessui/react';
import 'react-datepicker/dist/react-datepicker.css';

export function ModalEvent({
	openModal = false,
	setOpenModal,
	isEditing = false,
	eventId = null
}) {
	let { id } = useParams();
	const userData = useSelector((state) => state.auth.data);
	id = id || userData.own_calendars[0];
	const [eventName, setEventName] = React.useState('');
	const [startTime, setStartTime] = React.useState(new Date());
	const [endTime, setEndTime] = React.useState(new Date());

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					`calendars/${id}/events/${eventId}`
				);
				console.log(data);

				setEventName(data.name);
				setStartTime(data.start_time);
				setEndTime(data.end_time);
			} catch (error) {
				console.error(error.message);
			}
		};

		if (isEditing) {
			fetchData();
		}
	}, [isEditing, eventId, id]);

	const sendData = async () => {
		try {
			const payload = {
				name: eventName,
				start_time: Date.parse(startTime),
				end_time: Date.parse(endTime)
			};

			if (isEditing) {
				await axios.patch(
					`/calendars/${id}/events/${eventId}`,
					payload
				);
			} else {
				await axios.post(`/calendars/${id}/events/`, payload);
			}

			setOpenModal(false);
		} catch (err) {
			console.warn(err);
		}
	};

	const deleteEvent = async () => {
		await axios.delete(`/calendars/${id}/events/${eventId}`);
	};

	return (
		<Transition appear show={openModal} as={React.Fragment}>
			<Dialog
				as="div"
				className="relative z-20"
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
							<Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									{isEditing
										? 'Event Editing'
										: 'New Event Creation'}
								</Dialog.Title>
								<p className="mt-2 text-sm text-gray-500">
									Input data about event, including event
									name, dete of start and end
								</p>
								<div className="my-2">
									<form>
										<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
											<div className="sm:col-span-6">
												<label
													htmlFor="name"
													className="block text-sm font-medium text-gray-700"
												>
													Name
												</label>
												<div className="mt-1">
													<input
														id="Name"
														name="Name"
														type="text"
														value={eventName}
														onChange={(e) =>
															setEventName(
																e.target.value
															)
														}
														required
														className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>

											<div className="sm:col-span-6">
												<label
													htmlFor="start-time"
													className="block text-sm font-medium text-gray-700"
												>
													Start time
												</label>
												<div className="mt-1">
													<DatePicker
														selected={startTime}
														onChange={(date) =>
															setStartTime(date)
														}
														locale={enGB}
														showTimeSelect
														timeIntervals={15}
														dateFormat="Pp"
														className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>

											<div className="sm:col-span-6">
												<label
													htmlFor="end-time"
													className="block text-sm font-medium text-gray-700"
												>
													End time
												</label>
												<div className="mt-1">
													<DatePicker
														selected={endTime}
														onChange={(date) =>
															setEndTime(date)
														}
														locale={enGB}
														showTimeSelect
														timeIntervals={15}
														dateFormat="Pp"
														className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
														? 'Edit Event'
														: 'Create Event'}
												</button>
												{isEditing ? (
													<button
														type="submit"
														onClick={deleteEvent}
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
