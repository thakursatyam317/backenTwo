import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import connectDB from './src/configs/db.config.js';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/user.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res)=>{
    res.send('Api is running');
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});