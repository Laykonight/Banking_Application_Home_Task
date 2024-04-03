import {MongoClient, ObjectId} from "mongodb";

// const mongodb = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'Banking';
const MIN_STARTING_BALANCE = 1000;
const MAX_STARTING_BALANCE = 60000000;

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
        await client.close();
        // console.log('DB connection was close');
    } catch (error) {
        console.error("Error closing DB connection:", error);
        process.exit(1);
    }
};

export const getDocumentValues = async (documentId, keys, collectionName) => {
    try {
        if (!await isDocumentExist(documentId, collectionName)) {
            console.log(`Document: ${documentId} not exist !`);
            return;
        }
        const extractedValues = {};
        const collection = database.collection(collectionName);
        const document = await collection.findOne({_id: new ObjectId(documentId)});

        keys.forEach(key => {
            if (document[key] !== undefined) {
                extractedValues[key] = document[key];
            } else {
                console.error(`Key ${key} not found in document ${documentId}`);
            }
        });
        return extractedValues;

        // const result = await collection.findOne({_id: new ObjectId(documentId)});
        // if (result && key in result) {
        //     return result[key];
        // }
        // console.log(`Key ${key} not found in the document ${documentId}`);
        // return null;
    } catch (error) {
        console.error(`Error retrieving value from ${documentId}: `, error);
        return null;
    }
};

async function isDocumentExist(documentId, collectionName) {
    try {
        const collection = database.collection(collectionName);
        const verifier = new ObjectId(documentId);
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
        const objectId = new ObjectId(documentId);

        await collection.updateOne(
            {_id: objectId},
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
        const objectId = new ObjectId(documentId);

        const result = await collection.updateOne(
            {_id: objectId},
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

export const addNewDocument = async (accountData, collectionName) => {
    try {
        const collection = database.collection(collectionName);
        const documentId = accountData.email;
        if (await isDocumentExist(documentId, collectionName)) {
            return false;
        }
        // const data = { ...accountData};
        // delete data[email];
        const {[email]: omitted, ...data} = accountData;
        data['balance'] = generateRandomNumber(MIN_STARTING_BALANCE, MAX_STARTING_BALANCE);
        data['transactions'] = [];
        await collection.insertOne({_id: documentId})

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


