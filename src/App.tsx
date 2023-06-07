import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Admin from './components/Admin';
import { useAppSelector } from './Hooks/useAppSelector';

const App = () => {


  const { dark } = useAppSelector(s => s.BeginSlice)

  return (
    <div style={{ 
      background: dark ? "#23de" : "" ,
      color: dark ? "white" : ""
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;