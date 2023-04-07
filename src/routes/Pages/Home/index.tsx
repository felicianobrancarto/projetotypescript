import { Button } from '../../../components'
import Imagem from './Desenho.svg'
import './Home.css'


export const Home = () => {

    return (

        <div className='containerMain'>
            <div className='boxEsquerdoMain'>
                <p className='p1'>Conheça o melhor catálogo de produtos</p>
                <p className='p2'>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</p>
                <Button />
            </div>
            <div>
                <img src={Imagem} alt='Imagem main' className='boxImagem'></img>
            </div>
        </div>
    )
}