import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import errorImg from '../../Images/Error/error_window_icon_193931.png'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <div className='text-center'>
                <div className='my-20'>
                    <img src={errorImg} alt="error" className='mx-auto w-96' />
                    <h3 className='text-4xl mb-7 text-orange-600'>Page Not Found</h3>
                    {
                        error && (
                            <div className='flex'>
                                <p className='mr-4'>
                                    {error.statusText || error.message}
                                </p>
                                <p> {error.status}</p>
                            </div>
                        )
                    }
                    <p>The page you are looking for doesn't Exist or an <br />
                        other error occurred. Go to <Link to='/' className='bg-slate-500 font-semibold btn btn-sm'>Home Page</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;