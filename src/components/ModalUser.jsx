import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { Dialog, Transition } from '@headlessui/react';

export function ModalUser({
	openModal = false,
	setOpenModal,
	isEditing = false,
	userId = '',
	userColor = '',
	userRole = ''
}) {
	let { id } = useParams();
	const [email, setEmail] = React.useState('');
	const [role, setRole] = React.useState('');
	const [color, setColor] = React.useState('');

	React.useEffect(() => {
		if (isEditing) {
			setRole(userRole);
			setColor(rgbToHEX(userColor));
		}
	}, [isEditing, userRole, userColor]);

	function rgbToHEX(rgb) {
		let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
		rgb = rgb.substr(4).split(')')[0].split(sep);

		let r = (+rgb[0]).toString(16),
			g = (+rgb[1]).toString(16),
			b = (+rgb[2]).toString(16);

		if (r.length === 1) r = '0' + r;
		if (g.length === 1) g = '0' + g;
		if (b.length === 1) b = '0' + b;

		return '#' + r + g + b;
	}

	async function hexToRGB(hex) {
		const r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}

	const sendData = async () => {
		try {
			if (isEditing) {
				setColor(await hexToRGB(color));
				const payload = {
					role: role,
					color: color
				};
				await axios.patch(`/calendars/${id}/user/${userId}`, payload);
			} else {
				const payload = {
					email: email,
					calendar_id: id
				};
				await axios.post(`/calendars/invite`, payload);
			}

			setOpenModal(false);
		} catch (err) {
			console.warn(err);
		}
	};

	const deleteUser = async () => {
		await axios.delete(`/calendars/${id}/user/${userId}`);
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
										? 'Edit User Data'
										: 'Invite User'}
								</Dialog.Title>
								<p className="mt-2 text-sm text-gray-500">
									{isEditing
										? 'Change user role or color'
										: 'Input email of user you want to invite'}
								</p>
								<div className="my-2">
									<form>
										<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
											{isEditing ? (
												<>
													<div className="sm:col-span-6">
														<label
															htmlFor="role"
															className="block text-sm font-medium text-gray-700"
														>
															Role
														</label>
														<div className="mt-1">
															<select
																id="role"
																name="role"
																value={role}
																onChange={(e) =>
																	setRole(
																		e.target
																			.value
																	)
																}
																className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															>
																<option>
																	user
																</option>
																<option>
																	admin
																</option>
																<option>
																	owner
																</option>
															</select>
														</div>
													</div>

													<div className="sm:col-span-6">
														<label
															htmlFor="color"
															className="block text-sm font-medium text-gray-700"
														>
															Color
														</label>
														<div className="mt-1">
															<input
																id="color"
																name="color"
																type="text"
																value={color}
																onChange={(e) =>
																	setColor(
																		e.target
																			.value
																	)
																}
																className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															/>
														</div>
														<HexColorPicker
															color={color}
															onChange={setColor}
															className="mt-3"
														/>
													</div>
												</>
											) : (
												<>
													<div className="sm:col-span-6">
														<label
															htmlFor="email"
															className="block text-sm font-medium text-gray-700"
														>
															Email
														</label>
														<div className="mt-1">
															<input
																id="email"
																name="email"
																type="email"
																value={email}
																onChange={(e) =>
																	setEmail(
																		e.target
																			.value
																	)
																}
																required
																className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															/>
														</div>
													</div>
												</>
											)}
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
														? 'Edit User'
														: 'Invite User'}
												</button>
												{isEditing ? (
													<button
														type="submit"
														onClick={deleteUser}
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
