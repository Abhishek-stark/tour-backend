/*eslint-disable*/
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
// const Bookings = require('../models/bookingModel');

const YOUR_DOMAIN = 'http://localhost:3000';

//it's worked for many times
exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    const tour = await Tour.findById(req.params.tourId);

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: tour.name,
                    description: tour.summary,
                },
                unit_amount: tour.price * 1000,
            },
            quantity: 1,
        }, ],
        mode: 'payment',
        customer_email: req.user.email,
        // success_url: `${YOUR_DOMAIN}/dashboard?success=true`,
        // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        success_url: `${YOUR_DOMAIN}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.status(200).json({
        status: 'success',
        session,
    });
});

exports.createBookingCheckout = catchAsync(async(req, res, next) => {
    const { tour, user, price } = req.query;
    if (!tour && !user && !price) {
        console.log('error');
        return next();
    }
    if (tour && user && price) {
        console.log('working...');
        await Booking.create({ tour, user, price });
        res.redirect(`${YOUR_DOMAIN}/`);
    }
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);