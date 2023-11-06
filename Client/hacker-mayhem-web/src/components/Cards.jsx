import React from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { hacker } from "../assets";
import styles from "../style";
import { discount, robot } from "../assets";
const Cards = () => {
    return (
        <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
            <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
                <img
                    src={hacker}
                    alt="Product screenshot"
                    className="max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[30rem] md:-mr-4 lg:-mr-0"
                    width={2432}
                    height={1442}
                />
            </div>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[30px] text-[30px] text-white">Who we are.
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
                    Hackers At Heart                </h1>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    Welcome to Hacker Arcade, where cybersecurity expertise meets practical learning. We are a dynamic online platform dedicated to fostering the development of cybersecurity skills and knowledge. At Hacker Arcade, our mission is clear: to bridge the gap between theoretical knowledge and practical application in web application security and ethical hacking.
                </p><p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    We believe that cybersecurity is not just about understanding the concepts; it's about hands-on experience in real-world scenarios. Our goal is to empower individuals with the expertise required to excel in the field of cybersecurity, ultimately contributing to a more secure digital landscape.
                </p>
            </div>
        </section>
    )
}

export default Cards