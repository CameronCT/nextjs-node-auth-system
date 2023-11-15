import { create as MongoCreate, Db } from '@rakered/mongo'

class MongoSQL {
    static $mongoConnection: Db
    static $mongoModels: string[]

    constructor(uri: string | null, listOfModels?: string[]) {
        MongoSQL.$mongoConnection = MongoCreate(!uri ? 'mongodb://127.0.0.1:27017/newapp' : uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        MongoSQL.$mongoModels = listOfModels || []
        if (MongoSQL.$mongoConnection) {
            MongoSQL.generateIndexes().then(() => console.log('[MongoDB] generateIndexes has been called!'))

            console.log('[MongoDB] Connection initialized!')
            return MongoSQL.$mongoConnection
        }
        return
            throw Error('Unable to connect to MongoDB from MongoSQL!')
    }

    public static sanitize(v: any) {
        if (v instanceof Object) {
            for (const key in v) {
                if (/^\$/.test(key)) {
                    delete v[key]
                } else {
                    MongoSQL.sanitize(v[key])
                }
            }
        }
        return v
    }

    public static async aggregate(collectionName: string, filter: any, options: any = {}): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        return await MongoSQL.$mongoConnection[collectionName].aggregate(filter, options)
    }

    public static async findOne(collectionName: string, filter: any, options: any = {}): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        return await MongoSQL.$mongoConnection[collectionName].findOne(filter, options)
    }

    public static async find(collectionName: string, query: any, options: any = {}): Promise<null | any[]> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        return await MongoSQL.$mongoConnection[collectionName].find(query, options)
    }

    public static async count(collectionName: string, query: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        return await MongoSQL.$mongoConnection[collectionName].countDocuments(query)
    }

    public static async findOneAndUpdate(collectionName: string, filter: any, update: any, upsert: boolean = false, useModifier: string = '$set'): Promise<null | any[] | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].findOneAndUpdate(filter, { [useModifier]: update }, { upsert: upsert, returnDocument: 'after' })
        if (result && result.ok) return result.value
        else return null
    }

    public static async updateMany(collectionName: string, filter: any, document: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].updateMany(filter, { $set: document })
        if (result) return true
        else return null
    }

    public static async deleteMany(collectionName: string, filter: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].deleteMany(filter)
        if (result) return true
        else return null
    }

    public static async deleteOne(collectionName: string, filter: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].deleteOne(filter)
        if (result) return true
        else return null
    }

    public static async insertOne(collectionName: string, document: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].insertOne(document)
        if (result && result.insertedCount >= 1) return result.ops[0]
        else return null
    }

    public static async insertMany(collectionName: string, document: any): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const result = await MongoSQL.$mongoConnection[collectionName].insertMany(document)
        if (result && result.insertedCount >= 1) return result.ops[0]
        else return null
    }

    /*
     * Custom Methods
     */
    public static async findOneOrCreate(collectionName: string, filter: any, document: any | null = null): Promise<null | any> {
        if (!MongoSQL.$mongoModels.includes(collectionName)) throw Error(`Invalid collectionName ${collectionName}.`)

        const findOne = await MongoSQL.$mongoConnection[collectionName].findOne(filter)
        if (findOne) return findOne
        else {
            const insert = await MongoSQL.$mongoConnection[collectionName].insertOne(document)
            if (insert && insert.insertedCount >= 1) return insert.ops[0]
            else return null
        }
    }

    /*
     * Generate Indexes
     */
    public static async generateIndexes() {
        if (await MongoSQL.$mongoConnection['accounts'].findOne({})) {
            MongoSQL.$mongoConnection['accounts'].createIndex({ accountId: -1 }, { unique: true }).then()
            MongoSQL.$mongoConnection['accounts'].createIndex({ emailAddress: -1 }).then()
            MongoSQL.$mongoConnection['accounts'].createIndex({ created: -1 }).then()
            console.log('[MongoDB] Creating indexes for accounts')
        }
    }
}

export default MongoSQL
