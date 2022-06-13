import { useRouter } from 'next/router';
import { useCallback } from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetingPage = () => {
    const router = useRouter();

    const addMeetupHandler = useCallback(
        async (payload) => {
            const response = await fetch('/api/new', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            console.log(data);

            router.push('/');
        },
        [router],
    );

    return (
        <>
            <Head>
                <title>Add new meetup</title>
                <meta
                    name="description"
                    content="Add new meetup to meet great people!"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
};

export default NewMeetingPage;
