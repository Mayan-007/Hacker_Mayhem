import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import styles from "../style";
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_zsaztrg',
      'template_ynp45ei',
      {
        from_name: form.name,
        to_name: 'Poojan',
        from_email: form.email,
        to_email: 'poojanpatel182@gmail.com',
        message: form.message,
      },
      '0382tm_VoQX9zhg7s').then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: '',
          email: '',
          message: '',
        })
      }, (error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong !!");
      })
  }
  return (
    <div className={`flex md:flex-row mt-16 flex-col overflow-hidden`}>
      <motion.div className="xl:flex-1 w-[50%] xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
      <br />
      <motion.div className="flex-1 rounded-2xl">
        <p className="text-white font-poppins font-semibold md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Get in Touch</p>
        <h3 className="text-white font-poppins font-semibold md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]"><span className='text-lime-300'>Contact </span> Us</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-3 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-black text-black rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-black text-black rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-black text-black rounded-lg outline-none border-none font-medium'
            />
          </label>
          <button type="submit" class="rounded-md bg-lime-500 px-3.5 py-2.5 text-md font-semibold text-black shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-24">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact