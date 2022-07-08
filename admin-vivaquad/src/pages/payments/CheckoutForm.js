import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import { Alert } from 'antd';

const baseUrl = process.env.REACT_APP_ApiUrl;


export default function CheckoutForm(props) {   
    
    // const handlePayment = () => {
    //     console.log('working')
    // }

    useEffect(() => {
        console.log('props', props)
        props.history.push('/register');
        // props.history.push('/login')
    }, [])

    const handleToken = async (token, addresses) => {
        // console.log({token, addresses})

        let user = JSON.parse(localStorage.getItem("user"))

        const res = await axios.post(`${baseUrl}/api/stripe-pay`, { token, addresses, user });

        if(res.data.status) {
            alert(res.data.message)
            console.log('working')
            props.history.push('/login');
        }else {
            alert("Something Weny Wrong")
        }
    }

    return (
        <React.Fragment>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Pay with card</span>
            </h4>   
            <StripeCheckout 
                stripeKey='pk_test_51Iug0ySBeksr324AnMsGUjac2svTFYwB40ldkaFwrNbn88BX5cK4cjgzTTWE9jVjP6OSEfRMcdyGDePVCmVKPYOC00wh7XcBk7' 
                token={handleToken}
                billingAddress
                shippingAddress
                amount={20 * 100}
            />
            
        </React.Fragment>
    );
}