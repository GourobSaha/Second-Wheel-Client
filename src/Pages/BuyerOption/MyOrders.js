import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import useTitle from '../../Hooks/useTitle';
import MyOrder from './MyOrder';

const MyOrders = () => {
    useTitle('My Orders')
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    // console.log(url);

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <div className="w-16 h-16 my-32 border-8 border-dashed rounded-full animate-spin dark:border-slate-800 mx-auto"></div>
    }

    return (
        <div>
            <h1 className='text-4xl text-slate-600 font-bold text-center my-5'>My Orders</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
                {
                    bookings.map(booking => <MyOrder
                        key={booking._id}
                        booking={booking}
                    ></MyOrder>)
                }
            </div>
        </div>
    );
};

export default MyOrders;