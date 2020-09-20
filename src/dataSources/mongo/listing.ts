import {MongoDataSource} from "./mongo";
import {IListing, listingModel} from "../../models/listing";
import DataLoader from "dataloader";

export class ListingMongoDataSource extends MongoDataSource<IListing> {

    private listingLoader

    constructor() {
        super(listingModel);
        this.listingLoader = new DataLoader(this.batchListing);
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

}