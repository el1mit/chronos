import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
export function NotFound() {
	return (
		<>
			<div className="flex min-h-full flex-col bg-white pt-16 pb-12">
				<main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
					<div className="flex flex-shrink-0 justify-center">
						<a href="/" className="inline-flex">
							<span className="sr-only">HardWorker</span>
							<img
								className="h-20 w-auto rounded-3xl"
								src={logo}
								alt="Logo"
							/>
						</a>
					</div>
					<div className="py-16">
						<div className="text-center">
							<p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
								404 error
							</p>
							<h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
								Page not found.
							</h1>
							<p className="mt-2 text-base text-gray-500">
								Sorry, we couldn’t find the page you’re looking
								for.
							</p>
							<div className="mt-6">
								<Link
									to="/"
									className="text-base font-medium text-indigo-600 hover:text-indigo-500"
								>
									Go back home
									<span aria-hidden="true"> &rarr;</span>
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
