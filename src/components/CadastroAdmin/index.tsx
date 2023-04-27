import { cadastrarUsuario } from '../../service/Service'; // importe a função aqui
import axios from 'axios';
import './CadastroAdmin.css';
import { useState } from 'react';


interface Usuario {
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string,
    },
    address: {
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation: {
            lat: string,
            long: string,
        },
    },
    phone: number,

}

function CadastroAdmin() {
    const [usuario, setUsuario] = useState<Usuario>({
        email: "",
        username: "",
        password: "",
        name: {
            firstname: "",
            lastname: "",
        },
        address: {
            city: "",
            street: "",
            number: 0,
            zipcode: "",
            geolocation: {
                lat: "",
                long: "",
            },
        },
        phone: 0,
    });

    async function handleCadastroUsuario() {
        const response = await cadastrarUsuario(usuario);
        console.log(response);

        if (response) {
            const id = response.id;
            const getUserResponse = await axios.get(`https://fakestoreapi.com/users/${id}`);
            console.log(getUserResponse.data); // log the response data
        }
    }

    async function atualizarSenhaUsuario(userId: number, password: string): Promise<void> {
        try {
          const response = await axios.put(`https://fakestoreapi.com/users/${userId}`, { password });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
   
    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        handleCadastroUsuario();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setUsuario(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }

    return (
        <div className='containerCadastro'>
            <form className='form'>
                <div>
                    <p className='nameCadastro'>CADASTRO</p>
                </div>

                <div>
                    <input type="text" placeholder='Email' className='inputCadastro' id="email" onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder='Nome do usuário' className='inputCadastro' id="username" onChange={handleChange} />
                </div>
                <div>
                    <input type="password" placeholder='Senha' className='inputCadastro' id="password" onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder='Primeiro nome' className='inputCadastro' id="firstname" />
                </div>
                <div>
                    <input type="text" placeholder='Ultimo nome' className='inputCadastro' id="lastname" />
                </div>
                <div>
                    <input type="text" placeholder='Cidade' className='inputCadastro' id="city" />
                </div>
                <div>
                    <input type="text" placeholder='Rua' className='inputCadastro' id="street" />
                </div>
                <div>
                    <input type="text" placeholder='Número' className='inputCadastro' id="number" />
                </div>
                <div>
                    <input type="text" placeholder='Código postal' className='inputCadastro' id="zipcode" />
                </div>
                <div>
                    <input type="text" placeholder='Telefone' className='inputCadastro' id="phone" />
                </div>

                <div className='BotaoCadastrarUsuario'>
                    <button type="submit" className='buttonFormUsers' onClick={handleSubmit}>CADASTRAR</button>
                </div>

            </form>
        </div>

    )
}

export default CadastroAdmin;