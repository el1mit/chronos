import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postRegister } from '../redux/slices/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { AuthLayout, Input } from '../components';

export function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isValid }
	} = useForm({
		mode: 'onSubmit'
	});

	const onSubmit = async (values) => {
		const data = await dispatch(postRegister(values));

		if (data.error?.message) {
			setError('apiError', {
				type: 'custom',
				message: data.error.message
			});
		} else if (data.type === 'auth/postRegister/fulfilled') {
			window.localStorage.setItem('token', data.payload.refreshToken);
			navigate('/');
		}
	};

	return (
		<>
			<AuthLayout>
				<div className="flex flex-col items-start justify-start">
					<Link
						to="/"
						className="flex flex-shrink-0 flex-row items-center justify-center"
					>
						<img
							src={logo}
							alt="logo"
							className="mr-2 h-12 w-auto rounded-xl"
						/>
						<span className="text-2xl font-extrabold tracking-wider">
							HardWorker
						</span>
					</Link>

					<h2 className="mt-10 text-lg font-semibold text-gray-900">
						Create new account
					</h2>
					<span className="mt-2 text-sm text-gray-700">
						Already have an account?{' '}
						<Link to="/login" className="text-blue-600">
							Login
						</Link>
					</span>
				</div>

				<div className="mt-6">
					<div className="mt-6">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-6">
								<Input
									id="firstname"
									label="First name"
									type="text"
									error={Boolean(errors?.firstname)}
									helperText={errors.firstname?.message}
									register={register}
									validationSchema={{
										required: 'Enter your first name',
										minLength: {
											value: 1,
											message:
												'First name must be from 1 to 12 characters'
										},
										maxLength: {
											value: 12,
											message:
												'First name must be from 1 to 12 characters'
										}
									}}
									name="firstname"
								/>
								<Input
									id="lastname"
									label="Last name"
									type="text"
									error={Boolean(errors?.lastname)}
									helperText={errors.lastname?.message}
									register={register}
									validationSchema={{
										required: 'Enter your last name',
										minLength: {
											value: 1,
											message:
												'Last name must be from 1 to 12 characters'
										},
										maxLength: {
											value: 12,
											message:
												'Last name must be from 1 to 12 characters'
										}
									}}
									name="lastname"
								/>
							</div>
							<Input
								id="login"
								label="Login"
								type="login"
								error={Boolean(errors?.login)}
								helperText={errors.login?.message}
								register={register}
								validationSchema={{
									required: 'Enter login',
									minLength: {
										value: 6,
										message:
											'Login must be from 6 to 12 characters'
									},
									maxLength: {
										value: 12,
										message:
											'Login must be from 6 to 12 characters'
									},
									pattern: {
										value: /^\S*$/,
										message: "Whitespaces aren't allowed"
									}
								}}
								name="login"
							/>
							<Input
								id="email"
								label="Email address"
								type="email"
								error={Boolean(errors?.email)}
								helperText={errors.email?.message}
								register={register}
								validationSchema={{
									required: 'Enter email',
									minLength: {
										value: 4,
										message:
											'Email must be at least 4 characters'
									},
									pattern: {
										value: /^\S*$/,
										message: "Whitespaces aren't allowed"
									}
								}}
								name="email"
							/>
							<Input
								id="password"
								label="Password"
								type="password"
								error={Boolean(errors?.password)}
								helperText={errors.password?.message}
								register={register}
								validationSchema={{
									required: 'Enter password',
									minLength: {
										value: 6,
										message:
											'Password must be from 6 to 12 characters'
									},
									maxLength: {
										value: 12,
										message:
											'Password must be from 6 to 12 characters'
									},
									pattern: {
										value: /^\S*$/,
										message: "Whitespaces aren't allowed"
									}
								}}
								name="password"
							/>
							<div className="pt-1">
								<button
									disabled={!isValid}
									onClick={() => clearErrors()}
									type="submit"
									className="w-full rounded-full border border-transparent bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								>
									Sign up{' '}
									<span aria-hidden="true">&rarr;</span>
								</button>
								<div className=" mt-2 w-full text-sm font-semibold text-red-500">
									{errors.apiError?.message}
								</div>
							</div>
						</form>
					</div>
				</div>
			</AuthLayout>
		</>
	);
}
