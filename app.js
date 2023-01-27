/*eslint-disable*/
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
// require(dotenv).config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
// const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const viewRoutes = require('./routes/viewRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const path = require('path');
const cookieparser = require('cookie-parser');

const { urlencoded } = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

const allowedOrigins = [
    'http://localhost:3000',
    'https://abhishek-stark.github.io/Abhishek-stark-reactapp/',
    'https://abhishek-stark.github.io',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(cors('*'));
// app.use(
//     cors({
//         origin: [
//             'http://localhost:3000/',
//             'https://abhishek-stark.github.io/Abhishek-stark-reactapp/',
//         ],

//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

//         exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
//     })
// );

// 'https://abhishek-stark.github.io/Abhishek-stark-reactapp/'

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieparser());
app.use(urlencoded({ extended: true, limit: '10kb' }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price',
        ],
    })
);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin: *');
//     res.setHeader(
//         'Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Auth-Token'
//     );
//     res.setHeader('Access-Control-Allow-Methods: GET,POST,PATCH,DELETE');
//     next();
// });

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/', viewRoutes);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;