import {Document, FilterQuery, Model, SaveOptions} from "mongoose";
import {DataSource} from "apollo-datasource";

export class MongoDataSource<T extends Document> extends DataSource {

    model: Model<T>

    constructor(modelClass: Model<T>) {
        super();
        this.model = modelClass;
    }

    async findById<U>(id: U) {
        return this.model.findById(id);
    }

    async findOne(conditions?: FilterQuery<T>) {
        return this.model.findOne(conditions)
    }

    async find(conditions?: FilterQuery<T>) {
        return this.model.find(conditions)
    }

    async save<U>(data: U, options?: SaveOptions) {
        const newModel = (new this.model(data));
        return await newModel.save(options);
    }

}