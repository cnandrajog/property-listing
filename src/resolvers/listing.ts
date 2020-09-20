import {ContextDataSources} from "../types/context";
import {CustomDataSources} from "dataSource";

export const listingResolvers = {
    Query: {
        listings: (_, {city}, {dataSources}: ContextDataSources) => {
            try {
                return dataSources.ListingAPI.getListingsByCity(city);
            } catch (error) {
                console.log('Error while getting listings', error);
                throw error;
            }
        }
    },
    Listing: {
        favoriteCount: async (parent, _, {dataSources}: ContextDataSources) => {
            try {
                return getFavoriteCount(parent, dataSources);
            } catch (error) {
                console.log('Error while retrieving favorite count', error);
                throw error
            }
        }
    }
}

const getFavoriteCount = async (parent, dataSources: CustomDataSources) => {
    if (parent) {
        const {mlsId} = parent;
        const listing = await (dataSources.Listing.loadMany(mlsId.toString()));
        if (listing) {
            return listing['favoriteCount'];
        }
    }
    return 0;
}