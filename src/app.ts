import express, {Application} from 'express'
import dotEnv from 'dotenv';
import cors from 'cors'
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers";
import {typeDefs} from "./typeDefs";
import {createMongoConnection} from "./util/database";
import {verifyUser} from "./util/context"
import {GraphQLError} from "graphql";
import {ListingRestDataSource} from "./dataSources/rest/listing";
import {DataSource} from "./types/common";
import {Mongoose} from "mongoose";
import {IUser, userModel} from "./models/user";
import {MongoDataSource} from "./dataSources/mongo/mongo";
import {ListingMongoDataSource} from "./dataSources/mongo/listing";

class App {

    app: Application;
    dataSources: DataSource;
    mongoConnection: Mongoose

    constructor() {
        this.config();
        void this.setupDb();
        this.mountServer();
        this.dataSources = this.getDataSources();
    }

    config() {
        dotEnv.config();
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json())
    }

    setupDb = async () => {
        this.mongoConnection = await createMongoConnection();
    }

    mountServer() {
        const port = process.env.PORT || 3000
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: async ({req}) => {
                try {
                    await verifyUser(req)
                } catch (error) {
                    console.log('Error while authentication', error);
                    throw error;
                }
                return {
                    user: req['user'],
                    dataSource: this.dataSources
                }
            }, formatError: (error: GraphQLError) => {
                console.log('Error in property listing service', error);
                return {
                    message: error.message
                }
            }
        })
        apolloServer.applyMiddleware({app: this.app, path: '/graphql'})
        this.app.listen(port, () => {
            console.log('Server listening on PORT: ', port)
            console.log('Graphql Endpoint: ', apolloServer.graphqlPath)
        })
    }

    getDataSources() {
        return {
            ListingAPI: new ListingRestDataSource(),
            User: new MongoDataSource<IUser>(userModel),
            Listing: new ListingMongoDataSource(),
        }

    }
}

export default new App();
