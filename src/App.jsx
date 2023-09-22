
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/index"
import Basket from "./Components/Basket/index"
import Wallet from "./Components/Wallet/index"
import Product from "./Components/Product/index"

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/Wallet' element={<Wallet />} />
          <Route path='/Basket' element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
