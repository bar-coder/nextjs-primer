// /api/new

// N.B. This code runs on server side!!!

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const client = await MongoClient.connect(
                    'mongodb://mongo:example@localhost:27027/nextjs?authSource=admin',
                );
                const db = client.db();

                const meetupsCollection = db.collection('meetups');

                const result = await meetupsCollection.insertOne(
                    req.body,
                );

                client.close();

                res.status(201).json(result);
            } catch (err) {
                console.log(err);
                throw new Error(
                    'An error occured while insertion of meetup',
                );
            }

            break;
        default:
            throw new Error(
                'HTTP method you requested is not handled',
            );
    }
}

export default handler;
