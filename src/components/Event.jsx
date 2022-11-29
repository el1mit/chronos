import React from 'react';
import { format } from 'date-fns';

export function Event({
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
				<li className="py-2">
					<button onClick={openModal} className="group flex flex-col">
						{users ? (
							users.map((user) => {
								if (user.id === event.creater_id) {
									return (
										<p
											className="h-max w-max flex-auto truncate rounded-lg p-1 font-medium text-white group-hover:shadow-md"
											style={{
												backgroundColor: user.color
											}}
										>
											{event.name}
										</p>
									);
								}
								return null;
							})
						) : (
							<p className="truncate text-base font-medium text-black">
								{event.name}
							</p>
						)}

						<time
							dateTime={format(
								event.start_time,
								'MMM-dd-yyyy kk:mm'
							)}
							className="hidden flex-none text-gray-500 xl:block"
						>
							{format(event.start_time, 'kk:mm')} -{' '}
							{format(event.end_time, 'kk:mm')}
						</time>
					</button>
				</li>
			) : (
				<>
					<li className="py-4">
						<button className="group flex flex-col">
							<p className="h-max w-max flex-auto truncate px-1 font-medium text-black group-hover:text-indigo-600">
								{event.name}
							</p>
						</button>
					</li>
				</>
			)}
		</>
	);
}
