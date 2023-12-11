import { Row, Col } from "react-bootstrap";
import "./MyAds.css";
// import { HiOutlineShare } from "react-icons/hi";
// import { useParams } from "react-router";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { PiChatsCircle } from 'react-icons/pi'
// import { useDispatch } from "react-redux";
// import {
//   addFavorite,
//   removeFavorite,
// } from "../../store/slices/FavoriteSlice";
import { AuthContext } from "../../Context/auth";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import { IoIosArrowForward } from 'react-icons/io';
import { Helmet } from "react-helmet-async";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// import React, {useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useRef } from "react";
const MyAds = () => {
  let [dismiss, setDismiss] = useState(true);
  let [id] = useState(JSON.parse(localStorage.getItem(`userInfo`))._id)
  let [userAds, setUserAds] = useState([]);
  let [fav, setFav] = useState([]);
  const [tel, setTel] = useState([]);
  const getMyAds = async () => {
   await axiosInstanceProducts
    .get(`/products/seller?seller=${id}`)
    .then((ads) => {
      setUserAds(ads.data.formattedProducts);
      setFav(ads.data.fav)
      setTel(ads.data.numOfTel)
    });
  };
  useEffect(() => {
    getMyAds();
  }, []);

  // let [favorites, setFavorites] = useState([]);
  // FavSystem
  const { Islogged } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
      axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
        // console.log(res.data.data.user);
        // setUserInfo(res.data.data.user);
        // setFavorites(res.data.data.user.FavoriteAds);
      });
    }
  }, []);
  // const [userFavorites, setUserFavorites] = useState([]);
  // const isFavorite = (AdId) => userFavorites.some((ad) => ad._id === AdId);
  // const fetchUserFavorites = async () => {
  //   try {
  //     if (Islogged) {
  //       const userFavorites = userInfo.FavoriteAds || [];
  //       setUserFavorites(userFavorites);
  //       dispatch(setFavorites(userFavorites));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserFavorites();
  // }, [userInfo]);

  // const toggleFavorite = (productAds) => {
  //   if (Islogged) {
  //     if (isFavorite(productAds._id)) {
  //       dispatch(removeFavorite(productAds._id));
  //       updateUserFavorites(
  //         userFavorites.filter((ad) => ad._id !== productAds._id)
  //       );
  //     } else {
  //       dispatch(addFavorite(productAds));
  //       updateUserFavorites([...userFavorites, productAds]);
  //     }
  //   }
  // };

  // const updateUserFavorites = async (updatedFavorites) => {
  //   try {
  //     if (Islogged) {
  //       let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
  //       const updatedUserData = { ...userInfo, FavoriteAds: updatedFavorites };
  //       console.log(updatedUserData);
  //       console.log(userInfo._id);
  //       axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData);
  //       setUserFavorites(updatedFavorites);
  //       setFavorites(updatedFavorites);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //end ot fav System

  // Format the date
  let formatDate = (date) => {
    let inputDate = new Date(date);
    let options = { day: "numeric", month: "short", year: "2-digit" };
    let formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  // const [favNum,setFavNum]=useState()
  // const numberOfFav= (id)=>{
  //    const number= axiosInstanceProducts.get(`/products/favId?favId=${id}`)
  //     // .then((res)=>{
  //       // setFavNum(res.data)
  //       // console.log(res.data);
  //       console.log(number);
  //       return id
  //     // }).catch((err)=>{
  //     //   console.log(err);
  //     // })
  // }
  // console.log(numberOfFav());

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAd = async (productID) => {
    console.log(productID);
    try {
      await axiosInstanceProducts.delete(`/products/${productID}`).then((res) => {
        console.log(res.data);
        
      });
      axiosInstanceProducts
        .get(`/products/seller?seller=${id}`)
        .then((ads) => {
          setUserAds(ads.data.formattedProducts);
          setTel(ads.data.formattedProducts.map((tel) => tel.telephone));

        });
    } catch (error) {
      console.log(error);
    }
    setShow(false)
  }
  console.log(tel);
  const [packages, setPackages] = useState([])
  useEffect(() => {
    const getSucceededPackages = async () => {
      try {
        const succeededPackages = await axiosInstanceProducts.get(`/packageOrders/succeed/userID?userID=${id}`)
        //  console.log(succeededPackages.data);
        setPackages(succeededPackages.data)
      } catch (err) {
        console.error(err);
      }
    }
    getSucceededPackages()
  }, []);
  // console.log(packages.length);
  const updatePumpUp = async (e, productId) => {

    console.log(e);
    console.log(productId);
    const formData = new FormData();

    try {
      if (e == true) {

        formData.append("bombed", "true");
        const editPackages = await axiosInstanceProducts.patch(`/products/${productId}`, formData)
        console.log(editPackages);
      } else {

        formData.append("bombed", "false");
        const editPackages = await axiosInstanceProducts.patch(`/products/${productId}`, formData)
        console.log(editPackages);
      }
    } catch (err) {
      console.error(err);
    }
  }
  const updateFeatured = async (e, productId) => {

    // console.log(e);
    // console.log(productId);
    const formData = new FormData();

    try {
      if (e == true) {
        formData.append("featured", "true");
        const editPackages = await axiosInstanceProducts.patch(`/products/${productId}`, formData)
        console.log(editPackages);
      } else {

        formData.append("featured", "false");
        const editPackages = await axiosInstanceProducts.patch(`/products/${productId}`, formData)
        console.log(editPackages);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deactive = async (id) => {
   await axiosInstanceProducts.patch(`/products/deactive/${id}`).then((response) =>{
      console.log(response);
    })
    getMyAds()
  };

  return (
    <>
      <Helmet>
        <title>Dubizzle | My Ads</title>
      </Helmet>
      <div className="mt-5 container">
        <Row>
          <div className="px-0 py-3 text-secondary">
            <div className="text-secondary py-2">Profile</div>
            Heavy discout on Packages
            <Link to={`/choosePackage`} className="olx-color ps-4 text-decoration-none">View Packages <IoIosArrowForward /></Link>
          </div>
        </Row>
        {dismiss &&
          <Row>
            <div className="blue-div rounded my-2">
              <div className="row py-2 px-1">
                <div className="col">
                  <div className="fw-bold mb-2">Looking for Favourites & Saved searches?</div>
                  <div>Now you can find your Favourite ads & Saved searches to be in My Profile drop-down.</div>
                </div>
                <div className="col d-flex py-3 justify-content-end">
                  <button className="btn myad-delete-card px-4 me-3" onClick={() => { setDismiss(false) }}>Dismiss</button>
                  <Link to={`/myfavorites`} className="btn btn-outline-danger olx-btn px-4">Take me there</Link>
                </div>
              </div>
            </div>
          </Row>
        }
        {userAds.map((productAds, index) => (
          <div className="border rounded mb-4 row" key={productAds._id}>
            <Col
              md={"2"}
              className="d-flex justify-content-center align-items-center bg-light w-auto"
            >
              <h6>From: <span className="fw-bold">{formatDate(productAds.updatedAt)}</span></h6>
            </Col>
            <Col md={"10"} className="p-1">
              <div className="d-flex border-bottom justify-content-between">
                <Link to={`/singlePage/${productAds._id}`} className="d-flex col-3 text-decoration-none text-dark">
                  <div>
                    <img src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                      alt="" className="myad-img-card me-4" style={{ width: '5rem' }} />
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <p className="overflowTitlehidden">
                      {productAds.title}
                    </p>
                    <div className="w-auto col-2 mb-3 ms-1">EGP {productAds.price}</div>
                  </div>
                </Link>
                <div
                  className="col-7 d-flex justify-content-between align-items-center">
                  <div className={`badge px-4 rounded-pill ${productAds.productStatus === 'accept' ? 'bg-success bg-opacity-75' :
                    productAds.productStatus === 'pending' || productAds.productStatus === 'disabled' ? ' bg-secondary bg-opacity-50' :
                      'bg-danger bg-opacity-75'}  `}>
                    {productAds.productStatus}
                  </div>
                  <div>This ad was {productAds.productStatus}</div>

                  {productAds.productStatus === 'accept' &&
                    <button className="me-4 btn myad-delete-card px-2" onClick={() => deactive(productAds._id)}>Deactive Ad</button>
                  }
                  {productAds.productStatus === 'disabled' &&
                    <Link to={`/post/${productAds._id}`} className="me-4 btn myad-delete-card px-2">Republish</Link>
                  }

                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center px-4">
                <p><AiOutlineEye className="pe-2 fs-3 my-0" />Views <BsTelephone className="ps-3 pe-2 fs-1 my-0" />
                  Tel: {tel[index]} <AiFillHeart className="ps-3 pe-2 fs-1 my-0" />Likes: {fav[index]?fav[index]:'0'}<PiChatsCircle className="ps-3 pe-2 fs-1 my-0" /> Chats</p>
                {(packages.length > 0 && productAds.productStatus == 'accept') ?
                  <div className=" d-flex justify">
                    <div className="m-2 d-flex">
                      <div className="me-2 fw-bold">Pump Up</div>
                      <BootstrapSwitchButton checked={productAds.bombed == false ? false : true} onstyle="danger" onChange={(event) => updatePumpUp(event, productAds._id)} />
                    </div>
                    <div className="m-2 d-flex">
                      <div className="me-2 fw-bold">Featured</div>
                      <BootstrapSwitchButton checked={productAds.featured == false ? false : true} onstyle="warning" onChange={(event) => updateFeatured(event, productAds._id)} />
                    </div>
                  </div> : ''}
                <button className="btn myad-delete-card px-4" onClick={() => { handleShow() }}>Remove</button>
              </div>
            </Col>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this ad?</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => { deleteAd(productAds._id) }}>
                  delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyAds;
