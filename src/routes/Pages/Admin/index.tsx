import './Admin.css';
import Imagem from './imagemAdmin.svg';
import FormularioLogin from '../../../components/FormularioLogin';

function index() {
    return (
        <div className='containerAdmin'>
            <div>
                <p className='text1'>Divulgue seus produtos no DS Catalog</p>
                <p className='text2'>Faça parte do nosso catálogo de divulgação e aumente a venda dos seus produtos.</p>
                <img src={Imagem} alt='Imagem Admin' className='imagemAdmin'></img>
            </div>
            <div>
                <FormularioLogin />
            </div>
        </div>
    );
}

export default index;