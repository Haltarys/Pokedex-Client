import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageNotFound from './components/404.component';
import Header from './layouts/header.component';
import { IRoute } from './models/routes.model';
import Container from './routes/container.component';
import menuItems from './routes/routes.config';

import './styles/body.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {menuItems.map((item: IRoute) => (
            <Route
              element={<Container content={item.content} />}
              key={item.title}
              path={item.path}
            />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
