import {Document, model, Schema} from 'mongoose'


export interface IListing extends Document {
    mlsId: string;
    favoriteCount: number;
}

const listingSchema = new Schema({
    mlsId: {
        type: String,
        required: true
    },
    favoriteCount: {
        type: Number,
        required: true,
        default: 0

    }
}, {
    timestamps: true
});

export const listingModel = model<IListing>('Listing', listingSchema)
