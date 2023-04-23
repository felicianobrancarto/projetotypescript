import './Catalogo.css'
import { useEffect, useState } from 'react';
import { getCategories, getProduto, getId } from '../../../service/Service';
import { HiOutlineSearch } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import ProdutoDetalhes from '../../../components/ProdutoDetalhes';

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
    const [productDetalhes, setProductDetalhes] = useState<Array<Produtos>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string>(''); //limpar pesquisa
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const pageCount = Math.ceil(product.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = product.slice(startIndex, endIndex);

    useEffect(() => {
        getBuscaProduto();
    }, [searchTerm, searchCategory, currentPage]);


    function handlePageChange(pageNumber: { selected: number }) {
        setCurrentPage(pageNumber.selected + 1);
    } // para atualizar a paginaçao e refletir a nova pagina

    async function SelecionarCategoria(e: any) {
        setSelectedCategory(e)
        if (e === '') {
            return
        } else {
            let resultado = await getCategories(e)
            setProduct(resultado)

        }

    }
    async function abrirDetalhes(e: any) {
        let detalhes = await getId(e)
        setProductDetalhes(detalhes)
    } //modal detalhes produto

    async function getBuscaProduto() {
        let resultado = await getProduto();
        let produtosFiltrados = resultado.filter((item: Produtos) => {
            let titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <option value="jewelery">jewelery"</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select>
                <button type="submit" className="botaoLimpar" onClick={limparFiltro}>LIMPAR FILTRO</button>

            </form>

            <div className='divBoxx'>
                {itemsToShow.map((item: Produtos) => {
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
