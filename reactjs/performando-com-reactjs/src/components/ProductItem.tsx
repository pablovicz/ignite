import { memo, useState } from "react";
// import { AddProductToWishList } from "./AddProductToWishList";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from 'next/dynamic';
// ou import { lazy } from "react";

// para pesar no bundle -> teste
import lodash from "lodash";



const AddProductToWishList = dynamic<AddProductToWishListProps>(async () => {
    const mod = await import('./AddProductToWishList');
    return mod.AddProductToWishList;
    // pq tá export sem default, caso for default somente -> import('./AddProductToWishList')
}, {
    loading: () => <span>Carregando...</span>
})


interface ProductItemProps {
    product: {
        id: number;
        title: string;
        price: number;
        priceFormatted: string;
    }
    onAddToWishList: (id: number) => void;
}


function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {

    const [isAddingToWishList, setIsAddingToWishList] = useState(false);


    // importar alguma biblioteca somente no momento em que ela vai ser usada
    // async function showFormattedDate() {
    //     const { format } = await import('date-fns');

    //     format()
    // }

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            {/* <button onClick={() => onAddToWishList(product.id)}>Add to Wish List</button> */}
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            {isAddingToWishList && (
                <AddProductToWishList
                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    );
}


// MEMO
/**
 * Previne que seja criada uma nova versão do componente
 * caso nenhuma alteração tenha sido feita sobre ele
 * 
 * Default o memo faz shallow compare (comparação rasa)
 * -> quando passamos o segundo argumento, o memo usa essa função
 * para decidir se o novo componente é diferente do anterior, e portanto,
 * a renderização deve ser feita
 */
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    //return Object.is(prevProps.product, nextProps.product);
    return lodash.isEqual(prevProps.product, nextProps.product);
});


// quando utilizar MEMO
/**
 * 1. Pure Functional Components - componentes que são usados apenas para duvidir a interface da aplicação
 *      |
 *       --> Funções que quando são  usados os mesmos argumentos geram o mesmo resultado
 * 2. Renders too often - componentes que renderizam demais
 * 3. Re-renders with same props - componentes que renderizam com as mesmas props
 * 4. Medium to big components size - componentes que sejam grandes, o uso do memo traz mais ganhos, para casos de compoenentes pequenos, não existe tanta necessidade
 */




/**
 *  LAZY LOADING - Code Splitting
 * 
 *  -> Conseguimos carregar (importar) uma funçào e ou compoenente somente quando
 *  este for ser (e se) for exibido em tela
 * 
 *  QUANDO UTILIZAR
 * 
 *  -> quando existe um componetne que vai ser renderizado segundo alguma condicional
 */