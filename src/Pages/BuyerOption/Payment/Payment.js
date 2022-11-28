import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';
import CheckoutFrom from './CheckoutFrom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)


const Payment = () => {
    useTitle('Payment')
    const booking = useLoaderData();
    const { resaleValue, carName } = booking;
    return (
        <div className='px-10'>
            <h3 className="text-3xl my-5">Payment for {carName}</h3>
            <p className="text-xl">Please pay <strong>{resaleValue} tk</strong> for your car.</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;