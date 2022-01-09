import type { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { parseCookies } from 'nookies';

import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/Home.module.css';
import { withSSRGuests } from '../utils/withSSRGuest';


export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email, password
    }
    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.title}>
        <h2>Next - Example</h2>
        <h3>Authentication & Authorization</h3>
      </div>
      <input
        className={styles.input}
        type="email"
        placeholder="Insert your email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Insert your password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}



export const getServerSideProps = withSSRGuests(async (ctx) => {

  return {
    props : {
      
    }
  }
}) 
