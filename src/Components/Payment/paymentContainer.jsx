import { useEffect, useState } from "react";
import "./paymentContainer.css";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { useSelector } from "react-redux";

function PaymentContainer() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const cardPackages = useSelector((state) => state.Packages.Packages);
  console.log(cardPackages);

  const [totalPrice, settotalPrice] = useState();
  const [totalPackages, settotalPackages] = useState("");
  useEffect(() => {
    let totalSum = cardPackages.reduce((acc, item) => acc + item.price, 0);
    settotalPrice(totalSum);
    let allPackages = cardPackages.reduce(
      (acc, item) => (acc === "" ? item.name : acc + " + " + item.name),
      ""
    );
    settotalPackages(allPackages);
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        await axiosInstanceProducts.get("/payments/config").then((response) => {
          console.log(response.data.publishableKey);
          setStripePromise(loadStripe(response.data.publishableKey));
        });
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
      }
    };
    fetchClientSecret();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        await axiosInstanceProducts
          .post("/payments", {
            // method: "POST",
            amount: totalPrice * 100,
            packageName: totalPackages,
          })
          .then((response) => {
            console.log(response.data.clientSecret);
            // setStripePromise(loadStripe(response.data.publishableKey));
            setClientSecret(response.data.clientSecret);
          });
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
      }
    };
    fetchClientSecret();
  }, [totalPackages, totalPrice]);

  return (
    <div className="container text-center  py-2 my-2 wallet-container">
      <div>
        <img src="/assets/wallet.svg" className="m-2" width={"70rem"} />{" "}
        <span className="fs-2 fw-bold ">Card Payment</span>
      </div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm cardPackages={cardPackages} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentContainer;
