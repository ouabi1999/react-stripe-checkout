import React, { useEffect } from 'react'
import CheckoutContainer from './checkout/CheckoutContainer'
import axios from 'axios'

function Home() {
    useEffect(()=>{
        axios.get('/hello')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },[])
  return (
    <div>
        <CheckoutContainer/>
    </div>
  )
}

export default Home