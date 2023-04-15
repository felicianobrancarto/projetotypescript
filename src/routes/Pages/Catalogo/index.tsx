import './Catalogo.css'
import { useEffect, useState } from 'react';
import { getProduto } from '../../../service/Service';

interface Produtos {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

function Catalogo() {
    const [product, setProduct] = useState<Array<Produtos>>([]);
    useEffect(() => {
        getBuscaProduto()
    }, []);
    async function getBuscaProduto() {
        let resultado = await getProduto()
        setProduct(resultado)
    }

    return (

        <div className='divBoxx'>
            {product && product.map((item) => {
                return (
                    <div key={item.id} className="containerMainn">
                        <img src={item.image} className="imagemProd" />
                        <p className='title'>{item.title}</p>
                        <div className='valores'>
                            <p className='cifrao'>R$</p>
                            <p className='price'>{item.price.toFixed(2)}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}
export default Catalogo;