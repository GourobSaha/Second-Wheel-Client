import React from 'react';

const CarCategory = ({ car }) => {
    const { img, name, description } = car;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="p-5">
                    <img src={img} alt="cars" className="rounded-xl h-96" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="text-2xl font-semibold text-slate-600 text-center">{name}</h2>
                    <p>{description}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCategory;