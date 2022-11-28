import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Advertisement = () => {

    const { data: advertise = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch('https://second-wheel-server.vercel.app/advertisedcars');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className="w-16 h-16 my-32 border-8 border-dashed rounded-full animate-spin dark:border-slate-800 mx-auto"></div>
    }

    // console.log(advertise[0].name);

    return (
        <>
            {advertise[0].advertise &&
                <>
                    <h1 className='text-4xl text-slate-600 font-bold text-center mb-5 mt-7'>Featured</h1>
                    <div className="card border-none shadow-xl grid grid-cols-1 md:grid-cols-2">
                        <figure><img src={advertise[0].img} alt="car" className='w-full rounded-2xl' /></figure>
                        <div className="m-auto">
                            <h2 className="text-center text-3xl font-semibold">{advertise[0].name}</h2>
                            <div className="overflow-x-auto mx-auto">
                                <table className="table w-full">
                                    <tbody>
                                        <tr>
                                            <th>Resale Price:</th>
                                            <td>{advertise[0].resaleValue} tk</td>
                                        </tr>
                                        <tr>
                                            <th>Original Price:</th>
                                            <td>{advertise[0].originalPrice} tk</td>
                                        </tr>
                                        <tr>
                                            <th>Purchase Year:</th>
                                            <td>{advertise[0].purchaseYear}</td>
                                        </tr>
                                        <tr>
                                            <th>Condition:</th>
                                            <td>{advertise[0].condition}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Advertisement;