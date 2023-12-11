import { useState, useEffect } from "react";
import "./Attributes.css";
import { Container } from "react-bootstrap";
import { MdArrowForwardIos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axiosInstance from "./../../axiosConfig/DubizzleDB";
import { useSelector } from "react-redux";
import Placeholder from 'react-bootstrap/Placeholder';
import NavLayOut from './../../Components/nav/nav';
export default function Attributes() {
  const loader = useSelector((state) => state.loader.loader)
  // let navigate = useNavigate();
  // let goBack = () => {
  //   navigate(-1);
  // };
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subSubCategories, setSubSubCategories] = useState(null);

  useEffect(() => {
    const getCategoriesAndSubcategories = async () => {
      const res = await axiosInstance.get(
        `/categories/category/SubCategory`
      );
      setData(res.data.categoryList);
    };
    getCategoriesAndSubcategories();
  }, []);

  const showSubCategories = (cat) => {
    setSelectedCategory(cat);
    setSubSubCategories(null);
  };
  const renderCategories = () => {
    return loader ?
      <Placeholder animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
      : Object.keys(data).map((cat) => (

        <div
          key={data[cat].categoryName}
          className={`item d-flex align-items-center border-bottom p-1 ${selectedCategory === data[cat].categoryName ? "selected" : ""
            }`}
          style={{ height: "45px" }}
          role="button"
          onClick={() => showSubCategories(data[cat].subCategories)}
        >
          <img
            src={`http://localhost:5555/${data[cat].categoryImage}`}
            height="30px"
            width="70px"
            style={{ padding: "0px 20px" }}
          />
          <p style={{ marginBottom: "0", fontSize: "small" }} className="me-auto">
            {data[cat].categoryName}
          </p>
          <MdArrowForwardIos className="fs-5 pe-1" />
        </div>
      ));
  };

  const renderSubCategories = () => {
    if (selectedCategory) {
      console.log(selectedCategory);
      return selectedCategory.map((cat) => (
        <div
          key={cat.title}
          className="item d-flex justify-content-between align-items-center border-bottom p-1"
          style={{ height: "45px" }}
          role="button"
        >
          {typeof cat.title === "string" ? (
            <NavLink
              to={`/post?subCategpory=${cat._id}`}
              className="text-decoration-none text-black"
              style={{ fontSize: "small", paddingLeft: "20px" }}
            >
              {cat.title}
            </NavLink>
          ) : (
            <>
              <div style={{ fontSize: "small", paddingLeft: "20px" }}>
                {cat.title}
              </div>
              <MdArrowForwardIos className="pe-1 fs-5" />
            </>
          )}
        </div>
      ));
    }
    return null;
  };
  return (
    <>
      <Helmet>
        <title>choose a category</title>
      </Helmet>
      <Container fluid className="p-0">
        {/* <Navbar expand="lg" className="bg-body-tertiary pt-0">
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
              <NavLink to="/">
                <img
                  src="https://www.dubizzle.com.eg/assets/logo_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                  className="dubizzle"
                />
              </NavLink>
            </Navbar.Brand>
          </Container>
        </Navbar> */}
        <NavLayOut/>
      </Container>
      <div className="container">
        <h5 className="text-center m-3 fw-bold">POST YOUR AD</h5>
        <div className="card p-0 container">
          <div className="row">
            <h6 className="p-3 ps-4">CHOOSE A CATEGORY</h6>
          </div>
          <hr className="p-0 m-0" />
          <div className="row">
            <div className="col-4 border-end pe-0" id="main-cat">
              {renderCategories()}
            </div>
            <div className="col-4 border-end p-0" id="sub1-cat">
              {renderSubCategories()}
            </div>
            <div className="col-4 ps-0" id="sub2-cat">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
