import React, { useContext } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { MdVerifiedUser } from "react-icons/md";
import { AuthContext } from '../../Contexts/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';

const CarCategory = ({ car, setBookCar }) => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const { img, name, description, location, resaleValue, originalPrice, condition, sellerName, usedYears, isVerified, date } = car;

    return (
        <div className="shadow-xl p-5 rounded-xl my-5">
            <img src={img} alt="Shoes" className='lg:h-96 mx-auto p-3' />
            <div className="px-10">
                <h2 className="text-2xl font-semibold text-slate-600 text-center">{name}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <tbody>
                            <tr>
                                <th>Location:</th>
                                <td>{location}</td>
                            </tr>

                            <tr>
                                <th>Resale Price:</th>
                                <td>{resaleValue} tk</td>
                            </tr>

                            <tr>
                                <th>Original Price:</th>
                                <td>{originalPrice} tk</td>
                            </tr>
                            <tr>
                                <th>Post:</th>
                                <td>{date?.slice(0, 10)}</td>
                            </tr>
                            <tr>
                                <th>Seller:</th>
                                <td className='flex items-center'>
                                    <p>{sellerName} </p>
                                    <p className='text-green-600 tooltip tooltip-right tooltip-success' data-tip="Verified Seller">{isVerified && <MdVerifiedUser></MdVerifiedUser>}</p>
                                </td>
                            </tr>
                            <tr>
                                <th>Used:</th>
                                <td>{usedYears} year/s</td>
                            </tr>
                            <tr>
                                <th>Condition:</th>
                                <td>{condition}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className='my-3'>{description}</p>
                <div className="card-actions justify-center mt-5">
                    {
                        isBuyer ?
                            <label
                                htmlFor="booking-modal"
                                className="btn bg-slate-600 btn-sm"
                                onClick={() => setBookCar(car)}
                            >Book Now <FaArrowAltCircleRight className='ml-1' /></label>
                            :
                            <div className='tooltip tooltip-top' data-tip="Only buyer can book!!">
                                <button disabled className="btn bg-slate-600 btn-sm" >Book Now <FaArrowAltCircleRight className='ml-1' /></button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CarCategory;