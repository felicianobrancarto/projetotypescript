import { Link } from 'react-router-dom';
import './FormularioLogin.css'
import Button from '../Button'

function FormularioLogin() {
    function acessarAdmin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log("Testando") 
    }
    return (
        <div>
            <form className='containerLogin'>
                <div>
                <p className='nameLogin'>LOGIN</p>
                </div>
                
                <div>
                    <input type="text" placeholder='Email' className='inputEmail'/>
                </div>
                <div>
                    <input type="password" placeholder='Senha' className='inputSenha' />
                </div>
                <div className='textoResetSenha'>
                    <Link to="esqueci_senha.php" className='estiloLink'>Esqueci a senha?</Link>
                </div>
                <div className='estiloBotao'>
                    {/*<Button type="submit" onClick={acessarAdmin}>LOGAR</Button>*/}
                </div>
                <div>
                <a href="cadastro.php">Não tem Cadastro? CADASTRAR</a>
                </div>


            </form>
        </div>
    );
}

export default FormularioLogin;