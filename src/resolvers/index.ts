import { listingResolvers } from "./listing";
import { favoritesResolvers } from "./favorite";
import {IResolvers} from "graphql-tools";

export const resolvers: Array<IResolvers> = [
    listingResolvers,
    favoritesResolvers,
];