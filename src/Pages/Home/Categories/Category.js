import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { img, _id, name } = category;
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl p-2">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="text-2xl font-semibold text-slate-600 text-center">{name}</h2>
                    <div className="card-actions justify-center">
                        <Link to={_id}><button className="btn bg-slate-600 btn-sm">
                            View More <FaArrowAltCircleRight className='ml-1' />
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;