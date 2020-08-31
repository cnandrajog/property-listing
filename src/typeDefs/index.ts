import {gql} from "apollo-server-express";

import {favoriteTypeDefs} from "./favroite";
import {listingTypeDefs} from "./listing"

const BaseTypeDefs = gql`

    scalar Date

    type Query{
        _:String
    }

    type Mutation {
        _:String
    }
`
export const typeDefs = [
    BaseTypeDefs,
    favoriteTypeDefs,
    listingTypeDefs
];
