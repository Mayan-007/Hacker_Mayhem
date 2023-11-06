import React from "react";
import { services } from '../constants';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

const ServiceCard = ({ index, title, sub, icon }) => {
  return (
    <Tilt className="xs:w-[400px] h-full w-full">
      <motion.div className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[1px] rounded-[20px] shadow-card'>
        <div options={{
          max: 45, scale: 1, speed: 450
        }} className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[400px] flex justify-center items-center flex-col'>
          <img src={icon} className='w-30 h-30 object-contain' /><br />
          <h2 className='text-black text-[30px] font-bold text-center'>{title}</h2>
          <p className="mt-2 font-poppins font-semibold text-lg leading-8 text-gray-600">{sub}</p>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <div className="mx-auto lg:text-center" id="About">
      {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
      <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[46px] text-white ss:leading-[100.8px] leading-[75px]">
        Why Hacker Arcade?
      </h1>
      <p className="mt-2 font-poppins font-semibold text-lg leading-8 text-dimWhite">
        Upskilling cyber superhumans since 2017.
      </p>
      <div className="mt-10 flex justify-center flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
      <div className="border-1 mt-20 font-poppins font-semibold text-lg leading-8 text-dimWhite">Hack The Box gives individuals, businesses and universities the tools they need to
        continuously improve their cybersecurity capabilities</div>
    </div>
  )
}

export default About