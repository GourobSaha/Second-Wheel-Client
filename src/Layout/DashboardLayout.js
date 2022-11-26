import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div className='container mx-auto'>
            <div className="drawer drawer-mobile">
                <input id="dashboard-nav" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-nav" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Orders</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/allseller'>All Seller</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;