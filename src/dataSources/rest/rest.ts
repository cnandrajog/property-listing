import fetch from "node-fetch";
import {DataSource} from "../base";

export class RestDataSource implements DataSource {
    protected baseUrl

    async get(path: string, queryString: string = "") {
        const url = `${this.baseUrl}/${path}/?${queryString}`
        const response = await fetch(url);
        return await response.json();
    }
}