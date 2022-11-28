import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import BookingModal from './BookingModal';
import CarCategory from './CarCategory';

const Cars = () => {
    useTitle('Cars')
    const cars = useLoaderData();
    // console.log(cars);
    const [bookCar, setBookCar] = useState(null)

    return (
        <div className='my-5 container mx-auto'>
            <h1 className='text-4xl text-slate-600 font-bold text-center my-5'>Available Car</h1>
            <div className='grid lg:grid-cols-2 gap-4'>
                {
                    cars.map(car => <CarCategory
                        key={car._id}
                        car={car}
                        setBookCar={setBookCar}
                    ></CarCategory>)
                }
            </div>
            {
                bookCar &&
                <BookingModal
                    bookCar={bookCar}
                    setBookCar={setBookCar}
                ></BookingModal>
            }
        </div>
    );
};

export default Cars;