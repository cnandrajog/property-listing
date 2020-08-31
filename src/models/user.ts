import {Document, model, Schema} from 'mongoose'

export interface IUser extends Document {
    email: string;
    name: string;
    password?: string;
    favorites: Array<String>
}


const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: String,
        default: []
    }]
}, {
    timestamps: true
});

export const userModel = model<IUser>('User', userSchema)