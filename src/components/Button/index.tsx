import  './Button.css';
import { FaChevronRight } from 'react-icons/fa';
import { useCallback } from 'react';

export const Button = () => {

  const handleCatalogoButtonClick = useCallback(() => {
    window.location.href = '/catalogo';
  }, []);

  return (
    <>
      <button className="button" onClick={handleCatalogoButtonClick}>
        INICIE AGORA A SUA BUSCA <FaChevronRight className="icon"/> 
      </button>
    </>
  );
}

export default Button;
