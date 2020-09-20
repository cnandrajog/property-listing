import {gql} from "apollo-server-express";

import {favoriteTypeDefs} from "./favroite";
import {listingTypeDefs} from "./listing"
import {DocumentNode} from "graphql";

const BaseTypeDefs = gql`

    scalar Date

    type Query{
        _:String
    }

    type Mutation {
        _:String
    }
`
export const typeDefs: Array<DocumentNode> = [
    BaseTypeDefs,
    favoriteTypeDefs,
    listingTypeDefs
];
