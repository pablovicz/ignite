import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>
                            Creating a Monorepo with Learna & Yarn Workspaces
                        </strong>
                        <p>In this guide, youy will learn how to create a Monorepo to amnage multiple packages with a shared build, test, and blablabla</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>
                            Creating a Monorepo with Learna & Yarn Workspaces
                        </strong>
                        <p>In this guide, youy will learn how to create a Monorepo to amnage multiple packages with a shared build, test, and blablabla</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>
                            Creating a Monorepo with Learna & Yarn Workspaces
                        </strong>
                        <p>In this guide, youy will learn how to create a Monorepo to amnage multiple packages with a shared build, test, and blablabla</p>
                    </a>
                </div>
            </main>

        </>
    );
}