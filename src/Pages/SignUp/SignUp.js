import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser } = useContext(AuthContext);

    const handleSignUp = data => {
        console.log(data);
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <div className='my-10 md:my-20 flex justify-center items-center'>
                <div className='w-96 p-7 shadow-xl rounded-2xl'>
                    <h2 className='text-xl text-center mb-3'>Sign Up</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered w-full" {...register("name", { required: 'Name is Required' })} />
                            {errors.name && <p className='text-red-600 text-sm'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Your Role</span>
                            </label>
                            <select className="select select-bordered w-full" {...register("role", { required: 'Role is Required' })}>
                                <option value='Buyer'>Buyer</option>
                                <option value='Seller'>Seller</option>
                            </select>
                            {errors.role && <p className='text-red-600 text-sm'>{errors.role?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" className="input input-bordered w-full" {...register("email", { required: 'Email Address is Required' })} />
                            {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" className="input input-bordered w-full" {...register("password", { required: 'Password is Required' })} />
                            {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn bg-slate-500 w-full mt-5' value="Sign Up" type="submit" />
                    </form>
                    <p className='my-2 text-center text-sm'>Already have an account? <Link className='text-primary' to='/login'>Please Login</Link></p>
                    <div className="divider">OR</div>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;