import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";


interface SearchResultsProps {
    results: {
        totalPrice: number; 
        data: Array<{
          id: number;
          title: string;
          price: number;
          priceFormatted: string;
        }>
    }

    onAddToWishList: (id: number) => void;
}



export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {

    // const totalPrice = useMemo(() => {
    //     return results.reduce((total, product) => {
    //         return total + product.price;
    //     }, 0);
    // }, [results]);


    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem product={results.data[index]} onAddToWishList={onAddToWishList}/>
            </div>
        );
    }


    return (
        <div>
            <h2>{`Preço Total: R$${results.totalPrice},00`}</h2>

            {/* {results.data.map(product => {
                return (
                    <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList}/>
                );
            })} */}
            <List 
                height={300}  //Auto -> seta automaticamente a maxima altura
                rowHeight={30}
                width={900}
                overscanRowCount={5}
                rowCount={results.data.length}
                rowRenderer={rowRenderer}
            
            />

        </div>
    )
}




/** 
 *   VIRTUALIZAÇÃO
 * 
 * 
 *  -> OBJETIVO
 *    faz o react carregar no HTML somente os itens que estão visíveis no 
 *   navegador do usuário
 * 
 * 
 *    QUANDO UTILIZAR
 * 
 *   em páginas em que existem muitos elementos em tela (scroll infinito)
 * 
 * 
 *   -> LIB (tem nativo, mas é mais facil usar lib)
 *      
 *        yarn add react-virtualized
 *      
 */