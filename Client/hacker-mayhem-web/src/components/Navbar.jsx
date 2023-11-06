import { useState } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
const { VITE_API_URL } = import.meta.env

const Navbar = () => {
	const [active, setActive] = useState("Home");
	const [toggle, setToggle] = useState(false);

	const [username, setUsername] = useState("")

	const [token, setToken] = useState()

	const getUser = async () => {
		const response = await fetch(`${VITE_API_URL}/api/v1/user/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
		})
		if (response.status !== 200) {
			const data = await response.json()
			alert("Error: " + data.detail)
		} else {
			const data = await response.json()
			setUsername(data.username)
			console.log(data)
		}
	}

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (localStorage.getItem('token')) {
			getUser()
		} else {
			console.log("Not Logged In")
		}
	}, [])

	const handleLogout = async () => {
		const response = await fetch(`${VITE_API_URL}/api/v1/user/logout/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
		})
		if (response.status !== 200) {
			const data = await response.json()
			alert("Error: " + data.detail)
		} else {
			const data = await response.json()
			console.log(data.message)
			localStorage.removeItem('token')
			setToken(null)
			console.log("Logged Out Successfully")
		}
	}

	return (
		<nav className="w-full flex py-6 justify-between items-center navbar">
			{/* <img src={logo} alt="HackerArcade" className="w-[124px] h-[32px]" /> */}

			<ul className="list-none sm:flex hidden justify-center items-center flex-1">
				{navLinks.map((nav, index) => (
					<li
						key={nav.id}
						className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
							} ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
						onClick={() => setActive(nav.title)}
					>
						<Link to={`${nav.id}`}>{nav.title}</Link>
					</li>
				))}
			</ul>
			<ul className="list-none sm:flex hidden justify-end items-center flex">
				{token ?
					<>
						<li className="font-poppins font-normal cursor-pointer text-[16px] p-3 text-white">
							<a>{username}</a>
						</li>
						<li className="font-poppins font-normal cursor-pointer text-[16px] p-3 text-white">
							<a onClick={handleLogout}>Logout</a >
						</li>
					</>
					:
					<>
						<li className="font-poppins font-normal cursor-pointer text-[16px] p-3 text-white">
							<Link to="/Login">Login</Link >
						</li>
						<li className="font-poppins font-normal cursor-pointer text-[16px] p-3 text-white">
							<Link to="/Signup">Signup</Link >
						</li>
					</>
				}
			</ul>

			<div className="sm:hidden flex flex-1 justify-end items-center">
				<img
					src={toggle ? close : menu}
					alt="menu"
					className="w-[28px] h-[28px] object-contain"
					onClick={() => setToggle(!toggle)}
				/>

				<div
					className={`${!toggle ? "hidden" : "flex"
						} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl sidebar`}
				>
					<ul className="list-none flex justify-end items-start flex-1 flex-col">
						{navLinks.map((nav, index) => (
							<li
								key={nav.id}
								className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
									} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
								onClick={() => setActive(nav.title)}
							>
								<a href={`#${nav.id}`}>{nav.title}</a>
							</li>
						))}
						{token ?
							<>
								<li className="font-poppins font-normal cursor-pointer mt-4 mb-4 text-[16px] text-white">
									<a>{username}</a >
								</li>
								<li className="font-poppins font-normal cursor-pointer mt-4 mb-4 text-[16px] text-white">
									<a onClick={handleLogout}>Logout</a >
								</li>
							</>
							:
							<>
								<li className="font-poppins font-normal cursor-pointer mt-4 mb-4 text-[16px] text-white">
									<Link to={Login}>Login</Link >
								</li>
								<li className="font-poppins font-normal cursor-pointer mb-4 text-[16px] text-white">
									<Link to="/Signup">Signup</Link >
								</li>
							</>
						}
					</ul>
					<ul className="list-none flex flex-col">

					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;