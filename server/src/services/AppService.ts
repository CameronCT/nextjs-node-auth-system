import { Response } from 'express'
import MongoSQL from '../utils/MongoSQL'
import serverLog from '../utils/serverLog'

const error = (type: string = 'service', e: string, query: any[] | unknown = null) => {
    if (!['service', 'route', 'mongo'].includes(type)) type = 'unknown'

    MongoSQL.insertOne('serverLogging', { type, stack: String(e), query: JSON.stringify(query, null, 2), date: new Date().toLocaleString(), created: new Date().getTime() / 1000 })
        .then()
        .catch((e: string) => console.log(e))
}

const measurableAction = async (action: () => Promise<any[]>, collection: string, jsonReport: unknown | object) => {
    let end = 0
    const start = new Date().getTime()
    const response = await action()
    if (response) {
        end = new Date().getTime()
        const diff = end - start
        if (diff >= 100) {
            serverLog('AppService/measurableAction', `Slow MongoSQL Query on ${collection}: ${diff}ms`)
            error('mongo', `Slow MongoSQL Query on ${collection}: ${diff}ms`, jsonReport)
        }
        return response
    } else return null
}

const send = (res: Response, message: string | null = 'ok', data: any = null, statusCode: number = 200) =>
    res.status(statusCode).send({
        status: statusCode || 200,
        message: message || 'ok',
        data: data || null,
    })

const sendDefault = (res: Response, data: any = null, statusCode: number = 200) => res.status(statusCode).send(data)

export default { error, measurableAction, send, sendDefault }
