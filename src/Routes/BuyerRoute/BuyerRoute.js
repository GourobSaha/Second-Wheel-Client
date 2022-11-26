import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';

const BuyerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <div className="w-16 h-16 my-32 border-8 border-dashed rounded-full animate-spin dark:border-slate-800 mx-auto"></div>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;