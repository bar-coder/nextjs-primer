// /news/:id

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DetailsPage = () => {
    const router = useRouter();

    const newsId = router.query.newsId; // N.B. router.query.<page_name(.js)>

    const nextPage = useMemo(() => {
        const id = parseInt(newsId);
        if (!Number.isNaN(id)) {
            return `/news/${id + 1}`;
        } else {
            return `/news`;
        }
    }, [newsId]);

    return (
        <>
            <h1>Details Page {newsId}</h1>
            <ul>
                <li>
                    {/* 
                        <a> should be used only for navigate outside the site, because
                        IT REQUESTS A NEW PAGE FROM BE, LOOSING SPA CAPABILTIES!

                        <a href={nextPage}>NextJS is tanta-roba</a> 

                        So, in NextJS the built-in Link object must be used, because
                        it can reach outside sites & allow to not loose SPA when navigatin in-app.
                    */}
                    <Link href="https://google.com">
                        NextJS è tanta, tanta ma tanta roba
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default DetailsPage;
