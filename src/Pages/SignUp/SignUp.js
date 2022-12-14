import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useTitle from '../../Hooks/useTitle';
import useToken from '../../Hooks/useToken';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

const SignUp = () => {
    useTitle('Sign Up')
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [navigate, token])

    const handleSignUp = data => {
        console.log(data);
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                        toast.success('Successfully Signed Up!')
                    })
                    .catch(error => console.log(error))
                reset();
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })
    }

    const saveUser = (name, email, role) => {
        const user = {
            name, email, role
        };
        fetch('https://second-wheel-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email);
            })
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