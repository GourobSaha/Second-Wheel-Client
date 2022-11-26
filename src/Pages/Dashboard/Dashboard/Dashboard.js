import React from 'react';
import logo from '../../../Images/Logo/car_14445.png'

const Dashboard = () => {
    return (
        <div className='container mx-auto p-32'>
            <h2 className="text-3xl font-semibold text-slate-600 text-center mb-10">Dashboard</h2>
            <img src={logo} className='mx-auto' alt="" />
            <h2 className="text-4xl font-bold text-slate-600 text-center">Second Wheel</h2>
            <h2 className="text-2xl text-slate-600 text-center">We Provide Dream</h2>
        </div>
    );
};

export default Dashboard;