import MongoORM from "@cameronct/mongo-orm";

const AccountLog = new MongoORM.Model("accountLogs", [
    { name: "accountId", type: MongoORM.FieldTypes.String, required: true },
    { name: "action", type: MongoORM.FieldTypes.String, required: true },
    { name: "ipAddress", type: MongoORM.FieldTypes.String, required: true, default: "255.255.255.255" }
], [ 
    { name: "genericAccountId", fields: { accountId: -1 }},
])

export default AccountLog;