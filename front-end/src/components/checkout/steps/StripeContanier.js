import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";
import Billing from "./Billing";
import { FormContext } from "../CheckoutContainer";
import Skeleton from "../Skeleton";
import SkeletonLoader from "../Skeleton";
import {OrderContext } from "../../../App";
import { useSelector } from "react-redux";
import axios from "axios";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function StripeContanier() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const {formData, setFormData } =  useContext(OrderContext);
  const cartItems =  useSelector((state) => state.cart.cartItems)
  
 
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post('/create-payment', {
      user_id: formData.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      city: formData.city,
      address1: formData.address1,
      address2: formData.address2,
      zipCode: formData.zip,
      state: formData.state,
      country: formData.country,
      shippingMethod: formData.shippingMethod,
      shippingPrice: formData.shippingPrice,
      deliveryTime : formData.deliveryTime,
      totalPrice: formData.totalPrice,
      currency:"usd",
      ordered_products:[]

    })
    .then(function (response) {
      setClientSecret(response.data.clientSecret)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, []);
  

  const appearance = {
    theme: 'night',
    labels: 'floating'
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (

    <Container>
    {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
    ):
    <div style={{padding:"0 10px"}}><SkeletonLoader/></div>
  }
   
    </Container>
  )
  
}
const Container = styled.div`

 margin-top:50px;
 


`