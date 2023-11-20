import mongoose from 'mongoose';
import { DB_URI } from './env.js';

const connection = () => {
    return mongoose.connect(DB_URI);
};

export {connection}