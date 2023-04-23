import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getId } from '../../service/Service';

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
console.log(id)
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
    <div>
      <h2>{produto.title}</h2>
      <img src={produto.image} alt={produto.title} />
      <p>{produto.description}</p>
      <p>{produto.price}</p>
    </div>
  );
}

export default ProdutoDetalhes;
