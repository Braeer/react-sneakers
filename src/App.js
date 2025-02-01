import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

// Первый вариант
// export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //Установка данных с сервера
    async function fetchData() {
      setIsLoading(true);
      const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
        axios.get('https://45c73ff2dd07d5ae.mokky.dev/items'),
        axios.get('https://45c73ff2dd07d5ae.mokky.dev/Cart'),
        axios.get('https://45c73ff2dd07d5ae.mokky.dev/favorite'),
      ]);

      setIsLoading(false);

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    //Добавление предметов
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        console.log(findItem.id);
        await axios.delete(`https://45c73ff2dd07d5ae.mokky.dev/Cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://45c73ff2dd07d5ae.mokky.dev/Cart', obj);
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
  };

  const onRemoveItem = (id) => {
    //Удаление предметов
    try {
      axios.delete(`https://45c73ff2dd07d5ae.mokky.dev/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    //Добавление в избранном
    try {
      if (favorites.find((FavObj) => Number(FavObj.id) === Number(obj.id))) {
        axios.delete(`https://45c73ff2dd07d5ae.mokky.dev/favorite/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://45c73ff2dd07d5ae.mokky.dev/favorite', obj);
        setFavorites((prev) => [...prev, data]);
        console.log(data);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    //Верстка
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/react-sneakers"
            element={
              <Home
                items={items}
                onAddToFavorite={onAddToFavorite}
                cartItems={cartItems}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route path="react-sneakers/favorites" element={<Favorites />} exact />
          <Route path="react-sneakers/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
