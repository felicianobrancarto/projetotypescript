import { wait } from '@testing-library/user-event/dist/utils';
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

export default api;