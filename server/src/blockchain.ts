import { log } from './logger'
import { MongoClient, ObjectID } from 'mongodb'
import ProvenDB from '@southbanksoftware/provendb-node-driver'

const SERVICE_USERNAME = 'ppuser'
const SERVICE_PASSWORD = 'VerySafePassword'
const SERVICE_NAME = 'ppchain'
const provenDB_URI = `mongodb://${SERVICE_USERNAME}:${SERVICE_PASSWORD}@ppchain.provendb.io/ppchain?ssl=true`
const collectionName = 'provenReviews'
let connection
let dbObject
let collection
let pdb

export const initBlockchain = async () => {
  try {
    connection = await MongoClient.connect(provenDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    dbObject = await connection.db(SERVICE_NAME)
    pdb = new ProvenDB.Database(dbObject)
    collection = pdb.collection(collectionName)
  } catch(error) {
    log.error('Error connecting to ProvenDB:')
    log.error(error)
  }
}

// Add a document object
/*
  Sample response:
  {
    "result": {
        "ok": 1,
        "n": 1
    },
    "connection": {
        "_events": {},
        "_eventsCount": 4,
        "id": 1,
        "address": "52.155.36.122:27017",
        "bson": {},
        "socketTimeout": 0,
        "host": "ppchain.provendb.io",
        "port": 27017,
        "monitorCommands": false,
        "closed": false,
        "destroyed": false,
        "lastIsMasterMS": 110
    },
    "ops": [
        {
            "_id": "5fbc71fc15252d5f7692566f"
        }
    ],
    "insertedCount": 1,
    "insertedId": "5fbc71fc15252d5f7692566f",
    "ok": 1,
    "n": 1
  }
*/
export const addRecord = async(record: Object) => {
  const result = await collection.insertOne(record)
  log.info('Inserted a document.')
  return result
}

// Fetch one record. Query example: { name: 'Michael' }
export const getRecord = async(query: Object) => {
  log.info(JSON.stringify(query))
  const result = await collection.find(query).toArray()
  log.info(`Record: ${JSON.stringify(result, null)}`)
  return result
}

// Fetch one record by id
export const getRecordById = async(id) => {
  const _id = new ObjectID(id)
  const query = { _id: _id}
  const result = await collection.find(query).toArray()
  log.info(`Record: ${JSON.stringify(result, null)}`)
  return result
}

// Update record
export const updateRecord = async(id, record) => {
  const _id = new ObjectID(id)
  const query1 = { _id: _id }
  const query2 = { $set: { ...record }}
  console.dir(query2)

  const result = await collection.updateOne(query1, query2)
  log.info(`Record: ${JSON.stringify(result, null)}`)
  return result
}

// Fetch all records
export const getAllRecords = async() => {
  const result = await collection.find().toArray()
  log.info(`Records: ${JSON.stringify(result, null)}`)
  return result
}

// Fetch records by query
export const queryAllRecords = async(query: Object) => {
  const result = await collection.find(query).toArray()
  log.info(`Records: ${JSON.stringify(result, null)}`)
  return result
}

/* Create blockchain proof
    Example response:
    Submitted Proof: {
      "ok": 1,
      "version": 68,
      "dateTime": "2019-07-01T06:40:32.000Z",
      "hash": "0ad12bf41ab2a7047148d5ee30cc61284f11676bf0e907a38741a740db072ca4",
      "proofId": "1ffbe8e0-9bcb-11e9-a57b-01d798cd6796",
      "status": "Pending"
    }
*/
export const createProof = async() => {
  const result = await pdb.submitProof()
  log.info(`Submitted Proof: ${JSON.stringify(result, null)}`)
  return result
}

// Get blockchain proof
export const getProof = async() => {
  const result = await pdb.getProof()
  log.info(`Latest Proof Is: ${JSON.stringify(result, null)}`)
  return result
}

// Check current version of the entire collection
export const getCollectionVersion = async() => {
  const result = await pdb.getVersion()
  log.info(`Version was ${result.version}.`)
  return result
}

// Fetch the history of a record. Query example: { name: 'Michael' }
export const getRecordVersion = async(id) => {
  const _id = new ObjectID(id)
  const query = { _id: _id}
  const response = await pdb.docHistory(collectionName, query)
  const result = response.history[0]
  log.info(`History for document: ${JSON.stringify(result, null)}`)
  return result
}