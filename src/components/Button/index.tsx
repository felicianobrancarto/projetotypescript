import  './Button.css'

import { FaChevronRight } from 'react-icons/fa';


export const Button = () => {


    return (
        <>
        <button className="button">
            INICIE AGORA A SUA BUSCA <FaChevronRight className="icon"/> 
            </button>
        
        </>
    );
}

export default Button;
