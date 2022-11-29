import React from 'react';
import clsx from 'clsx';

export function Container({ className, ...props }) {
	return (
		<div
			className={clsx(
				'mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8',
				className
			)}
			{...props}
		/>
	);
}
