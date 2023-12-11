import { useDispatch, useSelector } from 'react-redux';

import './checkOut.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { deleteAllPackages } from '../../store/slices/cartPackage';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from './paypal';
import PaymentContainer from "../../Components/Payment/paymentContainer";
const CheckOut = () => {
    const cardPackages = useSelector((state) => state.Packages.Packages)
    console.log(cardPackages);
    const [totalPrice, settotalPrice] = useState();
    const [totalPackages, settotalPackages] = useState('');
    const [PackagesIDS, setPackagesIDS] = useState([]);
    useEffect(() => {
        let PackagesIds = cardPackages.map((pIds) => pIds._id)
        setPackagesIDS(PackagesIds)
        let totalSum = cardPackages.reduce((acc, item) => acc + item.price, 0);
        settotalPrice(totalSum)
        let allPackages = cardPackages.reduce((acc, item) => acc === "" ? item.name : acc + " + " + item.name, '');
        settotalPackages(allPackages)
    }, []);
    // console.log(totalPackages);
    // console.log(PackagesIDS);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let goBack = () => {
        navigate(-1);
    };
    var gotoHome = () => {
        dispatch(deleteAllPackages(cardPackages));
    }
 const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCardClick = () => {
    setIsCardFlipped(true);
  };

    const initialOptions = {
        clientId: "AfvOianSVpSITi9x1WjepZ0exjMdECZf6nfDbfZdmdA2YDqcCuMgYqIrTJuZkclPSXrRKFTUelfJdqt8",
        currency: "USD",
        intent: "capture",
    };
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary pt-0">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <NavLink
                            onClick={() => {
                                goBack();
                            }}
                            className="text-decoration-none text-dark"
                        >
                            <AiOutlineArrowLeft className="fs-4 mt-3 me-2" />
                        </NavLink>
                        <NavLink to="/" onClick={() => { gotoHome() }}>
                            <img
                                src="https://www.dubizzle.com.eg/assets/logo_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                                className="dubizzle"
                            />
                        </NavLink>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className='container p-4'>
                <p className='fw-bold'>Payment Methods</p>
                <div className='row border mb-4 py-4 px-3 d-flex justify-content-between rounded-2'>
                    <div className='col-12 col-md-10'>{totalPackages}</div>
                    <div className='col-12 col-md-2 ps-lg-5 ps-0 fw-bold'>EGP {totalPrice}</div>
                </div>
                <div className='d-flex mb-4 py-2 px-3 rounded-2 lightblueColor'>
                    <img src="/assets/wallet.svg" alt="" />
                    <div className='ms-3'>
                        <div className='fs-5'>Dubizzle Wallet</div>
                        <div className=''> Balance: 0 EGP</div>
                    </div>
                </div>
                  {/*Flip */}
                {!isCardFlipped ? (
                <div className='row d-flex justify-content-between'>
                    <div className='col-12 col-md-6 col-lg-4 text-decoration-none text-dark' onClick={handleCardClick} role='button'>
                        <div className='rounded-2 text-center border p-5 mb-5'>
                            <img src="/assets/wallet.svg" className='m-3' alt="" />
                            <div className='m-3'>Card Payment</div>
                            <div className='m-3'>Pay with Visa or Mastercard</div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='rounded-2 text-center border px-5 pt-5'>
                            <img src="images/paypal-icon.png" className='m-3' alt="" width={'20rem'} />
                            
                            <PayPalScriptProvider options={initialOptions}>
                                <Paypal totalPrice={totalPrice} cardPackages={cardPackages} PackagesIDS={PackagesIDS} />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                    </div>
                    ) : (
                    <div className="col-12">
                      <div className="rounded-2 text-center border p-5">
                        <PaymentContainer />
                      </div>
                    </div>
                  )}
            
            </div>
        </>
    );
 

};

export default CheckOut;
