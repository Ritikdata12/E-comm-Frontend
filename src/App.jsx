import React ,{ useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Header from './Components/Header'
import CompareProducts from './Components/CompareProduct';
import ProductDetails from './Components/ProductDetails';
import Sidebar from './Components/Sidebar';

function App() {
  const [compareList, setCompareList] = useState([]);

  return (
    <>
     
     <Router>
      <Header />
      <Sidebar compareList={compareList} setCompareList={setCompareList} />
      <div className="content">
        <Routes>
        <Route
              path="/"
              element={<ProductDetails compareList={compareList} setCompareList={setCompareList} />}
            />
            <Route
              path="/compare"
              element={<CompareProducts compareList={compareList} setCompareList={setCompareList} />}
            />
        </Routes>
      </div>
    </Router>
      
    </>
  )
}

export default App
