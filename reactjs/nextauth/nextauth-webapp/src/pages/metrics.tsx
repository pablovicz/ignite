import { setupApiClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

import styles from '../styles/Home.module.css';


export default function Metrics() {

    return (
        <div className={styles.container}>
            <h1>Metrics Page</h1>
        </div>
    )
}


// pagina só acessivel se o usuario tiver permissoes
export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupApiClient(ctx);
    const response = await apiClient.get('/me');


    return {
        props: {

        }
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
})