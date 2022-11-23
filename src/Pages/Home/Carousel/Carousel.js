import React from 'react';
import { Link } from 'react-router-dom';
import slide2 from '../../../Images/Slider/slide-3.jpg'
import { FaArrowAltCircleRight } from "react-icons/fa";

const Carousel = () => {
    return (
        <div className='my-5'>
            <div className="carousel w-full container mx-auto rounded-xl">
                <div id="item1" className="carousel-item w-full grid justify-items-center items-center">
                    <img src={slide2} alt='slide1' className="w-full opacity-90" />
                    <div className="absolute text-center">
                        <p className="text-xs md:text-2xl font-semibold text-white bg-black bg-opacity-60 p-3 rounded-lg mb-2">
                            “Second Wheel is not about used cars. It's about your dream.”<br />
                            Buy and sell your car here!
                        </p>
                        <Link to='/services'><button className="btn bg-slate-600 btn-sm">
                            About Us <FaArrowAltCircleRight className='ml-1' />
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;