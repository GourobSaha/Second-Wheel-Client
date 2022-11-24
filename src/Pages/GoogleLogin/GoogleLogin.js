import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    return (
        <div>
            <button className='btn text-slate-700 btn-outline w-full'><FaGoogle className='mr-1' /> CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default GoogleLogin;