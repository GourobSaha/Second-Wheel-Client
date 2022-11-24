import React from 'react';
import img1 from '../../../Images/Cars/black-sport-coupe-car-drive-highway.jpg'
import img2 from '../../../Images/Cars/red-luxury-sedan-road.jpg'
import img3 from '../../../Images/Cars/blue-sport-sedan-parked-yard.jpg'
import img4 from '../../../Images/Cars/dark-grey-mini-sport-coupe-road.jpg'

const Gallery = () => {
    return (
        <div className='container mx-auto'>
            <section className="py-6 dark:bg-gray-800">
                <h1 className='text-4xl text-slate-600 font-bold text-center my-5'>Gallery</h1>
                <div className="container flex flex-col justify-center p-4 mx-auto">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                        <img className="object-cover w-full dark:bg-gray-500 aspect-square" src={img1} alt='' />
                        <img className="object-cover w-full dark:bg-gray-500 aspect-square" src={img2} alt='' />
                        <img className="object-cover w-full dark:bg-gray-500 aspect-square" src={img3} alt='' />
                        <img className="object-cover w-full dark:bg-gray-500 aspect-square" src={img4} alt='' />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;