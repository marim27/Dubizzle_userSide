import { useEffect, useState } from "react";
import axiosInstanceProducts from "./../../axiosConfig/DubizzleDB";

function BoughtPackages() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [packageOrders, setPackageOrders] = useState([]);
  const [selectedLink, setSelectedLink] = useState("payments-link");

  useEffect(() => {
    axiosInstanceProducts
      .get(`/packageOrders/userID?userID=${user._id}`)
      .then((response) => {
        console.log(response.data);
        setPackageOrders(response.data);
      });
    //make payment link red for when reload
    const paymentsLink = document.getElementById("payments-link");
    if (paymentsLink) {
      paymentsLink.click();
    }
  }, []);

  function changeLinkColor(event) {
    const linkId = event.target.id;

    const allLinks = document.querySelectorAll(".btn");
    allLinks.forEach((link) => {
      link.style.color = "black";
    });

    event.target.style.color = "red";

    setSelectedLink(linkId);
  }

  function renderPaymentTable() {
    return (
      <table className="table text-break ">
        <thead>
          <tr>
            <th className="col-1 bg-light">ID</th>
            <th className="col-1 bg-light">Price</th>
            <th className="col-1 bg-light">Method</th>
            <th className="col-1 bg-light">Packages</th>
            <th className="col-1 bg-light">Date of Payment</th>
            <th className="col-1 bg-light">Status</th>
          </tr>
        </thead>
        <tbody>
          {packageOrders.map((payment, index) => (
            <tr key={payment._id}>
              <td className="col-1 bg-light">{index + 1}</td>
              <td className="col-1 bg-light">
                {payment.amount} {payment.currency?.toUpperCase()}
              </td>
              <td className="col-1 bg-light">{payment.method}</td>
              <td className="col-1 bg-light text-start">
                {payment.packageID.map((packageItem, packageIndex) => (
                  <div key={packageIndex}>
                    <span className="pe-2">-</span>
                    {packageItem.name.toLowerCase()}
                  </div>
                ))}
              </td>
              <td className="col-1 bg-light">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td
                className={`col-1 bg-light  ${
                  payment.status.trim() === "succeeded"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {console.log("payment.status:", payment.status)}
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderBoughtPackageTable() {
    return (
      <table className="table text-break ">
        <thead>
          <tr>
            <th className="col-3 bg-light text-start ps-3">ID</th>
            <th className="col-5 bg-light text-start">Packages</th>
            <th className="col-3 bg-light">Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {packageOrders
            .filter((payment) => payment.status == "succeeded")
            .map((payment, index) => (
              <tr key={payment._id}>
                <td className="col-3 bg-light text-start ps-3">{index + 1}</td>
                <td className="col-5 bg-light text-start">
                  {payment.packageID.map((packageItem, packageIndex) => (
                    <div key={packageIndex}>
                      <span className="pe-2">{packageIndex + 1} -</span>
                      {packageItem.name.toLowerCase()}
                    </div>
                  ))}
                </td>
                <td className="col-3 bg-light">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  // Determine which content to display based on the selected link
  let content;
  switch (selectedLink) {
    case "payments-link":
      content = renderPaymentTable();
      break;
    case "packages-link":
      content = renderBoughtPackageTable();
      break;
    case "billing-link":
      content = "This is the Billing content.";
      break;
    case "addresses-link":
      content = "This is the Addresses content.";
      break;
    case "buying-orders-link":
      content = "This is the Buying Orders content.";
      break;
    case "selling-orders-link":
      content = "This is the Selling Orders content.";
      break;
    default:
      content = "";
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-3 py-4 my-3 align-items-start d-flex flex-column">
          <a
            id="payments-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Payments
          </a>
          <a
            id="packages-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Bought Packages
          </a>
          <a
            id="billing-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Billing
          </a>
          <a
            id="addresses-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Addresses
          </a>
          <a
            id="buying-orders-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Buying Orders
          </a>
          <a
            id="selling-orders-link"
            className="btn  fw-bold border-0"
            onClick={changeLinkColor}
          >
            Selling Orders
          </a>
        </div>
        <div className="col-9 py-5 my-5 border">
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default BoughtPackages;
