/* / */
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
    // N.B. these 'props' are loaded from `getStaticProps().props` oppure 'getServerSideProps().props`
    return !!props.meetups?.length ? (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="React Meetups is a greate primer for this wonderful framework: NextJS"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    ) : (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <h1>No meetups created yet!</h1>
        </div>
    );
};

// N.B. il codice riportato di seguito viene sempre eseguito a livello di server e NON a livello di client!!!

// STATIC-SITE GENERATION (ideal when data does not change at all or change very rarely -- tunable with 'revalidate' param)
export async function getStaticProps() {
    // do some async server operation (API fetch, file reading, access database ecc.)
    const response = await fetch('http://localhost:3000/api');
    const meetups = await response.json();

    return {
        props: {
            meetups: meetups,
        },
        revalidate: 86400, // La pagina viene generata con i dati aggiornati: - all'atto della build - ogni giorno (86400 secondi) SE viene fatta una richiesta a quella pagina (non avviene in automatico)
    };
}

// SERVER-SIDE RENDERING (idel when data changes frequently - more time requested intrinsically compared to SSG)
// export async function getServerSideProps(context) {
//     // viene sempre richiesta la generazione di una pagina aggiornata ad ogni richiesta al server

//     const { req, res } = context;

//     // do some async server operation (API fetch, file reading, access database ecc.)

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export default HomePage;
