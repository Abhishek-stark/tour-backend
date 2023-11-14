/*eslint-disable*/
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

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

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://abhishek-stark.github.io/Abhishek-stark-reactapp/',
//   'https://abhishek-stark.github.io',
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by cors'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://abhishek-stark.github.io/Abhishek-stark-reactapp/',
      'https://abhishek-stark.github.io',
      "https://tour-booking-fronted-j5ca.vercel.app/"
    ],
    credentials: true,
  })
);
// app.use(cors(corsOptions));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '100kb' }));
app.use(cookieparser());
app.use(urlencoded({ extended: true, limit: '100kb' }));

app.use(mongoSanitize());

app.use(xss());

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
