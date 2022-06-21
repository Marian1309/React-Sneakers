import { useContext } from 'react';
import AppContext from '../../Context';

const Content = ({ title }) => {
  const { searchValue, onChangeSearchInput, setSearchValue } = useContext(AppContext);
  return (
    <div className='content'>
      <div className='d-flex align-center justify-between'>
        <h1>{searchValue ? `Пошук по запросу: ${searchValue}` : title}</h1>
        <div className='searchBlock d-flex'>
          <img src='/img/Search.svg' alt='Search' />
          <input
            onChange={onChangeSearchInput}
            type='text'
            placeholder='Знайти...'
            value={searchValue}
          />
          {searchValue && (
            <img
              src='/img/Exit.svg'
              alt='Exit'
              className='cu-p'
              onClick={() => setSearchValue('')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Content;
