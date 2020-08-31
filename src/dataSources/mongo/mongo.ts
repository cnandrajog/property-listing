import {Document, FilterQuery, Model, SaveOptions} from "mongoose";
import {DataSource} from "../base";

export class MongoDataSource<T extends Document> implements DataSource {

    model: Model<T>

    constructor(modelClass: Model<T>) {
        this.model = modelClass;
    }

    async findById(id: any | string | number) {
        return this.model.findById(id);
    }

    async findOne(conditions?: FilterQuery<T>) {
        return this.model.findOne(conditions)
    }

    async find(conditions?: FilterQuery<T>) {
        return this.model.find(conditions)
    }

    async save(data: any, options?: SaveOptions) {
        const newModel = (new this.model(data));
        return await newModel.save(options);
    }

}