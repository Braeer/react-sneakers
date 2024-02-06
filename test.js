import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

// Первый вариант
// export const AppContext = React.createContext({});

function App() { 
  //Переменные реакт
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSeatchValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => { //Установка данных с сервера
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get('https://65945e0f1493b011606a6c3b.mockapi.io/items');
      const cartResponse = await axios.get('https://65945e0f1493b011606a6c3b.mockapi.io/Cart');
      const favoritesResponse = await axios.get('https://45c73ff2dd07d5ae.mokky.dev/favorite');

      setIsLoading(false)

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => { //Добавление предметов
    console.log(obj);
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if(findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        axios.delete(`https://45c73ff2dd07d5ae.mokky.dev/Cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } =  axios.post('https://65945e0f1493b011606a6c3b.mockapi.io/Cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  }

  const onRemoveItem = (id) => { //Удаление предметов
    try {
      axios.delete(`https://65945e0f1493b011606a6c3b.mockapi.io/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => { //Добавление в избранном
   try {
    if(favorites.find(FavObj => Number(FavObj.id) === Number(obj.id))) {
      axios.delete(`https://45c73ff2dd07d5ae.mokky.dev/favorite/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      const { data } = await axios.post('https://45c73ff2dd07d5ae.mokky.dev/favorite', obj)
      setFavorites((prev) => [...prev, data])
      console.log(data);
    }
   } catch (error) {
    alert('Не удалось добавить в фавориты')
    console.log(obj);
   }
  }

  const onChangeSeacrhInput = (event) => { //Поиск предметов
    setSeatchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  } 

  return ( //Верстка
    <AppContext.Provider value={{ 
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      setCartOpened,
      setCartItems,
      onAddToCart
     }}>
      <div className="wrapper clear">
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
        <Header onClickCart={() => setCartOpened(true)}  />

      
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSeatchValue}
                onChangeSearchInput={onChangeSeacrhInput}
                onAddToFavorite={onAddToFavorite}
                cartItems={cartItems}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route
            path="/favorites"
            element={
            <Favorites />
            }
            exact
          />
          <Route
            path="/orders"
            element={
              <Orders />
            }
            exact
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
