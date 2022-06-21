import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = ({ onClickCart }) => {
  const { totalPrice } = useCart();

  return (
    <>
      <header className='header d-flex align-center justify-between p-40'>
        <Link to='/'>
          <div className='headerLeft d-flex'>
            <img src='/img/Logo.svg' alt='Logo' />
            <div className='headerInfo'>
              <h3>React Sneakers</h3>
              <p>Магазин Найкращих Кросівок</p>
            </div>
          </div>
        </Link>
        <ul className='headerRight d-flex'>
          <li className='d-flex align-center cu-p' onClick={onClickCart}>
            <img src='/img/Cart.svg' alt='Cart' width={20} height={20} className='mr-5' />
            <h4>{totalPrice} Грн.</h4>
          </li>
          <li>
            <Link to='/favorites'>
              <img src='/img/Favorited.svg' alt='Favorited' width={20} height={20} />
            </Link>
          </li>
          <Link to='/orders'>
            <li>
              <img src='/img/Profile.svg' alt='Profile' width={20} height={20} />
            </li>
          </Link>
        </ul>
      </header>
    </>
  );
};
export default Header;
