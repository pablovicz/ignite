import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

import styles from '../styles/Home.module.css';
import { Can } from "../components/Can";


export default function Dashboard() {
    const { user, signOut } = useContext(AuthContext);


    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => { console.log(err) })
    }, [])


    return (
        <div className={styles.container}>
            <h3>Welcome to Dashboard!</h3>
            <p>Your access are:</p>
            <p>{user?.email}</p>

            <Can roles={['administrator']}>
                <p>You are a <strong>admistrator</strong>!</p>
            </Can>
            <Can roles={['editor']}>
                <p>You are a <strong>editor</strong>!</p>
            </Can>

            <Can permissions={['metrics.list']}>
                <div className={styles.metrics}>
                    <h3>Has metrics permissions</h3>
                </div>
            </Can>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupApiClient(ctx);


    const response = await apiClient.get('/me');

    console.log(response.data)



    return {
        props: {

        }
    }
})