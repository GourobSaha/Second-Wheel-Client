import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hooks/useTitle';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const AllSellers = () => {
    useTitle('All Sellers')
    const [deleteSeller, setDeleteSeller] = useState(null)
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['Seller'],
        queryFn: async () => {
            const res = await fetch('https://second-wheel-server.vercel.app/users?role=Seller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleSellerVerify = (id, email) => {
        fetch(`https://second-wheel-server.vercel.app/users/buyers/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetch(`https://second-wheel-server.vercel.app/allcars?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Seller Verified')
                            refetch();
                        })
                }

            })
    }

    const handleDeleteSeller = (seller) => {
        fetch(`https://second-wheel-server.vercel.app/users/${seller._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Successfully Deleted')
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <div className="w-16 h-16 my-32 border-8 border-dashed rounded-full animate-spin dark:border-slate-800 mx-auto"></div>
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-600 text-center my-5">All Sellers</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl">
                <table className="table w-full text-center">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.role}</td>
                                <td>
                                    {
                                        seller?.verified ?
                                            <p className='text-green-600'>Verified</p>
                                            :
                                            <button onClick={() => handleSellerVerify(seller._id, seller.email)} className='btn btn-xs btn-outline btn-success'>Verify</button>
                                    }
                                </td>
                                <td>
                                    <label onClick={() => setDeleteSeller(seller)} htmlFor="confirmation-modal" className="btn btn-xs btn-outline btn-secondary">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteSeller &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deleteSeller.name}?`}
                    message={`If you delete this seller it can not be undone.`}
                    modalData={deleteSeller}
                    successAction={handleDeleteSeller}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;