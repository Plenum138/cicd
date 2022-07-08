// import React, { useState, useEffect } from 'react';
// // import CheckoutForm from './CheckoutForm';
// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
// // import { Alert } from 'antd';

// const baseUrl = process.env.REACT_APP_ApiUrl;



// const PaymentPage = (props) => {


// 	useEffect(() => {
		
// 		localStorage.removeItem("stripe_screen", "true");

// 	}, [])

// 	const handleToken = async (token, addresses) => {
//         let user = JSON.parse(localStorage.getItem("user"))
//         const res = await axios.post(`${baseUrl}/api/stripe-pay`, { token, addresses, user });
//         if(res.data.status) {
//             alert(res.data.message)
//             props.history.push('/login');
//         }else {
//             alert("Something Weny Wrong")
//         }
//     }


// 	return (

// 		<div className="container">
// 			<div className="py-5 text-center">
// 				<h4>Stripe Payment </h4>
// 			</div>

// 			<div className="row s-box">

// 				<div className="col-md-5 order-md-2 mb-4">

// 				</div>
// 				<div className="col-md-7 order-md-1">

// 					{/* <CheckoutForm amount={2000} setPaymentCompleted={setPaymentCompleted} /> */}

// 					<React.Fragment>
// 						<h4 className="d-flex justify-content-between align-items-center mb-3">
// 							<span className="text-muted">Pay with card</span>
// 						</h4>
// 						<StripeCheckout
// 							stripeKey='pk_test_51Iug0ySBeksr324AnMsGUjac2svTFYwB40ldkaFwrNbn88BX5cK4cjgzTTWE9jVjP6OSEfRMcdyGDePVCmVKPYOC00wh7XcBk7'
// 							token={handleToken}
// 							billingAddress
// 							shippingAddress
// 							amount={20 * 100}
// 						/>

// 					</React.Fragment>

// 				</div>

// 			</div>

// 		</div>


// 	)
// }


// export default PaymentPage;

import React, { useState, useEffect, useRef } from 'react';
// import CheckoutForm from './CheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Apploader from '../../components/loader/loader';
// import { Alert } from 'antd';
import { message } from 'antd';

const baseUrl = process.env.REACT_APP_ApiUrl;



const PaymentPage = (props) => {

	const buttonClickRef = useRef()
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState();



	useEffect(() => {
	
		getToken();
		localStorage.removeItem("stripe_screen", "true")
		
	}, [])

	const getToken = async () => {
		let user = JSON.parse(localStorage.getItem("user"))

		const res = await axios.get(`${baseUrl}/api/stripe/price`);
		setPrice(res?.data?.price?.plan_price)

		// buttonClickRef.current.onClick()
		
		

		setUser(user)
	}


	const handleToken = async (token, addresses) => {
		setLoading(true)
		const res = await axios.post(`${baseUrl}/api/stripe-pay`, { token, addresses, user });
		if (res.data.status) {
			setLoading(false);
	
			message.success(res.data.message, 5);
			props.history.push('/login');
		} else {
			setLoading(false);
			
			message.error("Something Went Wrong", 5);

		}
	}



	const add_click = true;
	return (
		<div style={{ backgroundColor: "#eef", height: '100vh' }}>
			<Apploader show={loading} /> 
			<div className="py-5 text-center">
				<h4>Stripe Payment</h4>
			<h4 className="text-success">${price}</h4>	
			</div>

			<div className="row s-box">
				<div className="col-md-12">
					<React.Fragment>
						{/* <h4 className="d-flex justify-content-between align-items-center mb-3">
							<span className="text-muted">Pay with card</span>
						</h4>
						{console.log({ user })} */}
						<StripeCheckout
							stripeKey='pk_test_51Iug0ySBeksr324AnMsGUjac2svTFYwB40ldkaFwrNbn88BX5cK4cjgzTTWE9jVjP6OSEfRMcdyGDePVCmVKPYOC00wh7XcBk7'
							token={handleToken}
							billingAddress
							shippingAddress
							email={user?.email}
							amount={price * 100}
							ref={buttonClickRef}
						>
							<center>
								<button className="btn btn-lg btn-primary">
									Proceed To Pay
								</button>
							</center>
						</StripeCheckout>
					</React.Fragment>
				</div>
			</div>

		
		</div>

	)
}


export default PaymentPage;