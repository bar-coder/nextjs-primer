import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const client = await MongoClient.connect(
                    'mongodb://mongo:example@localhost:27027/nextjs?authSource=admin',
                );
                const db = client.db();

                const meetupsCollection = db.collection('meetups');

                const result = await meetupsCollection
                    .find()
                    .toArray();

                client.close();

                res.status(200).json(
                    result.map((r) => ({
                        title: r.title,
                        address: r.address,
                        description: r.description, // because the same API is used for retrieve single element too (too bored to build the 'findOne' with Mongo :P)
                        image: r.image,
                        id: r._id.toString(),
                    })),
                );
            } catch (err) {
                console.log(err);
                throw new Error(
                    'An error occured while insertion of meetup',
                );
            }
            break;
        default:
            throw new Error('Unhandled method.');
    }
}
