import Content from '../components/Content';
import Card from '../components/Card';

import AppContext from '../../Context';

import { useContext } from 'react';

const Favorites = ({ onChangeSearchInput, searchValue, setSearchValue, title }) => {
  const { favorites, onAddToFavorite, onAddToCart } = useContext(AppContext);
  return (
    <>
      <Content
        onChangeSearchInput={onChangeSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        title={title}
      />
      <div className='cards d-flex justify-between p-40'>
        {favorites.map((card) => (
          <Card
            {...card}
            key={card.id}
            onAddToFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            favorited={true}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
