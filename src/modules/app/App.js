import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Drawer from '../components/Drawer';
import Header from '../components/Header';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

import AppContext from '../../Context';
import Orders from '../pages/Orders';

const API_URL = 'https://628f82470e69410599ddbc00.mockapi.io';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResp, favoritesResp, itemsResp] = await Promise.all([
          axios.get(`${API_URL}/Cart`),
          axios.get(`${API_URL}/Favorites`),
          axios.get(`${API_URL}/Cards`),
        ]);

        setIsLoading(false);

        setItems(itemsResp.data);
        setCartItems(cartResp.data);
        setFavorites(favoritesResp.data);
      } catch (e) {
        alert('Помилка при запросі даних');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${API_URL}/Cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`${API_URL}/Cart`, obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (e) {
      alert('Не вдалося додати в Кошик');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => +favObj.id === +obj.id)) {
        axios.delete(`${API_URL}/Favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => +item.id !== +obj.id));
      } else {
        const { data } = await axios.post(`${API_URL}/Favorites`, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      alert('Не вдалося додати в Фаворити(');
    }
  };

  const onDeleteCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => +item.id !== +id));
    } catch (e) {
      alert('Не вдалося видалити із Корзини');
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isAddedItems = (id) => {
    return cartItems.some((obj) => +obj.parentId === +id);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          items,
          cartItems,
          favorites,
          isAddedItems,
          onAddToFavorite,
          onAddToCart,
          setCartOpened,
          setCartItems,
          API_URL,
          onChangeSearchInput,
          searchValue,
          setSearchValue,
        }}>
        {/* Все, що є у value буде доступно всьому проекту */}
        {cartOpened && (
          <Drawer
            onCloseCart={() => setCartOpened(false)}
            cartItems={cartItems}
            onDelete={onDeleteCart}
            setCartOpened={setCartOpened}
            cartOpened={cartOpened}
          />
        )}
        <div className='wrapper'>
          <Header onClickCart={() => setCartOpened(true)} />
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  onChangeSearchInput={onChangeSearchInput}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onAddToCart={onAddToCart}
                  onAddToFavorite={onAddToFavorite}
                  isLoading={isLoading}
                  title={'Всі Кросівки'}
                />
              }
            />
            <Route exact path='/favorites' element={<Favorites title={'Закладки'} />} />
            <Route exact path='/orders' element={<Orders title='Замовлення' />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
