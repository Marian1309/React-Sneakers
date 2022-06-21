import Content from '../components/Content';
import Card from '../components/Card';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context';
import axios from 'axios';

const Orders = ({ title }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/Orders`);
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (e) {
        console.log('Помилка при Запросі Заказів');
      }
    })();
  }, []);
  const {
    onChangeSearchInput,
    searchValue,
    setSearchValue,
    API_URL,
    onAddToFavorite,
    onAddToCart,
  } = useContext(AppContext);

  return (
    <>
      <Content
        onChangeSearchInput={onChangeSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        title={title}
      />
      <div className='cards d-flex justify-between p-40'>
        {(isLoading ? [...Array(2)] : orders).map((card) => (
          <Card {...card} key={card ? card.id : Math.random()} isLoading={isLoading} />
        ))}
      </div>
    </>
  );
};

export default Orders;
