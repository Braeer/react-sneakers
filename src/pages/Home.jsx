import React from 'react';
import Card from '../components/Card';

function Home({ items, onAddToCart, onAddToFavorite, isLoading }) {
  const [searchValue, setSeatchValue] = React.useState('');
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  const onChangeSeacrhInput = (event) => {
    setSeatchValue(event.target.value);
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
        <div className="search-block d-flex">
          <img src="img/search2.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSeatchValue('')}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input onChange={onChangeSeacrhInput} value={searchValue} placeholder="Поиск ..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
