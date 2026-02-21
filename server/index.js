import express from 'express';
import cors from 'cors';
//it is a module that loads environment variables from a .env file into process.env. It allows developers to store sensitive information such as API keys, database credentials, and other configuration settings in a separate file, keeping them out of the source code and making it easier to manage different environments (development, production, etc.).
import dotenv from 'dotenv';
dotenv.config();
//it is a middleware that parses incoming request bodies in JSON format and makes the data available in the req.body property of the request object. This allows developers to easily access and manipulate the data sent by clients in their API endpoints.
import cookieParser from 'cookie-parser';
//it is a middleware that logs HTTP requests and responses in the console. It provides information about the request method, URL, status code, response time, and more. This helps developers monitor and debug their applications by providing insights into the incoming requests and outgoing responses.
import morgan from 'morgan';
//it is used to set various HTTP headers for security purposes. It helps protect the application from common web vulnerabilities by configuring headers such as Content Security Policy, X-Frame-Options, X-XSS-Protection, and more.
import helmet from 'helmet';

import connectDb from './config/connectDb.js';
import userRouter from './route/user.route.js';
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet(
    { crossOriginResourcePolicy: false }
));
const PORT = 8080 || process.env.PORT;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the FatafatKart API!' });
});

connectDb().then(()=>{
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

});

app.use('/api/user', userRouter);
