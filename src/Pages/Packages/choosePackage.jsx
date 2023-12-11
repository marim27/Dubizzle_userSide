import { PiCheckThin } from "react-icons/pi";
import { LiaAngleRightSolid } from "react-icons/lia";
import "./choosePackage.css";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import CartCheckBox from "./cartCheckBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllPackages } from "../../store/slices/cartPackage";
const ChoosePackage = () => {
  const cardPackages = useSelector((state) => state.Packages.Packages);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let goBack = () => {
    dispatch(deleteAllPackages(cardPackages));
    navigate(-1);
  };
  var gotoHome = () => {
    dispatch(deleteAllPackages(cardPackages));
  };
  const [Packages, setPackages] = useState([]);
  useEffect(() => {
    const getPackages = async () => {
      const res = await axiosInstanceProducts.get(`/packages`);
      setPackages(res.data);
      // console.log(res.data);
    };
    getPackages();
  }, []);

  const [totalPrice, settotalPrice] = useState();
  useEffect(() => {
    let totalSum = cardPackages.reduce((acc, item) => acc + item.price, 0);
    settotalPrice(totalSum);
  }, [cardPackages]);
  // console.log(cardPackages.length);
  // console.log(totalPrice);

  return (
    <>
      <div>
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
              <NavLink
                to="/"
                onClick={() => {
                  gotoHome();
                }}
              >
                <img
                  src="https://www.dubizzle.com.eg/assets/logo_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                  className="dubizzle"
                />
              </NavLink>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="d-flex  justify-content-center my-4">
          <div className="cardP">
            <div className="border-bottom">
              <div className="card_head m-3 py-1">
                <div className="d-flex justify-content-center my-3">
                  <img
                    src="/images/businessMulti.webp"
                    alt=""
                    style={{ width: "100px", height: "75px" }}
                  />
                </div>
                <p className="fw-bold text-center">
                  Heavy discount on Packages
                </p>
              </div>
            </div>
            {Packages.map((Package) => (
              <div className="borderBottom p-3" key={Package._id}>
                <div className="ms-4 border-bottom">
                  <div className="row mt-1 mb-3">
                    <p className="fw-bold col-12 col-md-7 me-4">
                      {Package.name}
                    </p>
                    <div
                      className="modal fade bg-white "
                      id="exampleModalToggle"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel"
                    >
                      <div className="modal-dialog modal-dialog-centered text-center close ">
                        <div className="modal-content border-0 p-0 ">
                          <div className="modal-header border-0 ">
                            <button
                              type="button"
                              className="btn-close closeBtn"
                              style={{ position: "relative" }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                goBack();
                              }}
                            ></button>
                          </div>
                          <div className="modal-body d-flex justify-content-center align-items-center">
                            <img
                              src={`${axiosInstanceProducts.defaults.baseURL}/${Package.image}`}
                              alt=""
                              className="centered-image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <button
                        className="btn text-center rounded border border-danger exBtn "
                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal"
                      >
                        <p className="m-0 fw-bold ">See example</p>
                      </button>
                    </div>
                  </div>
                  <p className="p">
                    <PiCheckThin className="text-warning fs-4 fw-bold me-1" />
                    <span className="smallFont">{Package.details}</span>
                  </p>
                  <p>
                    <PiCheckThin className="text-warning fs-4 fw-bold me-1" />
                    <span className="smallFont">
                      Package available for{Package.expiryDays} days
                    </span>
                  </p>
                </div>
                <div className="ms-4">
                  <p className="fw-bold smallFont">
                    {Package.TitleadsDaysDetails}
                  </p>
                  <p>
                    <PiCheckThin className="text-warning fs-4 fw-bold me-1" />
                    <span className="smallFont">{Package.adsDaysDetails}</span>
                  </p>
                  <div className="row">
                    <div className="col-8 col-sm-6 col-md-4 border p-2">
                      <div className="border-bottom p-2 d-flex justify-content-between">
                        <CartCheckBox Package={Package} className="" />
                        <label htmlFor="" className="fw-bold smallFont me-4">
                          {Package.numOfAds} Ads
                        </label>
                      </div>
                      <div className="row d-flex justify-content-between py-2 ">
                        <p className="discount col-4 col-md-3 fw-bold smallFont ps-1">
                          -{Package.discount}%
                        </p>
                        <p className="text-center fw-bold smallFont col-8 col-md-9">
                          EGP {Package.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="xx">
              <div className="p-4">
                <p className="fw-bold">CUSTOMIZED PACKAGES</p>
                <p className="smallFont">
                  Can not find the right package above?
                </p>
                <p className="smallFont">
                  Contact us for more customized packages:
                </p>
                <div className="text-center rounded border border-danger btn exBtn px-4 my-2">
                  <p className="m-0 fw-bold "> Contact sales team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=""> */}
        {cardPackages.length > 0 && (
          <div
            className="d-flex justify-content-center p-3 border cartbtn"
            style={{ margin: "auto", width: "36rem" }}
          >
            <Link
              to={"/checkout"}
              className="text-decoration-none d-flex justify-content-between rounded-3 border col-8 px-2 py-3  bgOlx "
            >
              <div className="d-flex">
                <div className="borderRight me-2 pe-2">
                  {cardPackages.length} item
                </div>
                <div className="">Total EGP {totalPrice}</div>
              </div>
              <div className="d-flex ">
                <div className="fw-bold">View Cart</div>
                <LiaAngleRightSolid style={{ marginTop: "6px" }} />
              </div>
            </Link>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default ChoosePackage;