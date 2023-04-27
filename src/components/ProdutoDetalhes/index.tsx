import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getId } from '../../service/Service';
import './ProdutoDetalhes.css'
import { useCallback } from 'react';
import { HiOutlineChevronLeft } from "react-icons/hi";

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

function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produtos | null>(null);
  const BotaoVoltar = useCallback(() => {
    window.location.href = '/catalogo';
  }, []);


  useEffect(() => {
    async function buscarProduto() {
      const resultado = await getId(id);
      console.log(resultado)
      setProduto(resultado);
    }
    buscarProduto();
  }, [id]);

  if (!produto) {
    return <div>Carregando...</div>;
  }
  return (
    <>
    <button onClick={BotaoVoltar} className='botaoVoltar'>
      <HiOutlineChevronLeft className='styleIconBack' /> VOLTAR 
      </button>
    <div className='containerDetalhes'>
      <div className='divImagemComPreço'>
        <div className='divImagemDetalhes'>
        <img src={produto.image} alt={produto.title} className='imagemProdDetalhes'/>
        </div>
        <h2 className='titleDetalhes'>{produto.title}</h2>
        <div className='valoresDetalhes'>
                                    <p className='cifraoDetalhes'>R$</p>
                                    <p className='priceDetalhes'>{produto.price.toFixed(2).replace('.', ',')}</p>
                                </div>
      </div>

      <div className='boxDescription1'>
        <p className='textoDescriçaoprod'>Decrição do Produto</p>
        <p className='description'>{produto.description}</p>
      </div>


    </div>
    </>
  );
}

export default ProdutoDetalhes;
