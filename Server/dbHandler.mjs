import {MongoClient, ObjectId} from "mongodb";
import * as crypto from "crypto";

// const mongodb = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'Banking';
const MIN_STARTING_BALANCE = 1000;
const MAX_STARTING_BALANCE = 1000000;

let database;
const client = new MongoClient(uri);

export const dbStartup = async () => {
    try {
        await client.connect();
        database = client.db(dbName);
    } catch (error) {
        console.error('Error connecting to DB:', error);
        process.exit(1);
    }
};

export const dbShutDown = async () => {
    try {
        await database.dropDatabase();
        await client.close();
    } catch (error) {
        console.error("Error closing DB connection:", error);
        process.exit(1);
    }
};

export const getDocumentValues = async (documentId, keys, collectionName) => {
    const hashDocumentId = getHashString(documentId);
    try {
        if (!await isDocumentExist(hashDocumentId, collectionName)) {
            console.log(`Document: ${documentId} not exist !`);
            return;
        }
        const extractedValues = {};
        const collection = database.collection(collectionName);
        const document = await collection.findOne({_id: hashDocumentId});

        keys.forEach(key => {
            if (document[key] !== undefined) {
                extractedValues[key] = document[key];
            } else {
                console.error(`Key ${key} not found in document ${documentId}`);
            }
        });
        return extractedValues;

    } catch (error) {
        console.error(`Error retrieving value from ${documentId}: `, error);
        return null;
    }
};

async function isDocumentExist(documentId, collectionName) {
    try {
        const collection = database.collection(collectionName);
        const exist = await collection.findOne({_id: documentId});

        return exist !== null;
    } catch (error) {
        console.error(`Error checking document existence: `, error);
        return false;
    }
}

export const addFieldsToDocument = async (data, documentId, collectionName) => {
    try {
        if (!await isDocumentExist(documentId, collectionName)) {
            console.log(`Document: ${documentId} not exist !`);
            return;
        }
        const collection = database.collection(collectionName);
        await collection.updateOne(
            {_id: documentId},
            {$set: data}
        );
    } catch (error) {
        console.error(`Error adding fields to document: `, error);
    }
};

export const addDataToSetFieldDocument = async (data, documentId, collectionName) => {
    try {
        if (!await isDocumentExist(documentId, collectionName)) {
            console.log(`Document: ${documentId} not exist !`);
            return;
        }
        const collection = database.collection(collectionName);
        const result = await collection.updateOne(
            {_id: documentId},
            {$addToSet: data}
        );

        if (result === 0) {
            console.log(`No data add to document ${documentId}`);
        }
    } catch (error) {
        console.error(`Error adding data to field in document: `, error);
    }
};

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHashString(str){
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash.substring(0, 24);
}

function decodeHashString(hashString){
    const binaryData = Buffer.from(hashString, 'hex');
    const base64String = binaryData.toString('base64');
    return Buffer.from(base64String, 'base64').toString('utf-8');
}


export const addNewDocument = async (accountData, collectionName) => {
    try {
        const collection = database.collection(collectionName);
        const email = accountData.email;

        const documentId = getHashString(email);
        if (await isDocumentExist(documentId, collectionName)) {
            return false;
        }
        const data = { ...accountData};
        delete data.email;
        // const {[email]: omitted, ...data} = accountData;
        data['balance'] = {USD: generateRandomNumber(MIN_STARTING_BALANCE, MAX_STARTING_BALANCE)};
        data['transactions'] = [];
        await collection.insertOne({_id: documentId})
        console.log("data = ", data);

        await addFieldsToDocument(data, documentId, collectionName);
        // const objectId = new ObjectId(documentId);
        // await collection.updateOne(
        //     {_id: objectId},
        //     {set: data}
        // );

        return true;
    } catch (error) {
        console.error(`Error adding new document ${accountData}: `, error);
        return false;
    }
};


