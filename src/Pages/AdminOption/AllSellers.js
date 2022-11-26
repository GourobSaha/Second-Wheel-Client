import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['Seller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=Seller');
            const data = await res.json();
            return data;
        }
    });

    const handleSellerVerify = (id, email) => {
        fetch(`http://localhost:5000/users/buyers/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetch(`http://localhost:5000/allcars?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Seller Verified')
                            refetch();
                        })
                }

            })
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-600 text-center my-5">All Sellers</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl">
                <table className="table w-full">

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
                                <td><button className='btn btn-xs btn-outline btn-secondary'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;