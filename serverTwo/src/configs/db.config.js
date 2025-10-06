import mongoose from 'mongoose';

const connectDB = async (req, res) =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
    
        console.log(`mongoose connected ${conn.connection.host}`);
    } catch (error) {
        
    }

}

export default connectDB;