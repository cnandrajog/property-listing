import {IUser} from "../models/user";
import {IListing} from "../models/listing";
import {ContextDataSources, ContextUser} from "../types/context";
import {CustomDataSources} from "dataSource";

export const favoritesResolvers = {
    Mutation: {
        toggleFavorite: (_, {mlsId}, {user, dataSources}: ContextUser & ContextDataSources) => {
            try {
                return toggleFavorite(mlsId, user, dataSources);
            } catch (error) {
                console.log('Error while toggle Favorite', error)
                throw error;
            }

        }
    }
}

const toggleFavorite = async (mlsId: string, user: IUser, dataSources: CustomDataSources) => {
    let userInfo: IUser;
    let listing: IListing;
    let promise = [];

    [userInfo, listing] = await Promise.all([dataSources.User.findById(user.id), dataSources.Listing.findOne({mlsId: mlsId})]);
    if (!(userInfo.favorites.includes(mlsId))) {
        userInfo.favorites.push(mlsId);
        if (listing) {
            listing.favoriteCount++;
            promise.push(dataSources.Listing.save(listing));
        } else {
            promise.push(dataSources.Listing.save({mlsId, favoriteCount: 1}));
        }
    } else {
        userInfo.favorites = userInfo.favorites.filter(item => item !== mlsId)
        if (listing) {
            listing.favoriteCount--;
            promise.push(dataSources.Listing.save(listing));
        } else {
            // this should never happen
            promise.push(dataSources.Listing.save({mlsId, favoriteCount: 0}));
        }
    }
    promise.push(dataSources.User.save(userInfo));
    [listing, userInfo] = await Promise.all(promise);
    return userInfo;

}

const getUpdatedFavorites = (mlsId, listing) => {
    if (listing) {
        listing.favoriteCount++;
    } else {
        listing = {mlsId, favoriteCount: 1}
    }
    return listing
}