import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CarCategory from './CarCategory';

const Cars = () => {
    const cars = useLoaderData();
    console.log(cars);


    return (
        <div className='my-5 container mx-auto'>
            <h1 className='text-4xl text-slate-600 font-bold text-center my-5'>Categories</h1>
            <div className='grid md:grid-cols-2 gap-4'>
                {
                    cars.map(car => <CarCategory
                        key={car._id}
                        car={car}
                    ></CarCategory>)
                }
            </div>
        </div>
    );
};

export default Cars;