import React, { useEffect, useState } from 'react'
import styles from "../style";
import Sliders from './Sliders';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env
import { Link } from 'react-router-dom';
const Labs = () => {

    const router = useNavigate()

    const [machines, setMachines] = useState([])

    const getMachines = async () => {
        const response = await fetch(`${VITE_API_URL}/api/v1/machines/`, {
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
            setMachines(data)
            console.log(data)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router('/login')
        } else {
            getMachines()
        }
    }, [])

    return (
        <>

            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto font-sans max-w-screen-md text-center lg:py-16 lg:px-12">
                    <a target="e_blank" href="https://medium.com/@hd35065/understanding-the-role-of-artificial-intelligence-in-cybersecurity-a7089ebd97f7" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                        <span className="text-xs bg-sky-500 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">New Blog is out! See what's new</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    <h1 className="mb-4 mt-10 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Start from the absolute fundamentals, move to pure hands-on or competitive training, land your first infosec job position. Ready?</p>
                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link to="/" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-900">
                            Learn more
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                        <a target="e_blank" href="https://youtu.be/zlZ_dupXxE0?si=ep5BBVMASlnDQ18w" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                            Watch video
                        </a>
                    </div>
                    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                        <h1 className="mb-4 mt-10 text-2xl font-normal tracking-tight leading-none text-gray-900 dark:text-white">Level Up Your Hacking Skills</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Learn cybersecurity hands-on. Put your skills to the test!
                        </p>
                    </div>
                </div>
                <hr />
                <div className="px-4 py-8 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <h1 className="mb-4 mt-10 text-3xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">What Are Hacking Labs</h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        A massive pool of virtual penetration testing labs, simulating up-to-date security
                        vulnerabilities and misconfigurations. New labs are added every week, ensuring the
                        content is always up-to-date and the fun unlimited. Players can learn all the latest attack
                        paths and exploit techniques.
                    </p>

                </div>
                <div className="mt-10 mb-10 grid grid-cols-3 w-[90%] gap-8 mx-auto">
                    <div className="col-span-1 w-full border-solid border-4 rounded-lg border-lime-500">
                        <h1 className="p-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">100% Practical
                        </h1>
                        <p className="p-5 text-md font-normal text-justify text-gray-500 dark:text-gray-400">
                            Theory is vital, but practice is the true reality check.
                            Ready to test your skills in action? In this mordern world,
                            Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.
                        </p>
                        <p className="p-5 text-md font-normal text-justify text-gray-500 dark:text-gray-400">
                            These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users via ransomware; or interrupting normal business processes.The practice is used by companies to protect against phishing schemes, ransomware attacks, identity theft, data breaches, and financial losses.
                        </p>
                    </div>
                    <div className="col-span-2 w-full border-solid border-4 rounded-lg border-slate-500 ">
                        <img src="https://nexstor.com/wp-content/uploads/2023/03/FEATURED-IMAGE-TEMPLATE-Nexstor-2-1.png" alt="" srcset="" />
                    </div>
                    <div className="col-span-2 border-solid border-4 rounded-lg border-slate-500 ">
                        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <img className="rounded-lg h-1/2" src="https://www.cyberlearning.ro/wp-content/uploads/Cybersecurity.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="col-span-1 w-full border-solid border-4 rounded-lg border-lime-500">
                        <h1 className="p-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Cyber Security
                        </h1>
                        <p className="p-5 text-md font-normal text-justify text-gray-500 dark:text-gray-400">
                            Cyber security skills have been defined as. the combination of essential and advanced technical. expertise and skills, strategic management skills, planning and organisation skills, and complementary. And if you have a degree and experience in information security, the options are plentiful and diverse. Most prospective cybersecurity leaders start with an undergraduate degree in information technology and computer science.
                        </p>
                        <p className="p-5 text-md font-normal text-justify text-gray-500 dark:text-gray-400">
                            Cybersecurity is a growing industry with a lot of opportunities for growth and development. It is an industry that has the potential to be lucrative, but it also comes with a lot of responsibility. A cybersecurity analyst is responsible for data security for any data stored on computers. An information security analyst would also consider the security of data stored.
                        </p>
                    </div>
                </div>
                {/* break */}
                <div className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                    <div className={`flex-1 flex ${styles.flexCenter} relative`}>
                        <img
                            src="https://blog.webhopers.in/wp-content/uploads/2022/04/Ethical-Hacking-Course-in-Patna.jpg"
                            alt="Product screenshot"
                        />
                    </div>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="flex-1 font-poppins text-slate-500 font-semibold ss:text-[20px] text-[20px]">
                                STARTING POINT
                            </h1>
                        </div>

                        <h1 className="font-poppins font-semibold ss:text-[59px] text-[42px] text-white ss:leading-[80.8px] leading-[65px] w-full">
                            Learning To Hack?
                            Start Here!
                        </h1>
                        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                            Starting Point provides all the basic skills you need to progress through the Hack The Box platform. Ready to kick off your hacking journey?
                        </p><p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto possimus doloribus labore autem facilis, deserunt dolor quos molestias id, officiis sit eius tenetur soluta numquam dolorum nostrum voluptatum quasi iste?
                        </p>
                    </div>
                </div>
                {/* break */}
                <div className={`flex md:flex-row mt-16 flex-col ${styles.paddingY}`}>
                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="flex-1 font-poppins font-semibold ss:text-[30px] text-[30px] text-white"><span className='text-lime-300'>Grow </span>with Labs
                            </h1>
                        </div>

                        <h3 className="font-poppins font-semibold ss:text-[55px] text-[50px] text-white ss:leading-[70.8px] leading-[60px] w-1/2">
                            An ever-expanding pool of hacking content </h3>
                        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                            With new content released every week, you'll never stop learning the latest techniques, skills, and tricks.
                        </p>
                        <div className="flex flex-row justify-between items-center text-center mx-auto w-full">
                            <div className="container w-full my-12 mx-auto px-4 md:px-12">
                                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                    {machines.map((machine) => (
                                        <Sliders machine={machine} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Labs