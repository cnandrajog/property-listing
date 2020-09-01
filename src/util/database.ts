import mongoose from 'mongoose'

export const createMongoConnection = async () => {
    try{
        if (process.env.ENABLE_DEBUG_MODE){
            mongoose.set('debug', true);
        }
        const connection = await mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.log('Error connecting Database',error);
        throw error;
    }
}