import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const { VITE_API_URL } = import.meta.env
const Signup = () => {
    const router = useNavigate()
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        terms_conditions_agreement: true
    })

    const handleUsernameChange = (e) => {
        setUser({ ...user, username: e.target.value })
    }

    const handleEmailChange = (e) => {
        setUser({ ...user, email: e.target.value })
    }

    const handleFirstNameChange = (e) => {
        setUser({ ...user, first_name: e.target.value })
    }

    const handleLastNameChange = (e) => {
        setUser({ ...user, last_name: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setUser({ ...user, password: e.target.value })
    }

    const handleConfirmPasswordChange = (e) => {
        setUser({ ...user, confirm_password: e.target.value })
    }

    const handleTermsChange = (e) => {
        setUser({ ...user, terms_conditions_agreement: e.target.value })
        console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${VITE_API_URL}/api/v1/user/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        // if response code is 400, then show error message
        if (response.status === 400) {
            const data = await response.json()
            // General Error Message
            alert("Error: Invalid Input")
        } else {
            const data = await response.json()
            console.log("Registered Successfully")
            router('/Login')
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-1/2 lg:py-0">
                <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Hacker Arcade
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    name="fname"
                                    id="fname"
                                    className={inputClass}
                                    placeholder="name@company.com"
                                    required=""
                                    value={user.first_name}
                                    onChange={handleFirstNameChange}
                                />
                            </div>
                            <div>
                                <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    name="lname"
                                    id="lname"
                                    className={inputClass}
                                    placeholder="name@company.com"
                                    required=""
                                    value={user.last_name}
                                    onChange={handleLastNameChange}
                                />
                            </div>
                            <div>
                                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
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
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={inputClass}
                                    placeholder="name@company.com"
                                    required=""
                                    value={user.email}
                                    onChange={handleEmailChange}
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
                            <div>
                                <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className={inputClass}
                                    required=""
                                    value={user.confirm_password}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                        required=""
                                        value={user.terms_conditions_agreement}
                                        onChange={handleTermsChange}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#"><Link to="/Terms">Terms and Conditions</Link></a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500"><Link to="/Login">Login here</Link></a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup