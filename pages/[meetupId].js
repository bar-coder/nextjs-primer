import { MongoClient } from 'mongodb'; // N.B. This package is NOT bundled with frontend!
import MeetupDetails from '../components/meetups/MeetupDetails';
import Head from 'next/head';

const DetailsPage = ({ data }) => {
    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.description} />
            </Head>
            <MeetupDetails
                image={data.image}
                title={data.title}
                address={data.address}
                description={data.description}
            />
        </>
    );
};

export async function getStaticPaths() {
    // N.B. This code runs on server side!!!
    try {
        const client = await MongoClient.connect(
            'mongodb://mongo:example@localhost:27027/nextjs?authSource=admin',
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        var ids = await meetupsCollection
            .find({}, { projection: { _id: true } })
            .toArray();

        client.close();
    } catch (err) {
        console.log(err);
        throw new Error(
            'An error occured while retrieving ids of meetups to be pre-rendered.',
        );
    }
    return {
        fallback: false,
        // 'false' means that 'paths' contains ALL supported identifiers; so if a user enters a not valid id, a 404 page is shown
        // with 'true' NextJS tries to generate the page dinamically on server: this allows to pre-generate ids of page that are visited
        // more frequently (o more susciptible to change in general) & let NextJS generate the one less visited (in case data does not exists, an error is thrown)
        // 'true' returns an empty page immediately & hold down dynamic generated content until it's ready; another option is 'blocking'
        // which displays the page only when data is fetched and the page is fully rendered.

        // It may happen that during development (due to db on same machine) fetching from id DB is done quite immediately, so you always see
        // new added page; in production it may happen a 404 due to the latency with the db machine that may cause a false negative; setting this option
        // to 'true' or 'blocking' solves the issue

        paths: ids.map((idWrapper) => ({
            params: { meetupId: idWrapper._id.toString() },
        })),
        //these objects must be fetched from a DB or an API, generating them dinamically

        // Structure of 'paths' is:
        // [
        //     { params: { meetupId: '2' } },
        //     { params: { meetupId: '3' } },
        //     { params: { meetupId: '4' } },
        //     { params: { meetupId: '5' } },
        // ],
    };
}

export async function getStaticProps(context) {
    // N.B. This code runs on server side!!!
    const response = await fetch('http://localhost:3000/api');
    const meetups = await response.json();

    console.log(meetups);

    const meetupId = context.params.meetupId;
    return {
        props: {
            data: meetups.find((m) => m.id === meetupId),
        },
    };
}

export default DetailsPage;
