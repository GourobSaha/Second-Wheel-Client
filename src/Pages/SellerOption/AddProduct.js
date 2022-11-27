import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey);

    const { data: sellers = [], isLoading } = useQuery({
        queryKey: ['Seller'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/seller?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className="w-16 h-16 my-32 border-8 border-dashed rounded-full animate-spin dark:border-slate-800 mx-auto"></div>
    }


    // console.log(sellers[0].name)

    const handleAddProduct = (data) => {
        const date = new Date();
        if (!sellers[0]?.verified) {
            sellers[0].verified = false
        }
        // console.log(data);
        // console.log(data.img[0]);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const car = {
                        category_id: data.category_id,
                        name: data.name,
                        img: imgData.data.url,
                        description: data.description,
                        location: data.location,
                        resaleValue: data.resaleValue,
                        originalPrice: data.originalPrice,
                        usedYears: data.usedYears,
                        condition: data.condition,
                        sellerName: sellers[0].name,
                        email: sellers[0].email,
                        isVerified: sellers[0].verified,
                        date: date,
                        phone: data.phone,
                        soldOut: false,
                        reported: false
                    }
                    console.log(car);
                    fetch('http://localhost:5000/cars', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(car)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success('Product Added Successfully');
                                reset();
                            }

                        })
                }
            })
    }



    return (
        <div className='mb-5'>
            <h2 className="text-2xl font-semibold text-slate-600 text-center mt-5">Add Product</h2>
            <div className='w-full p-7 shadow-xl rounded-2xl mx-auto'>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Car Category</span>
                            </label>
                            <select className="select select-bordered w-full" {...register("category_id", { required: 'Category is Required' })}>
                                <option value='637eea6980a8e5e30f138264'>Sports Car</option>
                                <option value='637eea6980a8e5e30f138265'>Luxury Car</option>
                                <option value='637eea6980a8e5e30f138266'>Commuter Car</option>
                            </select>
                            {errors.category_id && <p className='text-red-600 text-sm'>{errors.category_id?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Car Name</span>
                            </label>
                            <input type="text" className="input input-bordered w-full" {...register("name", { required: 'Car Name is Required' })} />
                            {errors.name && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("originalPrice", { required: 'Original Price is Required' })} />
                            {errors.originalPrice && <p className='text-red-600 text-sm'>{errors.originalPrice?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("resaleValue", { required: 'Resale Price is Required' })} />
                            {errors.resaleValue && <p className='text-red-600 text-sm'>{errors.resaleValue?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Condition</span>
                            </label>
                            <select className="select select-bordered w-full" {...register("condition", { required: 'Condition is Required' })}>
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair'>Fair</option>
                            </select>
                            {errors.condition && <p className='text-red-600 text-sm'>{errors.condition?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Year of Use</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("usedYears", { required: 'Year of Use is Required' })} />
                            {errors.usedYears && <p className='text-red-600 text-sm'>{errors.usedYears?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" className="input input-bordered w-full" {...register("location", { required: 'Location is Required' })} />
                            {errors.location && <p className='text-red-600 text-sm'>{errors.location?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" className="input input-bordered w-full" {...register("phone", { required: 'Phone Number is Required' })} />
                            {errors.phone && <p className='text-red-600 text-sm'>{errors.phone?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text" className="input input-bordered w-full" {...register("description", { required: 'Description is Required' })} />
                            {errors.description && <p className='text-red-600 text-sm'>{errors.password?.description}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Car Image</span>
                            </label>
                            <input type="file" className="input input-bordered p-2 w-full" {...register("img", { required: 'Image is Required' })} />
                            {errors.img && <p className='text-red-600 text-sm'>{errors.password?.img}</p>}
                        </div>
                    </div>

                    <div className='text-center'>
                        <input className='btn bg-slate-500 mt-5' value="Add Product" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;