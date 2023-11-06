import { useState, useEffect } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataDigitalBestSeller } from '../constants/index';
import blog1 from '../assets/blog1.jpg';
const { VITE_API_URL } = import.meta.env


import "../App.css"
import { RxArrowTopRight } from "react-icons/rx";
const Blog = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch(`${VITE_API_URL}/api/v1/blogs/`)
            .then(res => res.json())
            .then(data => setBlogs(data))
            .then(console.log(blogs))
    }, [])
    const [defaultImage, setDefaultImage] = useState({});
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: blog1,
        }));
    };

    return (
        <>
            <div className="mt-10 mx-auto lg:text-center">
                {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
                <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[46px] text-white ss:leading-[100.8px] leading-[75px]">
                    Latest from our blog
                </h1>
                <p className="mt-2 font-poppins font-semibold text-lg leading-8 text-gray-600">
                    Be aware with the latest Trends & News in cybersecuirty world.
                </p>
            </div>
            <div className="mt-10 mx-auto">
                <Slider {...settings}>
                    {blogs.map((blog) => (
                        <div className="card">
                            <div className="card-top">
                                <img
                                    src={`${VITE_API_URL}${blog.thumbnail}`}
                                    alt={blog.title}
                                    onError={handleErrorImage}
                                />
                                <h1 className="flex-1 font-poppins font-semibold text-white text-md">{blog.title}</h1>
                                <a target='e_blank' href="https://medium.com/@hd35065/understanding-the-role-of-artificial-intelligence-in-cybersecurity-a7089ebd97f7" className="inline-flex justify-between items-center mb-7 ml-3 text-md text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                                    <span className="text-md w-full rounded-full text-white px-4 py-1.5">Read more</span>
                                </a>
                                <h1>Date Created : {blog.date_created.slice(0, 10)}</h1>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>

    )
}

export default Blog

// <div className="flex items-center justify-center gap-10 flex-col h-[900px]">
//                 <Swiper
//                     breakpoints={{
//                         340: {
//                             slidesPerView: 2,
//                             spaceBetween: 15,
//                         },
//                         700: {
//                             slidesPerView: 3,
//                             spaceBetween: 15,
//                         },
//                     }}
//                     freeMode={true}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     modules={[FreeMode, Pagination]}
//                     className="max-w-[90%] lg:max-w-[80%]"
//                 >
//                     {ServiceData.map((item) => (
//                         <SwiperSlide key={item.title}>
//                             <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
//                                 <div
//                                     className="absolute inset-0 bg-cover bg-center"
//                                     style={{ backgroundImage: `url(${item.backgroundImage})` }}
//                                 />
//                                 <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
//                                 <div className="relative flex flex-col gap-10">
//                                     <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
//                                     <h1 className="text-xl lg:text-2xl">{item.title} </h1>
//                                     <p className="lg:text-[18px]">{item.content} </p>
//                                 </div>
//                                 <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>