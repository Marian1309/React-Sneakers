import styles from './Card.module.scss';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../../Context';
import { useContext } from 'react';

const Card = ({
  name,
  price,
  imgUrl,
  id,
  onPlus,
  onAddToFavorite,
  favorited = false,
  isLoading = false,
}) => {
  const { isAddedItems } = useContext(AppContext);
  const [isFavorited, setIsFavorited] = useState(favorited);

  const obj = { name, price, imgUrl, id, parentId: id };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onAddToFavorite(obj);
  };
  return (
    <div className={styles.card} key={id}>
      {isLoading ? (
        <ContentLoader
          speed={1}
          width={165}
          height={250}
          viewBox='0 0 165 250'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'>
          <rect x='0' y='0' rx='0' ry='0' width='150' height='155' />
          <rect x='0' y='167' rx='0' ry='0' width='150' height='15' />
          <rect x='0' y='187' rx='0' ry='0' width='100' height='15' />
          <rect x='0' y='232' rx='0' ry='0' width='80' height='25' />
          <rect x='124' y='225' rx='0' ry='0' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onAddToFavorite && (
              <img
                src={isFavorited ? '/img/FavoritedHeart.svg' : '/img/FavoritedBtn.svg'}
                alt='Favorited'
                onClick={onFavoriteClick}
              />
            )}
          </div>
          <img src={imgUrl} alt='Sneakers' width='100%' height={135} className={styles.sneak} />
          <h5>{name}</h5>
          <div className={styles.cardBootom}>
            <div className='d-flex flex-column'>
              <span>Ціна:</span>
              <b>{price} Грн.</b>
            </div>
            <button className='cu-p' onClick={onClickPlus}>
              {onPlus && (
                <img
                  src={isAddedItems(id) ? '/img/CartGreen.svg' : '/img/CartBtn.svg'}
                  alt='CartBtn'
                />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
