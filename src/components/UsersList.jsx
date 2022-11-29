import React from 'react';
import { ModalUser } from './';

export function UsersList({ users, currentUser }) {
	const [openModal, setOpenModal] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [userId, setUserId] = React.useState('');
	const [userRole, setUserRole] = React.useState('');
	const [userColor, setUserColor] = React.useState('');

	function sendInvite() {
		setIsEditing(false);
		setOpenModal(true);
	}

	function editUser(id, role, color) {
		setUserId(id);
		setUserRole(role);
		setUserColor(color);
		setIsEditing(true);
		setOpenModal(true);
	}

	return (
		<div className="flex flex-col items-center">
			<ModalUser
				openModal={openModal}
				setOpenModal={setOpenModal}
				isEditing={isEditing}
				userId={userId}
				userColor={userColor}
				userRole={userRole}
			/>
			<ul className="mt-14 divide-y divide-gray-200">
				{users.map((user) => (
					<li key={user.id} className="flex py-4">
						<div className="flex flex-col text-sm font-medium">
							<div className="flex flex-row flex-wrap gap-1">
								<div>{user.firstname}</div>
								<div>{user.lastname}</div>
								<div className="text-gray-500">
									({user.login})
								</div>
							</div>
							<div className="text-gray-500">{user.email}</div>
							<div className="text-gray-500">{user.role}</div>
							<div className="mb-1 flex">
								Color:{' '}
								<div
									className="h-6 w-20 rounded-lg"
									style={{ backgroundColor: user.color }}
								></div>
							</div>
							{users.map((useri) => {
								if (
									useri.role === 'owner' &&
									useri.id === currentUser.id
								) {
									return (
										<button
											type="submit"
											onClick={() => {
												editUser(
													user.id,
													user.role,
													user.color
												);
											}}
											className="m-auto w-2/3 rounded-md border border-transparent bg-indigo-600 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
										>
											Edit User
										</button>
									);
								}
								return null;
							})}
						</div>
					</li>
				))}
			</ul>

			{users.map((user) => {
				if (user.role === 'owner' && user.id === currentUser.id) {
					return (
						<button
							type="submit"
							onClick={sendInvite}
							className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Invite User
						</button>
					);
				}
				return null;
			})}
		</div>
	);
}
