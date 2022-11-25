import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const MyOrder = ({ booking }) => {

    const { img, carName, resaleValue } = booking;

    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={img} alt="car" className='h-56' /></figure>
                <div className="card-body">
                    <h2 className="text-xl font-semibold text-center">{carName}</h2>
                    <p className='text-center'><span className='font-semibold'>Price: </span>{resaleValue}tk</p>
                    <div className="card-actions justify-center">
                        <button className="btn bg-slate-600 btn-sm">Pay now <FaArrowAltCircleRight className='ml-1' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;