import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Images/Logo/car_14444.png'

const Navbar = () => {

    const menuItems = <>
        <li><Link to='/' className='font-semibold'>Home</Link></li>
        <li><Link to='/blogs' className='font-semibold'>Blogs</Link></li>
    </>

    return (
        <div className='bg-slate-200'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl"><img src={logo} alt="logo" className='w-12 mr-1' />Second Wheel</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;