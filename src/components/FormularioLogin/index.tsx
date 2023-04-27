import { Link } from 'react-router-dom';
import './FormularioLogin.css'
import { FaChevronRight } from 'react-icons/fa';

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
                    <button type="submit" className='buttonForm'>LOGAR <FaChevronRight className="iconForm"/></button>
                </div>
                <div className='cadastroAdmin'>
                <p>Não tem Cadastro? </p>
                <Link to="/admin/users">CADASTRAR</Link>
                </div>


            </form>
        </div>
    );
}

export default FormularioLogin;