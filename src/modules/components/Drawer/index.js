import Info from '../Info';
import { useState } from 'react';
import AppContext from '../../../Context';
import { useContext } from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

const Delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onCloseCart, onDelete, cartOpened }) => {
  const { API_URL } = useContext(AppContext);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_URL}/Orders`, {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${API_URL}/Cart/${+item.id}`);
        await Delay(1000);
      }
      // Костиль, тому що у MockAPI немає методу replace, тобто axios.put не можна використовувати
    } catch (e) {
      alert('Не вдалося Створити Замовлення');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <div className='d-flex align-center justify-between'>
          <h2>Корзина</h2>
          <img src='/img/Exit.svg' alt='Exit' onClick={onCloseCart} className='cu-p' />
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className='cartItems'>
              {cartItems.map((item) => {
                const { name, price, imgUrl, id } = item;
                return (
                  <div className='cartItem d-flex align-center mb-20' key={id}>
                    <img src={imgUrl} alt='Sneakers' width={70} height={70} className='mr-20' />
                    <div className='mr-20'>
                      <p className='mb-5'>{name}</p>
                      <b>{price} Грн.</b>
                    </div>
                    <img src='/img/Exit.svg' alt='Exit' onClick={() => onDelete(id)} />
                  </div>
                );
              })}
            </div>
            <div className='cartBottom'>
              <ul>
                <li>
                  <span>І того:</span>
                  <div></div>
                  <b>{totalPrice} Грн.</b>
                </li>
                <li>
                  <span>Податок 5%:</span>
                  <div></div>
                  <b>{((totalPrice / 100) * 5).toFixed(0)} Грн.</b>
                </li>
              </ul>
              <button disabled={isLoading} className='greenButton' onClick={onClickOrder}>
                Оформити Замовлення <img src='/img/CartBottomArrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Замовлення Оформлено!' : 'Корзина Пуста'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Додайте хоча б одну пару кросівок щоб зробити замовлення'
            }
            imgUrl={isOrderComplete ? '/img/Finish.jpg' : '/img/cardEmpty.png'}
          />
        )}
      </div>
    </div>
  );
};
export default Drawer;
