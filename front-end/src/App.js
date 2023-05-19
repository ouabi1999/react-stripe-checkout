
import './App.css';
import CheckoutContainer from './components/checkout/CheckoutContainer';
import { useState, createContext } from 'react';
import {cartItems} from "./common/cartitems"
import Home from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const OrderContext = createContext();

function App() {
  const [formData, setFormData ] = useState({
    firstName: "resum upsom",
    lastName:"resum upsom",
    userId:"",
    email: "resumupsom@gmail.com",
    city:"dd",
    address2:"dd",
    zip:"dd",
    state:"dd",
    country:"dd",
    address1:"dd",
    shippingMethod:null,
    shippingPrice:0.00,
    deliveryTime: "",
    totalPrice:"",
    currency:"usd",
    ordered_products:cartItems,


});
  return (
    <OrderContext.Provider value={{  formData, setFormData}}>
    <BrowserRouter>
    
          
          <Routes>
          <Route path = "/" element={<Home/>}/>
          </Routes>
          </BrowserRouter>
        
    </OrderContext.Provider>
  );
}

export default App;
