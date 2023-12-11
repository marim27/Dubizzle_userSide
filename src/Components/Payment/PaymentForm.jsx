import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllPackages } from "../../store/slices/cartPackage";

export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [packageOrder, setPackageOrder] = useState({
    packageID: [],
    userID: "",
    transactionID: "",
    status: "",
    amount: "",
    currency: "",
    method: "Credit Card",
  });

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const cardPackages = useSelector((state) => state.Packages.Packages);

  const dispatch = useDispatch();

  useEffect(() => {
    let idsList = props.cardPackages.map((item) => item._id);
    setPackageOrder({
      ...packageOrder,
      packageID: idsList,
      userID: userData._id,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setTimeout(() => {
        navigate("/choosePackage");
      }, 3000);

      setSuccess(false);

      axiosInstanceProducts
        .post("/packageOrders", {
          ...packageOrder,
          transactionID: error.payment_intent.id,
          status: "failed",
          amount: error.payment_intent.amount / 100,
          currency: error.payment_intent.currency,
        })
        .then((res) => {
          console.log("Post request successful", res.data);
        })
        .catch((err) => {
          console.error("Error during POST request:", err);
        });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Congratulations! You have successfully");
      setSuccess(true);

      axiosInstanceProducts
        .post("/packageOrders", {
          ...packageOrder,
          transactionID: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
        })
        .then((res) => {
          dispatch(deleteAllPackages(cardPackages));
        })
        .catch((err) => {
          console.error("Error during POST request:", err);
        });

      console.log(paymentIntent);
      // startCountdown();
    } else {
      console.log(error);
      setSuccess(false);
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (success && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      // Clean up the interval when the countdown reaches 0 and navigate to boughtpackages
      if (countdown == 1) {
        // window.location.href = "http://localhost:5173/";
        navigate("/boughtpackages");
        localStorage.getItem("userInfo");
        clearInterval(countdownInterval);
      }
    }
  }, [countdown, success, message]);

  return (
    <>
      {!success ? (
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className="shadow px-0 py-2 my-2 w-50 mx-auto px-2  rounded"
        >
          <PaymentElement id="payment-element" />
          <button
            disabled={isProcessing || !stripe || !elements}
            id="submit"
            className="btn btn-secondary rounded mt-2"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>

          {/* Show any error or success messages */}
          {message && (
            <div className="text-danger fs-5" id="payment-message">
              <img src="/assets/error1.png" className="m-2" width={"50rem"} />
              {message} Redirecting in 3 seconds...
            </div>
          )}
        </form>
      ) : (
        <div>
          <img width={"70rem"} src="/assets/success.png" alt="" />
          <p className="fs-5"> Thank You Your Payment Was Successful.</p>

          {/* Display countdown and message */}
          <div className="countdown">
            {countdown > 0 ? (
              <div className="fs-5">Redirecting in {countdown} seconds...</div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
