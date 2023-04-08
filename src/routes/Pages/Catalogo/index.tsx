import './Catalogo.css'
import testeImagem from '../../Pages/Home/Desenho.svg'
import { useEffect, useState } from 'react';
import { getProduto } from '../../../service/Service';

interface Produtos{
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

        <div className='divBox'>
            {product && product.map((item) => {
console.log(item)
                return (
            
                    <div key='item.id' className="containerMainn">
                        <img src={item.image} />
                        <p></p>
                        <div>
                            <p>{item.title}</p>
                            <p>{item.price}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}
export default Catalogo;