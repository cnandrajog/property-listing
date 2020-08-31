import {MongoDataSource} from "./mongo";
import {IListing, listingModel} from "../../models/listing";
import DataLoader from "dataloader";

export class ListingMongoDataSource extends MongoDataSource<IListing> {


    constructor() {
        super(listingModel);
    }

    async loadMany(id) {
        return this.listingLoader.load(id)
    }

    private batchListing = async (mlsIds) => {
        const listings = await this.find({mlsId: {$in: mlsIds}})
        return mlsIds.map(mlsId =>
            listings.find(listing =>
                listing.mlsId === mlsId
            )
        )
    };

    private listingLoader = new DataLoader(keys => {
        return this.batchListing(keys)
    }, {
        cache: false
    });


}