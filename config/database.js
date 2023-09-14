import mongoose from 'mongoose';

const uri = "mongodb+srv://admin:API_UAM-2023-03-sw1@cluster0.3jrypmw.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
    return mongoose.connect(uri);
};

export {connection}