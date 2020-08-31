import {favoritesResolvers} from "../../resolvers/favorite";

describe('favorite resolvers', () => {

    const mockContext = {
        dataSource: {
            Listing: {
                findOne: jest.fn(),
                save: jest.fn(),
            },
            User: {
                findById: jest.fn(),
                save: jest.fn(),
            }
        }, user: {id: "userId", favorites: [], email: "user1@sideinc.com", name: "user1"}
    };


    it('[when listing is NOT marked as favorite and user toggles listing]', async () => {

        const user = {id: "userId", favorites: [], email: "user1@sideinc.com", name: "user1"}
        const initListing = {mlsId: "1005192", favoriteCount: 1}

        const {findById} = mockContext.dataSource.User;
        findById.mockReturnValueOnce(user);

        const {findOne} = mockContext.dataSource.Listing;

        // when listing "1005192" was toggled 1st time
        findOne.mockReturnValueOnce(initListing);

        const {save} = mockContext.dataSource.User;
        save.mockReturnValue(user);

        const userListing = mockContext.dataSource.Listing.save;

        const userInfo = await favoritesResolvers.Mutation.toggleFavorite(null, {mlsId: "1005192"}, mockContext);

        expect(userInfo).not.toBeNull();
        expect(save).toBeCalledWith(userInfo);
        expect(userInfo.favorites).toContain("1005192");
        expect(userInfo.favorites.length).toBe(1);
        expect(userListing).toBeCalledWith(initListing);

    });

    it('[when listing is marked as favorite and user toggles listing]', async () => {

        const user = {id: "userId", favorites: ["1005192"], email: "user1@sideinc.com", name: "user1"}
        const initListing = {mlsId: "1005192", favoriteCount: 1}

        const {findById} = mockContext.dataSource.User;
        findById.mockReturnValueOnce(user);

        const {findOne} = mockContext.dataSource.Listing;

        // when listing "1005192" was toggled 2st time
        findOne.mockReturnValueOnce(initListing);

        const {save} = mockContext.dataSource.User;
        save.mockReturnValue(user);

        const userListing = mockContext.dataSource.Listing.save;

        const userInfo = await favoritesResolvers.Mutation.toggleFavorite(null, {mlsId: "1005192"}, mockContext);

        expect(userInfo).not.toBeNull();
        expect(save).toBeCalledWith(userInfo);
        expect(userInfo.favorites.length).toBe(0);
        expect(userInfo.favorites).not.toContain("1005192");
        expect(userListing).toBeCalledWith(initListing);

    });


    it('[when listing is marked as favorite , it is not in the database and  user toggles listing]', async () => {

        const user = {id: "userId", favorites: [], email: "user1@sideinc.com", name: "user1"}

        const {findById} = mockContext.dataSource.User;
        findById.mockReturnValueOnce(user);

        const {findOne} = mockContext.dataSource.Listing;

        // when listing "1005192" was toggled 1st time
        findOne.mockReturnValueOnce(null);

        const {save} = mockContext.dataSource.User;
        save.mockReturnValue(user);

        const userListing = mockContext.dataSource.Listing.save;

        const userInfo = await favoritesResolvers.Mutation.toggleFavorite(null, {mlsId: "1005192"}, mockContext);

        expect(userInfo).not.toBeNull();
        expect(save).toBeCalledWith(userInfo);
        expect(userInfo.favorites.length).toBe(1);
        expect(userInfo.favorites).toContain("1005192");
        expect(userListing).toBeCalledWith({mlsId: "1005192", favoriteCount: 1});

    });

});