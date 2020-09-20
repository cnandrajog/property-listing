import mongoose from 'mongoose'
import {DEBUG_MODE, MONGO_DB_URL} from "../constants";

export const createMongoConnection = async () => {
    try{

        //setting debug mode in env variables
        mongoose.set('debug', DEBUG_MODE);
        const connection = await mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.log('Error connecting Database',error);
        throw error;
    }
}