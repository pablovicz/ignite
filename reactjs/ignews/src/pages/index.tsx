import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss'; 


// NEXT 
// Client-side (CS) -> demais casos, quando não é necessária indexaxão, informações requeridas por ação do usuário, informaçòes que nao tem necessidade de serem carregadas logo no carregamento da página, etc
// Server-side Rendering (SSR) -> usamos quando se necessita indexaxão, mas também necessários dados da sessão do usuário, informações em tempo real do usuário, do contexto da aplicação, etc
// Static Site Generation (SSG) -> casos em que a gente consegue gerar e compartilhar o html da pagina para todos os usuarios da aplicacao (paginas iugual para todo mundo, com indexacao do google)



interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}


export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News aboute the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>

  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JfV8CCCFdHpqT2iJyVYT6jq')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), //sempre em centavos
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24 horas -> quanto tempo em segundos a pagina deve se manter antes de ser revalidada
  }
}