import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',

});


export async function getProduto() {
    try{
        const {data} = await api.get(`/products`)
        return data

    }catch(erro){
console.log(erro)
    }
}

export async function getCategories(categoria:string) {
    try{
        const {data} = await api.get(`/products/category/${categoria}`)
        return data

    }catch(erro){
console.log(erro)
    }
}

export default api;