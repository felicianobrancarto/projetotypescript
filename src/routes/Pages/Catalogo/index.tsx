import './Catalogo.css'
import { useEffect, useState } from 'react';
import { getCategories, getProduto } from '../../../service/Service';
import { HiOutlineSearch } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

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
    const [searchTerm, setSearchTerm] = useState<string>(''); //pesquisa nome
    const [searchCategory, setSearchCategory] = useState<string>(''); //pesquisa categoria
    const [currentPage, setCurrentPage] = useState<number>(1); //pagina atual
    const [itemsPerPage, setItemsPerPage] = useState<number>(8); //itens por pagina
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const pageCount = Math.ceil(product.length / itemsPerPage); //total de pagina (total itens / por qtd por pagina)
    const startIndex = (currentPage - 1) * itemsPerPage; //indice do array começando por zero
    const endIndex = startIndex + itemsPerPage; // indice final do array, para sber quais produtos serao exigidos.
    const itemsToShow = product.slice(startIndex, endIndex); //lista dos itens da pag atual. slice: tipo um operador de trafico, responsavel por organizar tudo.

    useEffect(() => {
        getBuscaProduto();
    }, [searchTerm, searchCategory, currentPage]); //atualizada a lista de produtos exibida na pagina.

    function handlePageChange(pageNumber: { selected: number }) {
        setCurrentPage(pageNumber.selected + 1);
    } // para atualizar a paginaçao e refletir a nova pagina

    async function SelecionarCategoria(e: any) {
        setSelectedCategory(e)
        if (e === '') {
            getProduto().then((resultado) => setProduct(resultado));
            return;
        } else {
            let resultado = await getCategories(e)
            setProduct(resultado)
        }
    }

    async function getBuscaProduto() {
        const resultado = await getProduto();
        const produtosFiltrados = resultado.filter((item: Produtos) => {
            let titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()); //tolowercase maisc e minus transforma tudo na mesma busca,
            let categoryMatch = item.category.toLowerCase().includes(searchCategory.toLowerCase());
            return titleMatch && categoryMatch;
        });
        setProduct(produtosFiltrados); //funçao de pesquisar produtos por nome
    
    }

    function limparFiltro() {
        setSearchTerm('');
        setSearchCategory('');
        setSelectedCategory('');
        getProduto().then((resultado) => setProduct(resultado));
    }

    return (
        <div className='divPaiCatalogo'>
            <p className='catalogoDeProd'>Catálogo de produtos</p>
            <form onSubmit={(e) => e.preventDefault()} className="barraPesquisa">
                <input type="text" placeholder="Nome do produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="inputsPesquisa" />
                <HiOutlineSearch className='iconPesquisa' />
                <select value={selectedCategory} onChange={(e) => SelecionarCategoria(e.target.value)} className="inputsPesquisa">
                    <option value="">Categoria</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select>
                <button type="submit" className="botaoLimpar" onClick={limparFiltro}>LIMPAR FILTRO</button>

            </form>

            <div className='divBoxx'>
                {itemsToShow.map((item: Produtos) => {
                    console.log(itemsToShow)
                    return (
                        <div className="containerMainn" key={item.id}>
                            <img src={item.image} className="imagemProd" />
                            <Link to={`/catalogo/${item.id}`}>
                                <p className='title'>{item.title}</p>
                            </Link>
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
                className={'pagination'}
                activeClassName={'ativado'}
                nextClassName={'pagination-next custom-next'}
                previousClassName={'pagination-previous custom-previous'}
            />
        </div>
    );
}

export default Catalogo
