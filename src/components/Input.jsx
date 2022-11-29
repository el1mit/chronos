import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

export function Input({
	id,
	label,
	type = 'text',
	register,
	validationSchema,
	error = true,
	helperText,
	...props
}) {
	return (
		<div>
			{label ? (
				<label
					htmlFor={id}
					className="mb-2 block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			) : null}

			<div className="relative">
				<input
					id={id}
					type={type}
					{...register(id, validationSchema)}
					className={
						error
							? 'block w-full appearance-none rounded-md border border-red-300 px-3 py-2 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
							: 'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'
					}
					{...props}
				/>
				{error ? (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				) : null}
			</div>

			<p className="mt-2 text-sm text-red-600">{helperText}</p>
		</div>
	);
}
