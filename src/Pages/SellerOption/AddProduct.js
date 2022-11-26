import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const handleAddProduct = (data) => {
        console.log(data);
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-600 text-center mt-5">Add Product</h2>
            <div className='w-full lg:w-1/2 p-7 shadow-xl rounded-2xl mx-auto'>
                <form onSubmit={handleSubmit(handleAddProduct)}>
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
                            <span className="label-text">Description</span>
                        </label>
                        <textarea type="text" className="input input-bordered w-full" {...register("description", { required: 'Description is Required' })} />
                        {errors.description && <p className='text-red-600 text-sm'>{errors.password?.description}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Car Image</span>
                        </label>
                        <input type="file" className="input input-bordered w-full" {...register("img", { required: 'Image is Required' })} />
                        {errors.img && <p className='text-red-600 text-sm'>{errors.password?.img}</p>}
                    </div>

                    <input className='btn bg-slate-500 w-full mt-5' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;