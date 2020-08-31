export const listingResolvers = {
    Query: {
        listings: (_, {city}, {dataSource}) => {
            try {
                return dataSource.ListingAPI.getListingsByCity(city);
            } catch (error) {
                console.log('Error while getting listings', error);
                throw error;
            }
        }
    },
    Listing: {
        favoriteCount: async (parent, _, {dataSource}) => {
            try {
                return getFavoriteCount(parent, dataSource);
            } catch (error) {
                console.log('Error while retrieving favorite count', error);
                throw error
            }
        }
    }
}

const getFavoriteCount = async (parent, dataSource) => {
    if (parent) {
        const {mlsId} = parent;
        const listing = await (dataSource.Listing.loadMany(mlsId.toString()));
        if (listing) {
            return listing['favoriteCount'];
        }
    }
    return 0;
}