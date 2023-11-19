import MongoODM from "@cameronct/mongo-odm";

const ServerLog = new MongoODM.Model("serverLogs", [
    { name: "type", type: MongoODM.FieldTypes.String, required: true },
    { name: "stack", type: MongoODM.FieldTypes.String, required: true },
    { name: "date", type: MongoODM.FieldTypes.String, required: true },
], [])

export default ServerLog;