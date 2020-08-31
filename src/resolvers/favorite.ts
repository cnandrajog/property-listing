import {IUser} from "../models/user";
import {IListing} from "../models/listing";

export const favoritesResolvers = {
    Mutation: {
        toggleFavorite: (_, {mlsId}, {user, dataSource}) => {
            try {
                return toggleFavorite(mlsId, user, dataSource);
            } catch (error) {
                console.log('Error while toggle Favorite', error)
                throw error;
            }

        }
    }
}

const toggleFavorite = async (mlsId: string, user: IUser, dataSource) => {
    let userInfo: IUser;
    let listing: IListing;
    let promise = [];

    [userInfo, listing] = await Promise.all([dataSource.User.findById(user.id), dataSource.Listing.findOne({mlsId: mlsId})]);
    if (!(userInfo.favorites.includes(mlsId))) {
        userInfo.favorites.push(mlsId);
        if (listing) {
            listing.favoriteCount++;
            promise.push(dataSource.Listing.save(listing));
        } else {
            promise.push(dataSource.Listing.save({mlsId, favoriteCount: 1}));
        }
    } else {
        userInfo.favorites = userInfo.favorites.filter(item => item !== mlsId)
        if (listing) {
            listing.favoriteCount--;
            promise.push(dataSource.Listing.save(listing));
        } else {
            // this should never happen
            promise.push(dataSource.Listing.save({mlsId, favoriteCount: 0}));
        }
    }
    promise.push(dataSource.User.save(userInfo));
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