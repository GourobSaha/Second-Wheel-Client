import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hooks/useTitle';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';

const ReportedCars = () => {
    useTitle('Reported Items')
    const [deleteItem, setDeleteItem] = useState(null)

    const { data: reported = [], refetch, isLoading } = useQuery({
        queryKey: ['reported'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reported');
            const data = await res.json();
            return data;
        }
    });

    const handelDeleteItem = (report) => {
        fetch(`http://localhost:5000/report/${report._id}`, {
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
                            <th>Seller</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reported.map((report, i) => <tr key={report._id}>
                                <th>{i + 1}</th>
                                <td>{report.name}</td>
                                <td>{report.sellerName}</td>
                                <td>Reported</td>
                                <td>
                                    <label onClick={() => setDeleteItem(report)} htmlFor="confirmation-modal" className="btn btn-xs btn-outline btn-secondary">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteItem &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deleteItem.name}?`}
                    message={`If you delete this car can not be undone.`}
                    modalData={deleteItem}
                    successAction={handelDeleteItem}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ReportedCars;