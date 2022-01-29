import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

interface Results {
  totalPrice: number; 
  data: Array<{
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  }>
}



export default function Home() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })


  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!search.trim()){
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data = await response.json();


    const formatter = new Intl.NumberFormat('pt-BR', { 
      style: "currency",
      currency: "BRL"
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0)

    // sempre formatar e fazer os calculos devidos na hora da busca pelos dadosm
    // assim eles são somente calculados uma unica vez, e não toda vez em que há 
    // renderização dos componentes em que são usadados


    setResults({totalPrice, data: products});
  }


  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, [])
  // async function addToWishList(id: number){
  //   console.log(id);
  // }


  return (
   <div>
     
     <h1>Search</h1>
     <form onSubmit={handleSearch}>
       <input
         type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
     </form>
     <SearchResults 
      results={results} 
      onAddToWishList={addToWishList}
      />
   </div>
  )
}



/**
 * FLUXO DE RENDERIZAÇÃO DE COMPONENTES NO REACT
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */




/**
 *      useMemo
 * 
 * 
 * useMemo(() => {}, [])
 *          ---|---    |-> array de depedencias
 *             |-> função de calculo            
 *            
 * 
 * -> Objetivo
 * Tem como proposito evitar que alguma coisa que ocupe muito processamento 
 * (calculo, etc..) dentro do componente seja refeito toda vez que o componente 
 * renderizar
 * 
 * -> o calculo e ou reprocessamento só será feito caso alguma das variavels do array de denpedencias mudar
 * -> evita a criação de um novo espaço de memória para a operação que tiver os mesmos parametros
 * 
 * 
 *  QUANDO UTILIZAR
 * 
 * 1. Calculos pesados (não usar para coisas simples);
 * 2. Igualdade refencial (quando a gente repassa aquela informação (ex: calculo) a um componente filho)
 * 
 */


/**
 *           useCallback
 * 
 * 
 * -> Objetivo
 * Serve para memorizar uma função, e não um valor
 */




