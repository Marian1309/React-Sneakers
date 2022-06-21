import { useContext } from 'react';
import AppContext from '../../Context';

const Info = ({ title, description, imgUrl }) => {
  const { setCartOpened, } = useContext(AppContext);
  return (
    <>
      <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
        <img className='mb-20' width='120px' src={imgUrl} alt='Empty' />
        <h2>{title}</h2>
        <p className='opacity-6'>{description}</p>
        <button onClick={() => setCartOpened(false)} className='greenButton'>
          <img src='/img/CartBottomArrow.svg' alt='Arrow' />
          Вернутися назад
        </button>
      </div>
    </>
  );
};
export default Info;
