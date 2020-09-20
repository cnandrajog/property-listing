import fetch from "node-fetch";
import {DataSource} from "apollo-datasource";


export class RestDataSource extends DataSource {
    protected baseUrl

    constructor() {
        super();
    }

    async get(path: string, queryString: string = "") {
        const url = `${this.baseUrl}/${path}/?${queryString}`
        const response = await fetch(url);
        return await response.json();
    }
}

