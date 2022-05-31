import mongoose from "mongoose";
const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

export default connectDB