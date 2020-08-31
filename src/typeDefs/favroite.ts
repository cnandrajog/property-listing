import {gql} from "apollo-server-express";

export const favoriteTypeDefs = gql`

    extend type Mutation {
        toggleFavorite(mlsId: ID): User
    }

    type User {
        email: String,
        name: String
        favorites: [String]
    }
`