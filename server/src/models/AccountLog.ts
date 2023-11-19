import MongoODM from "@cameronct/mongo-odm";

const AccountLog = new MongoODM.Model("accountLogs", [
    { name: "accountId", type: MongoODM.FieldTypes.String, required: true },
    { name: "action", type: MongoODM.FieldTypes.String, required: true },
    { name: "ipAddress", type: MongoODM.FieldTypes.String, required: true, default: "255.255.255.255" }
], [ 
    { name: "genericAccountId", fields: { accountId: -1 }},
])

export default AccountLog;