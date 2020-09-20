import {RestDataSource} from "./rest";
import {PROPERTIES, SIMPLY_RETS_API} from "../../constants";

export class ListingRestDataSource extends RestDataSource {
    constructor() {
        super();
        this.baseUrl = SIMPLY_RETS_API
    }

    // TODO: this can be improved by accepting an array
    async getListingsByCity(city: string) {
        return this.get(PROPERTIES, `cities=${city}`)
    }
}