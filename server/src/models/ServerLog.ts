import MongoORM from "@cameronct/mongo-orm";

const ServerLog = new MongoORM.Model("serverLogs", [
    { name: "type", type: MongoORM.FieldTypes.String, required: true },
    { name: "stack", type: MongoORM.FieldTypes.String, required: true },
    { name: "date", type: MongoORM.FieldTypes.String, required: true },
], [])

export default ServerLog;