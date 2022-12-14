import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    return (
        <div className='container mx-auto'>
            <div className="drawer drawer-mobile">
                <input id="dashboard-nav" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-nav" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-100 md:bg-transparent text-base-content">
                        {
                            isBuyer &&
                            <>
                                <li><Link to='/dashboard/myorder' className='font-bold shadow-md'>My Orders</Link></li>
                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allbuyers' className='font-bold shadow-md'>All Buyers</Link></li>
                                <li><Link to='/dashboard/allseller' className='font-bold shadow-md'>All Sellers</Link></li>
                                <li><Link to='/dashboard/reported' className='font-bold shadow-md'>Reported Items</Link></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/addproduct' className='font-bold shadow-md'>Add Product</Link></li>
                                <li><Link to='/dashboard/myproducts' className='font-bold shadow-md'>My Products</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;