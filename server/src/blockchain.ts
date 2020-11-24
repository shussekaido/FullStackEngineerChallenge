import { log } from './logger'
import { MongoClient } from 'mongodb'
import ProvenDB from '@southbanksoftware/provendb-node-driver'

const SERVICE_USERNAME = 'ppuser'
const SERVICE_PASSWORD = 'VerySafePassword'
const SERVICE_NAME = 'ppchain'
const provenDB_URI = `mongodb://${SERVICE_USERNAME}:${SERVICE_PASSWORD}@ppchain.provendb.io/ppchain?ssl=true`
const collectionName = 'provenReviewsTest'
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
export const addRecord = async(record: Object) => {
  const result = await collection.insertOne(record)
  log.debug('Inserted a document.')
  return result
}

// Fetch one record. Query example: { name: 'Michael' }
export const getRecord = async(query: Object) => {
  const result = await collection.find(query)
  log.debug(`Record: ${JSON.stringify(result, null, 4)}`)
  return result
}

// Fetch all records
export const getAllRecords = async() => {
  const result = await collection.find().toArray()
  log.debug(`Records: ${JSON.stringify(result, null, 4)}`)
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
  log.debug(`Submitted Proof: ${JSON.stringify(result, null, 4)}`)
  return result
}

// Get blockchain proof
export const getProof = async() => {
  const result = await pdb.getProof()
  log.debug(`Latest Proof Is: ${JSON.stringify(result, null, 4)}`)
  return result
}

// Check current version of the entire collection
export const getCollectionVersion = async() => {
  const result = await pdb.getVersion()
  log.debug(`Version was ${result.version}.`)
  return result
}

// Fetch the history of a record. Query example: { name: 'Michael' }
export const getRecordVersion = async(query: Object) => {
  const response = await pdb.docHistory(collectionName, query)
  const result =response.docHistory[0]
  log.debug(`History for document: ${JSON.stringify(result, null, 4)}`)
  return result
}