import {ListingRestDataSource} from "../dataSources/rest/listing";
import {MongoDataSource} from "../dataSources/mongo/mongo";
import {IUser} from "../models/user";
import {ListingMongoDataSource} from "../dataSources/mongo/listing";

export interface CustomDataSources{
    ListingAPI: ListingRestDataSource;
    User: MongoDataSource<IUser>;
    Listing: ListingMongoDataSource
}