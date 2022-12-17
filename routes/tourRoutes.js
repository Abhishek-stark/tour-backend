/*eslint-disable*/
const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

// router.param('id', tourController.checkID);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
// authController.protect,
router
    .route('/')
    .get(
        bookingController.createBookingCheckout,

        tourController.getAllTours
    )
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour
    );

module.exports = router;
// after section 13
// const express = require('express');
// const tourController = require('./../controllers/tourController');
// const authController = require('./../controllers/authController');
// const reviewRouter = require('./../routes/reviewRoutes');

// const router = express.Router();

// // router.param('id', tourController.checkID);

// // POST /tour/234fad4/reviews
// // GET /tour/234fad4/reviews

// router.use('/:tourId/reviews', reviewRouter);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours);

// router.route('/tour-stats').get(tourController.getTourStats);
// router
//   .route('/monthly-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide', 'guide'),
//     tourController.getMonthlyPlan
//   );

// router
//   .route('/tours-within/:distance/center/:latlng/unit/:unit')
//   .get(tourController.getToursWithin);
// // /tours-within?distance=233&center=-40,45&unit=mi
// // /tours-within/233/center/-40,45/unit/mi

// router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     tourController.createTour
//   );

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     tourController.uploadTourImages,
//     tourController.resizeTourImages,
//     tourController.updateTour
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     tourController.deleteTour
//   );

// module.exports = router;