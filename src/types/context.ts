import {IUser} from "../models/user";
import {CustomDataSources} from "dataSource";

export interface ContextDataSources {
    dataSources: CustomDataSources
}

export interface ContextUser {
    user: IUser
}