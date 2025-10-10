import express from 'express';
import dotenv from 'dotenv';
import connectDb  from './src/configs/db.js';
import cookieParser from 'cookie-parser';
import  authRouter from './src/routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser);



app.use('/api/auth', authRouter);
const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log('Surver is running at Port : ', PORT);
    connectDb();
})