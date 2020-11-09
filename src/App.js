import React from 'react';
import { URL_API } from './utils/constants';

import useFetch from './hooks/useFetch';

import TopMenu from "./components/TopMenu";
import Products from './components/Products';

function App() {

  const products = useFetch(URL_API, null);

  return (
    <div className="App">
      <TopMenu />
      <Products products={products} />
    </div>
  );
}

export default App;
