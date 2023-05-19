import React,{useContext, useState, useEffect} from 'react'
import styled from 'styled-components';
import Billing from './Billing';
import StripeContanier from './StripeContanier';
import { FormContext } from '../CheckoutContainer';
import LogendIn from './LogendIn';
import Shipping from './Shipping';
import {OrderContext} from "../../../App"
import { useNavigate } from 'react-router-dom';
 
function Steps() {
 
    const navigate = useNavigate()
    const auth = true
    const user = true 
    const [signInMessage, setsignInMessage] = useState(null)
  
    const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
    const { formData, setFormData} = useContext(OrderContext);
    
    
    const backButton =() => {
        setActiveStepIndex(activeStepIndex - 1);
      }

    const onSubmit=() => {
        if(auth === true){
            setActiveStepIndex(activeStepIndex + 1);
            setFormData({...formData, userId:user.id})
           
            }
        else{
          setsignInMessage("You have to sign-in first to continue")
        }
       
        
      }
    let stepContent;
    switch (activeStepIndex) {
      case 0:
        stepContent = auth === "false"  ? navigate("/login") : <LogendIn/>;
        break;
      case 1:
        
        stepContent = <Billing/>;
        break;
      case 2:
        stepContent = <Shipping/>;
        break;
        case 3:
          stepContent = <StripeContanier/>;
          break;
      default:
        break;
    }
  
    return (
    <Container>
       
        {stepContent}

        {activeStepIndex === 0 &&(
          <button  className='button' onClick={onSubmit}>Next</button>
        )}
        {signInMessage && user == null&&(
          <span>{signInMessage}</span>
        )}
       
    </Container>
    )
    
  }
  const Container = styled.div`
        
        width:100%;
        display:flex;
        flex-direction:column;
        min-height:500px;
        justify-content:center;
        align-items:center;
        position:sticky;
        top:0;
       
    
      

        
        .button{
          color:#fff;
          background:blue;
          padding:8px 15px;
          border-radius:6px;
          margin-top:10px;
          font-size: 17px;
      
          &:hover{
            opacity:0.8;
          }
        }
        
       
  `

export default Steps