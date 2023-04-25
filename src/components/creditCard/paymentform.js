import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./CreditCardForm.css";

// Define shared card element options
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#545454",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [modal, setModal] = useState(true);
  console.log(props);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post("http://localhost:8080/payment", {
          amount: 1000,
          id,
        });
        if (response.data.success) {
          axios
            .put(
              "http://localhost:8080/user/" +
              JSON.parse(localStorage.getItem("token")).userId +
              "/paymentstatus",
              {
                paymentStatus: true,
              }
            )
            .then(function (response) {
              console.log("Successful payment");
              setSuccess(true);
              props.loggedUser.paymentStatus = true;
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  if (!modal) {
    return null;
  }
  return (
    <>
      {!success ? (
        <div className="backgroun-overlay-credit-card">

          <div className="payment-form-m">
            <div className="payment-form-text">
              <button className="closePayModal" onClick={() => {setModal(!modal); props.setShowPayedBox(false)}}>X</button>
              <h2> Нямаш заредена опцията за супер харесвания! </h2>
              <img className="image-card" src={props.user.photos[0]}></img>
              <p> Не изпускай {props.user.first_name}, презареди сега!</p>
            </div>
            <form className="payment-form" onSubmit={handleSubmit}>
              <fieldset className="FormGroup">
                <div className="FormRow">
                  <label htmlFor="cardNumber">Card number</label>
                  <CardNumberElement
                    id="cardNumber"
                    options={CARD_ELEMENT_OPTIONS}
                  />
                </div>
                <div className="FormRow">
                  <label htmlFor="cardExpiry">Expiry date</label>
                  <CardExpiryElement
                    id="cardExpiry"
                    options={CARD_ELEMENT_OPTIONS}
                  />
                </div>
                <div className="FormRow">
                  <label htmlFor="cardCvc">CVC</label>
                  <CardCvcElement maxLength="3" id="cardCvc" options={CARD_ELEMENT_OPTIONS} />
                </div>
              </fieldset>
              <button className="paymentButton">Pay</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="backgroun-overlay-credit-card">
          <div className="payment-form-c">
            <div className="closeContainer">
              <h2 className="aftaerPayText"> Честито ти взе своя абонамент, сега вече не можеш да изпуснеш {props.user.first_name} </h2>
              <img className="image-card" src={props.user.photos[0]}></img>

            </div>
            <button className="closeBtn" onClick={() => setModal(!modal)}>Продължи</button>
          </div>
        </div>
      )}
    </>
  );
}



