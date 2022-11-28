import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hooks/useTitle';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {
    useTitle('All Buyers')
    const [deleteBuyer, setDeleteBuyer] = useState(null)
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['Buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=Buyer', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteBuyer = (buyer) => {
        fetch(`http://localhost:5000/users/${buyer._id}`, {
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
            <h2 className="text-2xl font-semibold text-slate-600 text-center my-5">All Buyers</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl">
                <table className="table w-full text-center">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            buyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.role}</td>
                                <td>
                                    <label onClick={() => setDeleteBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-xs btn-outline btn-secondary">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteBuyer &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deleteBuyer.name}?`}
                    message={`If you delete this buyer it can not be undone.`}
                    modalData={deleteBuyer}
                    successAction={handleDeleteBuyer}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyers;