import {MongoClient, ObjectId} from "mongodb";

const mongodb = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'Banking';

let database;
const client = new MongoClient(uri);
export const dbStartup = async () => {
    try {
        await client.connect();
        database = client.db(dbName);
    } catch (error){
        await client.close();
    }
};
export const getHashedPassword = async (email) => {

};

const isDocumentExist = async (email) => {
    const collection = database.collection('Accounts');
    const verifier = new ObjectId(email);
    const exist = await collection.findOne({ _id: email });

    return exist !== null;
};

export const addNewAccount = async (accountData) => {
    const collection = database.collection('Accounts');
    const documentId = accountData.email;
    if (await isDocumentExist(documentId)){
        return false;
    }

    const { [email]: omitted, ...data } = accountData;
    // const data = { ...accountData};
    // delete data[email];
    await collection.insertOne({ _id: documentId})
    const objectId = new ObjectId(documentId);
    await collection.updateOne(
      { _id: objectId },
      { set: data }
    );

    return true;
};


export const getAccountData = async (requestedDataArray, identifier) => {

};

