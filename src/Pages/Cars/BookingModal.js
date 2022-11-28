import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const BookingModal = ({ bookCar, setBookCar }) => {
    const { user } = useContext(AuthContext);
    // console.log(bookCar);
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const carName = form.carName.value;
        const resaleValue = form.resaleValue.value;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            buyer: name,
            img: bookCar.img,
            email,
            carName,
            resaleValue,
            phone,
            meetingLocation,
            carId: bookCar._id
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setBookCar(null);
                    toast.success('Booking Confirmed');
                }
                else {
                    toast.error(data.message);
                    setBookCar(null);
                }
            })

        console.log(booking);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-center mt-6">Booking for: {bookCar.name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-6'>
                        <div className='flex items-center w-full'>
                            <p className='mr-2 w-1/5 font-semibold'>Name:</p>
                            <input name='name' type="text" disabled value={user?.displayName} className="input w-4/5 shadow-md" />
                        </div>
                        <div className='flex w-full items-center'>
                            <p className='mr-2 w-1/5 font-semibold'>Email:</p>
                            <input name='email' type="email" disabled value={user?.email} className="input w-4/5 shadow-md" />
                        </div>
                        <div className='flex w-full items-center'>
                            <p className='mr-2 w-1/5 font-semibold'>Car:</p>
                            <input name='carName' type="text" disabled value={bookCar.name} className="input w-4/5 shadow-md" />
                        </div>
                        <div className='flex w-full items-center'>
                            <p className='mr-2 w-1/5 font-semibold'>Price(tk):</p>
                            <input name='resaleValue' type="text" disabled value={bookCar.resaleValue} className="input w-4/5 shadow-md" />
                        </div>
                        <div className='flex w-full items-center'>
                            <p className='mr-2 w-1/5 font-semibold'>Phone:</p>
                            <input name='phone' type="number" placeholder="Enter your phone number" className="input w-4/5 shadow-md" required />
                        </div>
                        <div className='flex w-full items-center'>
                            <p className='mr-2 w-1/5 font-semibold'>Location:</p>
                            <input name='meetingLocation' type="text" placeholder="Enter the meeting location" className="input w-4/5 shadow-md" required />
                        </div>
                        <input className="btn bg-slate-600 shadow-lg" type="submit" value="Add to cart" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;