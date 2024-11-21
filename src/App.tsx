
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import  ProductList  from './components/ProductList.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Danh Sách Sản Phẩm</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;