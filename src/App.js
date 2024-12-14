import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Header from './components/Header'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;