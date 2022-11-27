import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='text-center mx-auto my-11'>
            <p className='text-red-500 text-3xl'>Something went wrong!!!</p>
            <p className='text-red-400 text-3xl'>{error.statusText || error.message}</p>
            <h4 className="text-2xl"> Please <button className='btn btn-sm' onClick={handleLogOut}>Log out</button> then log back in</h4>
        </div>
    );
};

export default DisplayError;