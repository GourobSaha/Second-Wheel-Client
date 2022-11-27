import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: sellercars = [], refetch } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellercars?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-600 text-center my-5">My Products</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl">
                <table className="table w-full text-center">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Car Name</th>
                            <th>Resale Price</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellercars.map((sellercar, i) => <tr key={sellercar._id}>
                                <th>{i + 1}</th>
                                <td className='font-semibold'>{sellercar.name}</td>
                                <td>{sellercar.resaleValue
                                } tk</td>
                                <td>{
                                    sellercar.soldOut ?
                                        <><p>Sold Out</p></>
                                        :
                                        <div className='text-center'>
                                            <p>Available</p>
                                            <button className='btn btn-xs btn-outline btn-info'>Advertise</button>
                                        </div>
                                }
                                </td>
                                <td>{sellercar.location}</td>
                                <td>
                                    <label htmlFor="confirmation-modal" className="btn btn-xs btn-outline btn-secondary">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;