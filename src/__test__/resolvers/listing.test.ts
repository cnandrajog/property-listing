import {listingResolvers} from "../../resolvers/listing";


describe('listing resolvers', () => {

    const mockContext = {
        dataSource: {
            ListingAPI: {
                getListingsByCity: jest.fn()
            }, Listing: {
                loadMany: jest.fn()
            }
        }
    };

    it('[expect getListingsByCity() to be called]', async () => {
        const {getListingsByCity} = mockContext.dataSource.ListingAPI;
        getListingsByCity.mockReturnValueOnce([{mlsId: "1005192"}]);

        listingResolvers.Query.listings(null, {city: 'Houston'}, mockContext)
        expect(getListingsByCity).toBeCalledWith("Houston");
    });

    it('[expect listing loader not to be called]', async () => {
        const {loadMany} = mockContext.dataSource.Listing;
        const favCount = await listingResolvers.Listing.favoriteCount(null, null, mockContext)
        expect(favCount).toBe(0);
        expect(loadMany).not.toBeCalled();

    });

    it('[expect listing loader to be called]', async () => {
        const {loadMany} = mockContext.dataSource.Listing;
        await listingResolvers.Listing.favoriteCount({mlsId: "1005192"}, null, mockContext)
        expect(loadMany).toBeCalledWith("1005192");
    });
});