import {DataSource as BaseDataSource} from "../dataSources/base";

export interface DataSource {
    [key: string]: BaseDataSource;
}