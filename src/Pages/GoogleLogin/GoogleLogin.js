import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const GoogleLogin = () => {
    const { providerLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user);
                navigate(from, { replace: true });
                toast.success('Successfully Logged In!');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn text-slate-700 btn-outline w-full'><FaGoogle className='mr-1' /> CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default GoogleLogin;