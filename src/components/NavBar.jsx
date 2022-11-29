import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline';
import logo from '../images/logo.jpg';
import { logout } from '../redux/slices/authSlice.js';
import { Container } from './';

export function NavBar({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem('token');
		// handleClose();
		navigate('/');
	};

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<Container>
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="-ml-2 mr-2 flex items-center md:hidden">
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										{open ? (
											<XIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<MenuIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>

								<Link
									to="/"
									className="flex flex-shrink-0 flex-row items-center justify-center"
								>
									<img
										src={logo}
										alt="logo"
										className="mr-2 h-10 w-auto rounded-xl"
									/>
									<span className="text-xl font-extrabold tracking-wider">
										HardWorker
									</span>
								</Link>

								<div className=" hidden text-center text-sm font-medium text-gray-500 md:ml-6 md:flex md:space-x-8">
									<Link
										to="/"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 hover:border-gray-300 hover:text-gray-700"
									>
										Personal Calendar
									</Link>
									<Link
										to="/calendars"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 hover:border-gray-300 hover:text-gray-700"
									>
										Team Calendars
									</Link>
									<Link
										to="/holidays-calendar"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 hover:border-gray-300 hover:text-gray-700"
									>
										Holidays
									</Link>
								</div>
							</div>

							<div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
								<div className="flex flex-row flex-wrap items-center gap-4">
									<div className="flex flex-col text-sm font-medium">
										<div className="flex flex-row flex-wrap gap-1">
											<div>{user.firstname}</div>
											<div>{user.lastname}</div>
											<div className="text-gray-500">
												({user.login})
											</div>
										</div>
										<div className="text-gray-500">
											{user.email}
										</div>
									</div>

									<LogoutIcon
										onClick={onClickLogout}
										className="block h-6 w-6 cursor-pointer hover:text-gray-700"
										aria-hidden="true"
									/>
								</div>
							</div>
						</div>
					</Container>

					<Disclosure.Panel className="md:hidden">
						<div className="space-y-1 pt-2 pb-3">
							<Disclosure.Button className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								<Link to="/">Personal Calendar</Link>
							</Disclosure.Button>
							<Disclosure.Button className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								<Link to="/calendars">Team Calendars</Link>
							</Disclosure.Button>
							<Disclosure.Button className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								<Link to="/holidays-calendar">Holidays</Link>
							</Disclosure.Button>
						</div>

						<div className="border-t border-gray-200 pt-4 pb-3">
							<div className="flex items-center px-4 sm:px-6">
								<div className="text-base font-medium text-gray-800">
									<div className="flex flex-row flex-wrap gap-1">
										<div>{user.firstname}</div>
										<div>{user.lastname}</div>
									</div>

									<div className="text-gray-500">
										{user.login}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{user.email}
									</div>
								</div>
							</div>

							<div className="mt-3 space-y-1">
								<Disclosure.Button
									onClick={onClickLogout}
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
								>
									Sign out
								</Disclosure.Button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
