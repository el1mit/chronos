import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postLogin } from '../redux/slices/authSlice.js';
import logo from '../images/logo.jpg';
import { AuthLayout, Input } from '../components';

export function Login() {
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
		const data = await dispatch(postLogin(values));
		console.log(data);
		if (data.error?.message) {
			setError('apiError', {
				type: 'custom',
				message: data.error.message
			});
		} else if ('refreshToken' in data?.payload) {
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
						Sign in to your account
					</h2>

					<div className="mt-2 text-sm text-gray-700">
						<div>
							Don't have account yet?{' '}
							<Link to="/register" className="text-blue-600">
								Register
							</Link>
						</div>
						<div className="mt-2">
							Forget password?{' '}
							<Link
								to="/reset-password"
								className="text-blue-600"
							>
								Reset
							</Link>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
					>
						<Input
							label="Login"
							id="login"
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
								Sign in <span aria-hidden="true">&rarr;</span>
							</button>
							<div className="mt-2 w-full text-center text-sm font-semibold text-red-500">
								{errors.apiError?.message}
							</div>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	);
}
