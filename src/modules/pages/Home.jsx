import Content from '../components/Content';
import Card from '../components/Card';

const Home = ({
  onChangeSearchInput,
  items,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorite,
  isLoading,
  title,
}) => {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((card) => (
      <Card
        {...card}
        key={card ? card.id : Math.random()}
        onPlus={(obj) => onAddToCart(obj)}
        onAddToFavorite={(obj) => onAddToFavorite(obj)}
        isLoading={isLoading}
      />
    ));
  };
  return (
    <>
      <Content
        onChangeSearchInput={onChangeSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        title={title}
      />
      <div className='cards d-flex justify-between p-40'>{renderItems()}</div>
    </>
  );
};

export default Home;
