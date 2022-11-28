import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const GoogleLogin = () => {
    const { providerLogin } = useContext(AuthContext);
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

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user);
                saveUser(user.displayName, user.email, "Buyer");
                setLoginEmail(user?.email);
                toast.success('Successfully Logged In!');
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
            })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn text-slate-700 btn-outline w-full'><FaGoogle className='mr-1' /> CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default GoogleLogin;