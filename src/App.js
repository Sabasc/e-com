import React from 'react';
import 'antd/dist/reset.css';
import './App.css';
import AppHeader from './components/Header';
import PageContent from './components/page-Content';
import AppFooter from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppHeader/>
     <PageContent/>
     <AppFooter/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
 