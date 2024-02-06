function App() {
    return (
      <div className="wrapper clear">
        <header className="d-flex justify-between align-center p-40">
          <div className="d-flex align-center">
            <img width={40} height={40} src="/img/logo.svg"/>
            <div className="headerInfo">
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className='opacity-5'>Магазин лучших кроссовок</p>
            </div>       
          </div>
          <ul className="d-flex">
            <li className="mr-30">
              <img width={18} height={18} src="/img/cart.svg" alt="" />
              <span>1205 руб.</span>
            </li>
            <li>
              <img width={18} height={18} src="/img/user.svg" alt="" />
            </li>
          </ul>
        </header>

  React.useEffect(() => { //Установка данных с сервера
    // fetch('https://65945e0f1493b011606a6c3b.mockapi.io/items').then(res => {
    //   return res.json();
    // }).then(json => {
    //   setItems(json);
    // }) 
    axios.get('https://45c73ff2dd07d5ae.mokky.dev/items').then(res => {
      // console.log(res.data);
      setItems(res.data)
    })
    axios.get('https://45c73ff2dd07d5ae.mokky.dev/Cart').then(res => {
      setCartItems(res.data);
    })
  }, []);

          <div className="d-flex">
            <div className="card">
              <img width={133} height={112} src="img/sneakers/1.jpg" alt="Sneakers" />
              <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена:</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="img/plus.svg" alt="Plus" />
                </button>
              </div>
            </div>


            <div className="card">
              <img width={133} height={112} src="img/sneakers/2.jpg" alt="Sneakers" />
              <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена:</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="img/plus.svg" alt="Plus" />
                </button>
              </div>
            </div>


            <div className="card">
              <img width={133} height={112} src="img/sneakers/3.jpg" alt="Sneakers" />
              <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена:</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="img/plus.svg" alt="Plus" />
                </button>
              </div>
            </div>


            <div className="card">
              <img width={133} height={112} src="img/sneakers/4.jpg" alt="Sneakers" />
              <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <span>Цена:</span>
                  <b>12 999 руб.</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="img/plus.svg" alt="Plus" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
}

export default App;
