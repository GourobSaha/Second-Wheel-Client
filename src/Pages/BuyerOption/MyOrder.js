import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOrder = ({ booking }) => {

    const { img, carName, resaleValue, _id } = booking;

    return (

        <div className="card bg-base-100 shadow-xl">
            <figure><img src={img} alt="car" className='h-56' /></figure>
            <div className="card-body">
                <h2 className="text-xl font-semibold text-center">{carName}</h2>
                <p className='text-center'><span className='font-semibold'>Price: </span>{resaleValue}tk</p>
                <div className="card-actions justify-center">
                    {
                        resaleValue && !booking.paid &&
                        <Link to={`/dashboard/payment/${_id}`} className="btn bg-slate-600 btn-sm">Pay now <FaArrowAltCircleRight className='ml-1' /></Link>
                    }
                    {
                        resaleValue && booking.paid && <button disabled className='btn bg-slate-600 btn-sm text-red-700 font-bold text-lg'>Paid</button>
                    }
                </div>
            </div>
        </div>

    );
};

export default MyOrder;