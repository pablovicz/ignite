import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    type: string;
    amount: number;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     type: string;
//     amount: number;
//     category: string;
// }
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //omite os campos descritos
//type TransactionInput = Pick<Transaction, 'title' | 'amount'| 'type'| 'category'>; // escolhe os campos descritos

interface TransactionProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}



const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transactionInput: TransactionInput){
        
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const { transaction } = response.data;
        setTransactions([...transactions, transaction]);
    }



    return (
        <TransactionsContext.Provider value={{  transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );

}


export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}