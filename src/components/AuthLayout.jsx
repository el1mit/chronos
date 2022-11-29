import React from 'react';
import backgroundImage from '../images/background-auth.jpg';

export function AuthLayout({ children }) {
	return (
		<>
			<div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
				<div className="absolute z-10 flex min-h-full flex-1 flex-col justify-center bg-white py-12 px-4 shadow-2xl md:flex-none md:px-28">
					<div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
						{children}
					</div>
				</div>
				<div className="hidden sm:contents lg:relative lg:block lg:flex-1">
					<img
						src={backgroundImage}
						alt=""
						className="absolute inset-0 h-full w-full object-cover"
						layout="fill"
					/>
				</div>
			</div>
		</>
	);
}
