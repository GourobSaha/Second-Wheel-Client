import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';
import GoogleLogin from '../GoogleLogin/GoogleLogin';


const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });

        }
    }, [from, navigate, token])

    const handleLogin = data => {
        console.log(data);
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginEmail(data.email);
                toast.success('Successfully Logged In!')
                reset();
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })

    }
    return (
        <div className='container mx-auto'>
            <div className='my-10 md:my-20 flex justify-center items-center'>
                <div className='w-96 p-7 shadow-xl rounded-2xl'>
                    <h2 className='text-xl text-center mb-3'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
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
                            <label className="label">
                                <span className="label-text">Forget Password?</span>
                            </label>

                        </div>
                        <input className='btn bg-slate-500 w-full' value="Login" type="submit" />
                    </form>
                    <p className='my-2 text-center text-sm'>New to Doctors Portal? <Link className='text-primary' to='/signup'>Create New Account</Link></p>
                    <div className="divider">OR</div>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;