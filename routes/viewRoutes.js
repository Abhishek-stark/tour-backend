/*eslint-disable*/
const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController.js');
// const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
    '/',
    bookingController.createBookingCheckout,
    viewsController.getOverview
);

router.get(
    '/tour/:slug',
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewsController.getTour
);
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get(
//     '/my-tours',
//     bookingController.createBookingCheckout,
//     authController.protect,
//     viewsController.getMyTours
// );

// router.post(
//     '/submit-user-data',
//     authController.protect,
//     viewsController.updateUserData
// );

module.exports = router;