import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const { data: sellercars = [], refetch } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/sellercars?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteProduct = (product) => {
        fetch(`http://localhost:5000/product/${product._id}`, {
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
                                    <label onClick={() => setDeleteProduct(sellercar)} htmlFor="confirmation-modal" className="btn btn-xs btn-outline btn-secondary">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteProduct &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deleteProduct.name}?`}
                    message={`If you delete this seller it can not be undone.`}
                    modalData={deleteProduct}
                    successAction={handleDeleteProduct}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;