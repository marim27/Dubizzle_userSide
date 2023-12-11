import "./Navbar.css";
import React from 'react'
// import { IoIosArrowUp } from "react-icons/io";
// import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import {
  MdArrowForwardIos,
  // MdKeyboardArrowDown,
  // MdKeyboardArrowUp,
} from "react-icons/md";
import { LuShapes } from "react-icons/lu";
import MyVerticallyCenteredModal from "../Login/Login";
import { Navbar, Nav, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LocationSearch from "../LocationSearch/LocationSearch";
import SearchBar from "../SeachBar/SearchBar";
import { useContext } from "react";
// import { BsChat } from "react-icons/bs";
import UserMenu from "../UserMenu/UserMenu";
import { AuthContext } from "../../Context/auth";
import { LanguageContext } from "../../Context/Language";

function NavBar() {
  const { Islogged } = useContext(AuthContext);
  console.log(Islogged);

  const { Language, setLanguage } = useContext(LanguageContext);
  const toggleLanguage = () => {
    setLanguage(Language === "العربية" ? "English" : "العربية");
  };

  return (
    <>
      <div className="container fixed-top navbarStyle d-flex d-md-block justify-content">
        {/* first header */}
        <div className="row px-4 py-3 firstHeader">
          <div className="col-lg-1 col-sm-3 col-3 me-1">
            <Navbar.Brand>
              <NavLink to="/">
                <img
                  src="https://www.dubizzle.com.eg/assets/logo_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                  height="35"
                  alt="Logo"
                />
              </NavLink>
            </Navbar.Brand>
          </div>
          <div className="my-auto mb-0 me-3 col-lg-1 col-sm-3 col-3 topHeader">
            <span className="properitySpan rounded-circle topHeaderImg mx-3">
              <img
                src="https://www.dubizzle.com.eg/assets/property-for-rent_noinline.afd1b8bf81720cc538aba324a684f145.svg"
                height="20"
                alt="Property"
              />
            </span>
            <span className="fw-bold topHeaderText">{Language == "English" ? "عقارات" : "Properties"}</span>
          </div>
        </div>
        {/* second header */}
        <div className="row  secondHeader ">
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="navbarSupportedContent"/>
            <Navbar.Collapse id="navbarSupportedContent">
              {/* <Nav className=" container row justify-content-center align-items-center"> */}
              {/* Location */}
              <Col lg={3} className="me-3">
                <LocationSearch />
              </Col>
              {/* Search */}
              
              <SearchBar />
              {/* Language */}
              <Nav.Item className="col-lg-1 ms-2 w-auto">
                <Nav.Link
                  className="nav-link active fw-bold fs-5 text-center"
                  aria-current="page"
                  // href="#"
                  onClick={toggleLanguage}
                >
                  {/* العربية */}
                  {Language}
                </Nav.Link>
              </Nav.Item>
              {/* Login */}
              <Nav.Item className=" col-lg-2 w-auto">
                {!Islogged ? (
                  // <Nav.Item className="nav-link active fw-bold fs-5 text-center">
                  <div className="text-center mx-5 login">
                    <Login />
                  </div>
                ) : (
                  // </Nav.Item>
                  <>
                    <UserMenu />
                  </>
                )}
              </Nav.Item>
              {/* Sell */}
              <Nav.Item className=" col-lg-1 w-auto">
                <NavLink
                  className="text-decoration-none text-light fs-6 my-3 ms-3"
                  to="/attributes"
                >
                  {Language==='English' ?
                    <button
                    className="btn cllbtn text-light fw-bold fs-5"
                    style={{ width: "6rem" }}
                    href="#"
                  >
                    بيع
                  </button>
                   :
                  <button
                    className="btn cllbtn text-light fw-bold fs-5"
                    style={{ width: "6rem" }}
                    href="#"
                  >
                    Sell
                  </button>
                   }
                </NavLink>
              </Nav.Item>

              {/* </Nav> */}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      {/* Categories */}
      {!(Language === "English") ? (
        <div className="container py-2 thirdHeader fw-bold text-end d-none d-lg-block">
          <div className="row d-flex justify-content-between">
            {/* {"1 Cat"} */}
            <div className="col-1 text-start">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Vehicles
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Cars for Sale
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Cars for Rent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Tyres, Batteries, Oils, & Accessories
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Car Spare Parts
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Motorcycles & Accessories
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Boats - Watercraft
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Heavy Trucks, Buses & Other Vehicles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>{" "}
            {/* {"2 Cat"} */}
            <div className="col-1">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Properties
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Apartments & Duplex for Sale
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Apartments & Duplex for Rent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Villas For Sale
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Villas For Rent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Vacation Homes for Sale
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Vacation Homes for Rent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Commercial for Sale
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Commercial for Rent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Buildings & Lands
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"3 Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mobiles & Tablets
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Mobile Phones
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Tablets
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mobile & Tablet Accessories
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mobile Numbers
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split Cat"} */}
            <div className="col-1">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Jobs
                  </a>
                  <ul className="dropdown-menu subermenu px-3">
                    <div className="d-flex">
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Accounting, Finance & Banking
                          </a>
                          <a className="dropdown-item" href="#">
                            Engineering{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Designers{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Customer Service & Call Center
                          </a>
                          <a className="dropdown-item" href="#">
                            Workers and Technicians
                          </a>
                          <a className="dropdown-item" href="#">
                            Management & Consulting
                          </a>
                          <a className="dropdown-item" href="#">
                            Drivers & Delivery{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            HR{" "}
                          </a>
                        </li>
                      </div>
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Tourism, Travel & Hospitality
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            IT - Telecom{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Marketing and Public Relations
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Medical, Healthcare, & Nursing
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Sales{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Secretarial{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Guards and Security{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Legal - Lawyers{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Other Job{" "}
                          </a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Nested Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown nav-item">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Electronics & Appliances
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        TV - Audio - Video
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            All TV - Audio - Video 1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Televisions
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            DVD - Home Theater{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Home Audio{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Mp3 Players - Portable audio
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Satellite TV receivers
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        Computers - Accessories
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            All Computers - Accessories
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Desktop computers{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Laptop computers{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Computer Accessories & Spare Parts
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        Video games - Consoles
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            All Video games - Consoles
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Video Game Consoles{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Video Games & Accessories
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        Cameras - Imaging
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            All Cameras - Imaging
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Cameras
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Security Cameras{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Camera Accessories{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Binoculars - Telescopes
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        Home Appliances
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            All Home Appliances
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Refrigerators - Freezers
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Ovens - Microwaves{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Dishwashers
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Cooking Tools{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Washers - Dryers{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Water Coolers & Kettles
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Air conditioners & Fans
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Cleaning Appliances{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Other Home Appliances{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Heaters
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    Furniture & Decor
                  </a>
                  <ul
                    style={{ marginLeft: "-200px" }}
                    className="dropdown-menu dropdown-menu-end subermenu"
                  >
                    <div className="d-flex">
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Accounting, Finance & Banking
                          </a>
                          <a className="dropdown-item" href="#">
                            Engineering{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Designers{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Customer Service & Call Center
                          </a>
                          <a className="dropdown-item" href="#">
                            Workers and Technicians
                          </a>
                          <a className="dropdown-item" href="#">
                            Management & Consulting
                          </a>
                          <a className="dropdown-item" href="#">
                            Drivers & Delivery{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            HR{" "}
                          </a>
                        </li>
                      </div>
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Tourism, Travel & Hospitality
                          </a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split & Nested Cat"} */}
            <div className="col-2">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    <LuShapes />
                    <span className="ps-2">More Categories</span>
                  </a>
                  <ul
                    style={{
                      position: "fixed",
                      left: "10%",
                      width: "80%",
                      margin: "auto",
                    }}
                    className="dropdown-menu subermenu px-3"
                  >
                    <div className="d-flex" style={{ width: "100%" }}>
                      <div>
                        <li>
                          <a
                            className="dropdown-item d-flex justify-content-between"
                            href="#"
                          >
                            <div className="d-flex flex-column pb-3">
                              <div className="fw-bold">Fashion & Beauty</div>
                              <div
                                style={{ fontSize: "small" }}
                                className="fw-light"
                              >
                                Women’s Clothing, Men’s Clothing, Women’s
                                Accessories
                              </div>
                            </div>
                            <span className="fw-bolder fs-5 arrowMoreCat">
                              <MdArrowForwardIos />
                            </span>
                          </a>
                          <ul
                            className="submenu dropdown-menu border-0 my-2"
                            style={{
                              left: "30%",
                              width: "fit-content",
                              height: "fit-content",
                              borderLeft: "1px solid #e8e5e5 !important",
                              borderRadius: "0",
                              marginLeft: "-50px",
                            }}
                          >
                            <li>
                              <a
                                className="dropdown-item fw-bold ps-1"
                                href="#"
                              >
                                All in Fashion & Beauty
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Women’s Clothing
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Men’s Clothing
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Women’s Accessories - Cosmetics - Personal Care
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Men’s Accessories - Personal Care
                              </a>
                            </li>
                          </ul>
                        </li>
                      </div>
                      {/* Repeat similar code blocks for other categories */}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-2 thirdHeader fw-bold text-end d-none d-lg-block">
          <div className="row d-flex justify-content-between">
            {/* {"1 Cat"} */}
            <div className="col-1 text-start">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    عربيات وقطع غيار
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        سيارات للبيع
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        سيارات للإيجار
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        الإطارات والبطاريات والزيوت وملحقاتها
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        قطع غيار السيارات
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        الدراجات النارية وملحقاتها
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        القوارب - المراكب المائية
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        الشاحنات الثقيلة والحافلات والمركبات الأخرى
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>{" "}
            {/* {"2 Cat"} */}
            <div className="col-1">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    عقارات
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        شقق ودوبلكس للبيع
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        شقق ودوبلكس للإيجار
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        فيلا للبيع
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        فيلا للإيجار
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        بيوت العطلات للبيع
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        بيوت العطلات للإيجار
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        تجاري للبيع
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        عقار تجاري للإيجار
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        المباني والأراضي
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"3 Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    موبايلات و تابلت
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        الهواتف المحمولة
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        أجهزة لوحية
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        اكسسوارات الجوال والتابلت
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        أرقام الجوال
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split Cat"} */}
            <div className="col-1">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    وظائف
                  </a>
                  <ul className="dropdown-menu subermenu px-3">
                    <div className="d-flex">
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            المحاسبة والمالية والمصرفية
                          </a>
                          <a className="dropdown-item" href="#">
                            هندسة{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            المصممين{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            خدمة العملاء ومركز الاتصال
                          </a>
                          <a className="dropdown-item" href="#">
                            العمال والفنيون
                          </a>
                          <a className="dropdown-item" href="#">
                            الاستشارات الإدارية
                          </a>
                          <a className="dropdown-item" href="#">
                            السائقين والتسليم{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            الموارد البشرية{" "}
                          </a>
                        </li>
                      </div>
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            السياحة والسفر والضيافة
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            تكنولوجيا المعلومات - الاتصالات{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            التسويق والعلاقات العامة
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            الطب والرعاية الصحية والتمريض
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            مبيعات{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            السكرتارية{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            حراس وأمن{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            قانونية - محامون{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            وظيفة أخرى{" "}
                          </a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Nested Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown nav-item">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    أجهزة إلكترونية
                  </a>
                  <ul className="dropdown-menu subermenu">
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        تلفزيون - صوت - فيديو
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            جميع التلفزيونات - الصوت - الفيديو 1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            أجهزة التلفاز
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            دي في دي - مسرح منزلي{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            الصوت المنزلي{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            مشغلات MP3 - صوت محمول
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            أجهزة استقبال القنوات الفضائية
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        أجهزة كمبيوتر - إكسسوارات
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                            جميع أجهزة الكمبيوتر وملحقاتها
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a className="dropdown-item" href="#">
                          أجهزة الكمبيوتر المكتبية{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          أجهزة الكمبيوتر المحمول{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          اكسسوارات وقطع غيار الكمبيوتر
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        وحدات تحكم ألعاب فيديو
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                          لعبة فيديو وملحقاتها
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          وحدات تحكم ألعاب الفيديو{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          ألعاب الفيديو وملحقاتها
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        كاميرات - تصوير
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                          جميع الكاميرات - التصوير
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          الكاميرات
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          كاميرات مراقبة{" "}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {/* Parent menu */}
                      <a
                        className="dropdown-item d-flex justify-content-between"
                        href="#"
                      >
                        أجهزة منزلية
                        <span className="fw-bolder fs-5">
                          <i className="fa-solid fa-angle-right"></i>
                        </span>
                      </a>
                      {/* Child menu */}
                      <ul className="submenu dropdown-menu">
                        <li>
                          <a className="dropdown-item fw-bold ps-1" href="#">
                          جميع الأجهزة المنزلية
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          ثلاجات - مجمدات
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          أدوات الطبخ{" "}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                          أجهزة منزلية أخرى{" "}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split Cat"} */}
            <div className="col-2">
              {" "}
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    الأثاث والديكور
                  </a>
                  <ul
                    style={{ marginLeft: "-200px" }}
                    className="dropdown-menu dropdown-menu-end subermenu"
                  >
                    <div className="d-flex">
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                          المحاسبة والمالية والمصرفية
                          </a>
                          <a className="dropdown-item" href="#">
                            Engineering{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Designers{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            Customer Service & Call Center
                          </a>
                          <a className="dropdown-item" href="#">
                            Workers and Technicians
                          </a>
                          <a className="dropdown-item" href="#">
                            Management & Consulting
                          </a>
                          <a className="dropdown-item" href="#">
                            Drivers & Delivery{" "}
                          </a>
                          <a className="dropdown-item" href="#">
                            HR{" "}
                          </a>
                        </li>
                      </div>
                      <div>
                        <li>
                          <a className="dropdown-item" href="#">
                            Tourism, Travel & Hospitality
                          </a>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            {/* {"Split & Nested Cat"} */}
            <div className="col-2">
              <div className="fw-bold">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle-no-caret text-dark text-decoration-none"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    <LuShapes />
                    <span className="ps-2">More Categories</span>
                  </a>
                  <ul
                    style={{
                      position: "fixed",
                      left: "10%",
                      width: "80%",
                      margin: "auto",
                    }}
                    className="dropdown-menu subermenu px-3"
                  >
                    <div className="d-flex" style={{ width: "100%" }}>
                      <div>
                        <li>
                          <a
                            className="dropdown-item d-flex justify-content-between"
                            href="#"
                          >
                            <div className="d-flex flex-column pb-3">
                              <div className="fw-bold">Fashion & Beauty</div>
                              <div
                                style={{ fontSize: "small" }}
                                className="fw-light"
                              >
                                Women’s Clothing, Men’s Clothing, Women’s
                                Accessories
                              </div>
                            </div>
                            <span className="fw-bolder fs-5 arrowMoreCat">
                              <MdArrowForwardIos />
                            </span>
                          </a>
                          <ul
                            className="submenu dropdown-menu border-0 my-2"
                            style={{
                              left: "30%",
                              width: "fit-content",
                              height: "fit-content",
                              borderLeft: "1px solid #e8e5e5 !important",
                              borderRadius: "0",
                              marginLeft: "-50px",
                            }}
                          >
                            <li>
                              <a
                                className="dropdown-item fw-bold ps-1"
                                href="#"
                              >
                                All in Fashion & Beauty
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Women’s Clothing
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Men’s Clothing
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Women’s Accessories - Cosmetics - Personal Care
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Men’s Accessories - Personal Care
                              </a>
                            </li>
                          </ul>
                        </li>
                      </div>
                      {/* Repeat similar code blocks for other categories */}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="zzzz"></div>
    </>
  );
}

function Login() {
    const [modalShow, setModalShow] = React.useState(false);
    
    return (
      <>
        <button
          className="nav-link active fw-bold fs-5 text-center"
          aria-current="page"
          onClick={() => setModalShow(true)}
        >
          Login
        </button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
export default NavBar;