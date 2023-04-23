
import React, { Suspense, useState } from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import './CreditCardForm.css'

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm(props) {
    const [success, setSuccses] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [modal, setModal] = useState(true)
console.log(props)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod

                const response = await axios.post("http://localhost:8080/payment", {
                    amount: 1000,
                    id
                })
                if (response.data.success) {
                    axios.put('http://localhost:8080/user/' + JSON.parse(localStorage.getItem("token")).userId + '/paymentstatus', {
                        paymentStatus: true
                    })
                        .then(function (response) {
                            console.log("Sussessfull payment")
                            setSuccses(true)
                            props.loggedUser.paymentStatus=true;

                        })
                        .catch(function (error) {
                            console.error(error);
                        });


                }
            } catch (error) {
                console.log("Error", error)

            }

        }
        else {
            console.log(error.message)

        }
    }
    if(!modal){
        return null
    }
    return (
        <>
            {!success ?
                <div className="backgroun-overlay-credit-card">
                    <div className="payment-form-m">
                        <div className="payment-form-text">
                            <h2> Нямаш заредена опцията за </h2>
                            <h2> супер харесвания! </h2>
                            <img className="image-card" src={props.user.photos[0]}></img>
                            <p> Не изпускай {props.user.first_name}, презареди сега!</p>

                        </div>
                        <form className="payment-form" onSubmit={handleSubmit}>
                            <fieldset className="FormGroup">
                                <div className="FormRow">
                                    <CardElement options={CARD_OPTIONS} />
                                </div>
                            </fieldset>
                            <button className="paymentButton">Pay</button>
                        </form>
                    </div>
                </div>
                :
                <div className="backgroun-overlay-credit-card">
                     <div className="payment-form">
                     <div>
                        <h2> You just Subscribe now you can swipe Up </h2>
                    </div>
                    <button onClick={()=>{setModal(!modal)}} >X</button>
                     </div>
                </div>
               
            }
        </>
    )
}