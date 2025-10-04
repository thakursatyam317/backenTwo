import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/configs/db.js'
import authantication from './src/routes/auth.routes.js'
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authantication);
const port = process.env.PORT || 6060;

app.listen(port, () => {
    console.log('Server is running at port : ', port);
    connectDB();
});