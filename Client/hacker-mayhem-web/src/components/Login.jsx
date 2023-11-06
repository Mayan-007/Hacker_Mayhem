import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const { VITE_API_URL } = import.meta.env

const Login = () => {
	const router = useNavigate()
	const [user, setUser] = useState({
		username: '',
		password: ''
	})

	const handleUsernameChange = (e) => {
		setUser({ ...user, username: e.target.value })
	}

	const handlePasswordChange = (e) => {
		setUser({ ...user, password: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch(`${VITE_API_URL}/api/v1/user/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        // if response code is 400, then show error message
        if (response.status !== 200) {
            const data = await response.json()
            alert("Error: " + data.error)
        } else {
            const data = await response.json()
			localStorage.setItem('token', data.token)
            console.log("Logged In Successfully")
			router('/Labs')
        }
	}

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
						<img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
						Hacker Arcade
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<div>
									<label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username or Email</label>
									<input
										type="text"
										name="username"
										id="username"
										className={inputClass}
										placeholder="name@company.com"
										required=""
										value={user.username}
										onChange={handleUsernameChange}
									/>
								</div>
								<div>
									<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className={inputClass}
										required=""
										value={user.password}
										onChange={handlePasswordChange}
									/>
								</div>
								<div className="flex items-center justify-between">
									<a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
								</div>
								<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500"><Link to="/Signup">Sign up</Link></a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login