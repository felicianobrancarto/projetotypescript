import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',

});


export async function getProduto() {
    try {
        const { data } = await api.get(`/products`)
        return data

    } catch (erro) {
        console.log(erro)
    }
}

export async function getCategories(categoria: string) {
    try {
        const { data } = await api.get(`/products/category/${categoria}`)
        return data

    } catch (erro) {
        console.log(erro)
    }
}

export async function getId(id: any) {
    try {
        const { data } = await api.get(`/products/${id}`)
        console.warn(data)
        return data

    } catch (erro) {
        console.log(erro)
    }
}

export async function cadastrarUsuario(usuario: any) {
    try {
        const { data } = await api.post('/users', usuario);
        console.log(cadastrarUsuario)
        return data;
    } catch (erro) {
        console.log(erro);
    }
}

export async function atualizarSenhaUsuario(id: number, novaSenha: string) {
    const response = await axios.put(`https://fakestoreapi.com/users/${id}`, { password: novaSenha });
    return response.data;
}

export default api;