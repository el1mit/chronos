import React from 'react';
import { format } from 'date-fns';

import { ClockIcon } from '@heroicons/react/solid';

export function FullEvent({
	event,
	setOpenModal,
	setEventID,
	current_user,
	users
}) {
	function openModal() {
		if (event.creater_id === current_user.id) {
			setEventID(event.id);
			setOpenModal(true);
		}
	}

	return (
		<>
			{event.type !== 'holiday' ? (
				<li className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
					<div className="flex-auto">
						{users ? (
							users.map((user) => {
								if (user.id === event.creater_id) {
									return (
										<>
											<p
												className="h-max w-max rounded-lg px-1 font-semibold text-white"
												style={{
													backgroundColor: user.color
												}}
											>
												{event.name}
											</p>
											<div className="flex flex-row flex-wrap gap-1">
												<div>{user.firstname}</div>
												<div>{user.lastname}</div>
												<div className="text-gray-500">
													({user.login})
												</div>
											</div>
										</>
									);
								}
								return null;
							})
						) : (
							<p className="mx-1 text-base font-semibold">
								{event.name}
							</p>
						)}

						<time
							dateTime={format(event.start_time, 'yyyy-MM-dd')}
							className="mt-2 flex items-center text-gray-700"
						>
							{event.type !== 'holiday' ? (
								<>
									<ClockIcon
										className="mr-2 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									{format(event.start_time, 'kk:mm:ss')} -{' '}
									{format(event.end_time, 'kk:mm:ss')}
								</>
							) : null}
						</time>
					</div>

					{event.type !== 'holiday' &&
					event.creater_id === current_user.id ? (
						<button
							onClick={openModal}
							className="ml-6 flex-none self-center rounded-md border border-transparent bg-indigo-600 py-2 px-3 font-semibold text-white opacity-100 shadow-sm hover:bg-indigo-700 group-hover:opacity-100"
						>
							Edit
						</button>
					) : null}
				</li>
			) : (
				<li className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
					<div className="flex-auto">
						<p className=" h-max w-max px-1 font-semibold">
							{event.name}
						</p>
					</div>
				</li>
			)}
		</>
	);
}
