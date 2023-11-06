import React from 'react'
import styles from "../style";
import { workspace } from '../assets/index';
const Workspace = () => {
    return (
        <section id="home" className={`flex md:flex-row mt-16 flex-col ${styles.paddingY}`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[30px] text-[30px] text-white"><span className='text-lime-300'>Learn </span>with Practicals
                    </h1>
                </div>

                <h3 className="font-poppins font-semibold ss:text-[55px] text-[50px] text-white ss:leading-[90.8px] leading-[70px] w-full">
                    Start learning how to hack
                    from barebones basics! </h3>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    Choose between comprehensive beginner-level and
                    advanced online courses covering offensive, defensive, or
                    general cybersecurity fundamentals.
                </p>
                <p className={`${styles.paragraph} max-w-[470px] mt-5 leading-[50px]`}>
                    <ul class="list-disc">
                        <li>Entirely browser-based</li>
                        <li>Guided courses for every skill level</li>
                        <li>Content by real cybersecurity professionals</li>
                        <li>Practice on live targets, based on real-world scenarios</li>
                        <li>Achieve your career goals or master new skills</li>
                    </ul>
                </p>
            </div>
            <div className={`flex-1 flex ${styles.flexCenter} relative`}>
                <img src={workspace} alt="" srcset="" />
            </div>
        </section>
    )
}

export default Workspace