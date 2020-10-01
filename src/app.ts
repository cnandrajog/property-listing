import {heathCheck, logQuery} from "./utils/logging";
import express, {Application} from 'express'
import cors from 'cors'
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers";
import {typeDefs} from "./typeDefs";
import {createMongoConnection} from "./utils/database";
import {verifyUser} from "./utils/context"
import {GraphQLError} from "graphql";
import {ListingRestDataSource} from "./dataSources/rest/listing";
import {IUser, userModel} from "./models/user";
import {MongoDataSource} from "./dataSources/mongo/mongo";
import {ListingMongoDataSource} from "./dataSources/mongo/listing";
import {DEBUG_MODE, INTROSPECTION, PORT} from "./constants";


class App {

    app: Application;

    constructor() {
        this.config();
        void this.setupDb();
        this.mountServer();
    }

    config() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json())
    }

    setupDb = () => {
        return createMongoConnection();
    }

    mountServer() {
        const port = PORT
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: this.getDataSources,
            introspection: INTROSPECTION,
            debug: DEBUG_MODE,
            context: async ({req}) => {
                try {
                    await verifyUser(req)
                } catch (error) {
                    console.log('Error while authentication', error);
                    throw error;
                }
                return {
                    user: req['user'],
                }
            }, formatError: (error: GraphQLError) => {
                console.log('Error in property listing service', error);
                return {
                    message: error.message
                }
            },
        });

        this.app.use("/graphql", (req, res, next) => logQuery(req, res, next));
        apolloServer.applyMiddleware({
            app: this.app,
            path: '/graphql',
            onHealthCheck: heathCheck
        })
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
