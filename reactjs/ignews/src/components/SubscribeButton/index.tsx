import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-browser';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

//Lugares no Next em que é possível usar informações secretas sem comprometer a segurança
//- getServerSideProps (SSR)
//- getStaticProps (SSG)
//- API routes

export function SubscribeButton({priceId}: SubscribeButtonProps){

    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe(){
        if(!session){
            signIn('github');
            return;
        }

        if(session.activeSubscription){
            router.push('/posts')
            return;
        }

        // criacao da Checkout Session (*Stripe)
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId });
        } catch(err) {
            alert(err.message);
        }
    }

    return (
        <button 
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}