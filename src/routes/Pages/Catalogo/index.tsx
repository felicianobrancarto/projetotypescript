import './Catalogo.css'
import { useEffect, useState } from 'react';
import { getProduto } from '../../../service/Service';
import { HiOutlineSearch } from "react-icons/hi";
import ReactPaginate from 'react-paginate';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  
    useEffect(() => {
      getBuscaProduto();
    }, [searchTerm, searchCategory]);
  
    function handlePageChange(pageNumber: any) {
      setCurrentPage(pageNumber.selected + 1);
    }
  
    async function getBuscaProduto() {
      let resultado = await getProduto();
      let produtosFiltrados = resultado.filter((item: Produtos) => {
        let titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        let categoryMatch = item.category.toLowerCase().includes(searchCategory.toLowerCase());
        return titleMatch && categoryMatch;
      });
      setProduct(produtosFiltrados);
    }
  
    const pageCount = Math.ceil(product.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = product.slice(startIndex, endIndex);
  
    return (
      <div className='divPaiCatalogo'>
        <p>Catálogo de produtos</p>
        <form onSubmit={(e) => e.preventDefault()} className="barraPesquisa">
          <input type="text" placeholder="Nome do produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="inputsPesquisa"/>
          <HiOutlineSearch className='iconPesquisa'/>
          <input type="text" placeholder="Categoria" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="inputsPesquisa"/>
          <button type="submit" className="inputsPesquisa">LIMPAR FILTRO</button>
        </form>
        <div className='divBoxx'>
          {itemsToShow.map((item: Produtos) => {
            return (
              <div key={item.id} className="containerMainn">
                <img src={item.image} className="imagemProd" />
                <p className='title'>{item.title}</p>
                <div className='valores'>
                  <p className='cifrao'>R$</p>
                  <p className='price'>{item.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            )
          })}
        </div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
  
  export default Catalogo
  