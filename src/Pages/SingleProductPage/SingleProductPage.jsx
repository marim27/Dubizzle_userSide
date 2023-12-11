import "./SingleProductPage.css";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
// import { AiOutlineHeart } from "react-icons/ai";

import {
  BsChevronCompactRight,
  BsShare,
  BsGeoAlt,
  BsFlag,
  BsChevronCompactLeft,
  BsTelephone,
  // BsSuitHeartFill,
  BsSuitHeart,
} from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstanceProducts from "./../../axiosConfig/DubizzleDB";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import PageLoaderes from "../../Components/PageLoaderes/PageLoaderes";
import { AuthContext } from "../../Context/auth";
// import {
//   addFavorite,
//   removeFavorite,
//   setFavorites,
// } from "../../store/slices/FavoriteSlice";
// import FavLogin from "../../Components/Login/FavLogin";
import MyVerticallyCenteredModal from "../../Components/Login/Login";
import { AiOutlineEye } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { TbPhone } from "react-icons/tb";
import Favorite from "../../Components/Favorite/Favorite";
// import { IDContext } from "../../Context/IDContext";

export default function SingleProductPage() {
  const [modalShow, setModalShow] = useState(false);
  let { id } = useParams();
  const loader = useSelector((state) => state.loader.loader);
  // console.log(id);
  const navigate = useNavigate();
  const [singlePtoduct, setsinglePtoduct] = useState({});
  const [listPtoduct, setlistPtoduct] = useState([]);
  const [location, setlocation] = useState({});
  const [userID, setUserID] = useState("");
  const [sellerid, setSellerid] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  // const { user } = useContext(IDContext);
  const [singlePtoductM, setsinglePtoductM] = useState({});
  const [singlePtoductImages, setsinglePtoductMImages] = useState([]);
  const [user, setuser] = useState({});
  const [userIcone, setuserIcone] = useState();
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState({});
  const [fav, setFav] = useState(0);
  const [tel, setTel] = useState(0);
  const [adId, setAdId] = useState("");
  const ShowPhoneNumber = () => {
    setShowPhone(true);
    updatePhoneViews()
  };
  const ShowPhoneNumberLogOut = () => {
    setShowPhone(true);
  };

  const sigleProduct = async () => {
    const res = await axiosInstanceProducts.get(`/products/${id}`);
    setsinglePtoduct(res.data.single);
    setlistPtoduct(res.data.list);
    setlocation((prevState) => ({
      ...prevState,
      image: res.data.single.locationid.image,
      title: res.data.single.locationid.title,
    }));
    setsinglePtoductM(res.data.single);
    setFav(res.data.numOfLikes);
    setAdId(res.data.single._id.slice(0, 9))
    setsinglePtoductMImages(res.data.single.images);
    setuser(res.data.single.sellerid);
    setCategory(res.data.single.Categoryid);
    setSubCategory(res.data.single.subCategoryID);
    res.data.single.sellerid.createdAt = new Date(
      res.data.single.sellerid.createdAt
    ).toDateString();
    // console.log(res.data.single);
    setuserIcone(res.data.single.sellerid.username[0]);
    setCreatedAt(
      new Date(res.data.single.sellerid.createdAt).toLocaleDateString()
    );

    setSellerid(res.data.single.sellerid._id);
    setTel(res.data.single.telephone.length);

  };
  useEffect(() => {
    sigleProduct();
  }, []);
  const { Islogged } = useContext(AuthContext);

      let userId = JSON.parse(localStorage.getItem("userInfo"))._id;

    const updatePhoneViews = async () => {
       await axiosInstanceProducts.patch(`/products/phoneView/${id}`,
      {telephone:userId});
// console.log(res.data);
// console.log(res.data.telephone.length);
    }






  // const sigleProductM = async () => {
  //   const res = await axiosInstanceProducts.get(`/products/${id}`);
  // console.log(res.data);
  // setsinglePtoductM(res.data.single);
  // setFav(res.data.numOfLikes);
  // setAdId(res.data.single._id.slice(0, 9))
  // setsinglePtoductMImages(res.data.single.images);
  // setuser(res.data.single.sellerid);
  // setCategory(res.data.single.Categoryid);
  // setSubCategory(res.data.single.subCategoryID);
  // res.data.single.sellerid.createdAt = new Date(
  //   res.data.single.sellerid.createdAt
  // ).toDateString();
  // // console.log(res.data.single.sellerid.username[0]);
  // setuserIcone(res.data.single.sellerid.username[0]);
  // setCreatedAt(
  //   new Date(res.data.single.sellerid.createdAt).toLocaleDateString()
  // );

  // setSellerid(res.data.single.sellerid._id);
  // };
  // useEffect(() => {
  //   sigleProductM();
  // }, []);



  // useEffect(() => {
  //   const id=JSON.parse(localStorage.getItem(`userInfo`))._id
  //   console.log('user',id);
  // }, []);
  // console.log(singlePtoduct);
  // console.log(listPtoduct);
  // console.log(location);
  const imgoClick = () => {
    var src = $(this).attr("src");
    var index = $(this).parent().index() + 1;
    var total = $(".gallery img").length;
    $(".overlay-image").attr("src", src);
    $("#image-number").text(index + " / " + total);
    $(".overlay").css("display", "flex").fadeIn();
    var lastImage = $(".gallery .carousel-item")
      .first()
      .find("img")
      .attr("src");
    $(".overlay-image").attr("src", lastImage);
  };
  useEffect(() => {
    $(".overlay").click(function (e) {
      if (e.target === this) {
        $(".overlay").fadeOut();
      }
    });
    $(".prev").click(function () {
      var currentImage = $(".overlay-image").attr("src");
      var prevImage = $(
        '.gallery .carousel-item:has(img[src="' + currentImage + '"])'
      )
        .prev()
        .find("img")
        .attr("src");
      if (prevImage) {
        $(".overlay-image").attr("src", prevImage);
      } else {
        var firstImage = $(".gallery .carousel-item")
          .last()
          .find("img")
          .attr("src");
        $(".overlay-image").attr("src", firstImage);
      }
      updateImageNumber();
    });

    $(".next").click(function () {
      var currentImage = $(".overlay-image").attr("src");
      var nextImage = $(
        '.gallery .carousel-item:has(img[src="' + currentImage + '"])'
      )
        .next()
        .find("img")
        .attr("src");
      if (nextImage) {
        $(".overlay-image").attr("src", nextImage);
      } else {
        var lastImage = $(".gallery .carousel-item")
          .first()
          .find("img")
          .attr("src");
        $(".overlay-image").attr("src", lastImage);
      }
      updateImageNumber();
    });

    function updateImageNumber() {
      var currentImage = $(".overlay-image").attr("src");
      var imageIndex =
        $(".gallery img").index($('.gallery img[src="' + currentImage + '"]')) +
        1;
      var totalImages = $(".gallery img").length;
      $("#image-number").text(imageIndex + " / " + totalImages);
    }

    $(".close-overlay").click(function () {
      $(".overlay").fadeOut();
    });

    $(".loc-btn").click(function () {
      var src = $(".loc-img img").attr("src");
      $(".overlay-image2").attr("src", src);
      $(".overlay2").css("display", "flex").fadeIn();
    });

    $(".close-overlay2").click(function () {
      $(".overlay2").fadeOut();
    });
    $(".overlay2").click(function (e) {
      if (e.target === this) {
        $(".overlay2").fadeOut();
      }
    });
    return () => {
      // $(".imgo").off();
      $(".overlay").off();
      $(".prev").off();
      $(".next").off();
      $(".close-overlay").off();
      $(".loc-btn").off();
      $(".close-overlay2").off();
      $(".overlay2").off();
    };
  }, []);
  // const handleAdClick = (productId) => {
  //   navigate(`/singlePage/${productId}`);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Optional: Add smooth scrolling animation
  //   });
  //   window.location.reload();
  // };



  const relatedSigleAd = async (adId) => {
    await axiosInstanceProducts.get(`/products/${adId}`).then((res) => {
      setsinglePtoductM(res.data.single);
      setsinglePtoductMImages(res.data.single.images);
      setuser(res.data.single.sellerid);
      setCategory(res.data.single.Categoryid);
      setSubCategory(res.data.single.subCategoryID);
      res.data.single.sellerid.createdAt = new Date(
        res.data.single.sellerid.createdAt
      ).toDateString();
      // console.log(res.data.single.sellerid.username[0]);
      setuserIcone(res.data.single.sellerid.username[0]);
      setCreatedAt(
        new Date(res.data.single.sellerid.createdAt).toLocaleDateString()
      );
      setSellerid(res.data.single.sellerid._id);
    })
    navigate(`/singlePage/${adId}`)
  };

  const deactive = async (id) => {
    await axiosInstanceProducts.patch(`/products/deactive/${id}`).then((response) => {
      console.log(response);
    })
    relatedSigleAd(id)
  };

  // console.log(subCategory.title);
  // console.log(fav);

  // const { Islogged } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
      // axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
      // console.log(res.data.data.user);
      setUserID(userId);
      // setUserInfo(res.data.data.user);
      // });
    }
  }, []);
  // console.log(userID);
  // console.log(sellerid);
  // const [userFavorites, setUserFavorites] = useState([]);
  // // const isFavorite = (AdId) => userFavorites.some((ad) => ad._id === AdId);
  // const isFavorite = (productId) => userFavorites.includes(productId);
  // // const fetchUserFavorites = async () => {
  // //     try {
  // //         if (Islogged) {
  // //             const userFavorites = userInfo.FavoriteAds || [];
  // //             setUserFavorites(userFavorites);
  // //             dispatch(setFavorites(userFavorites));
  // //         }
  // //     } catch (error) {
  // //         console.log(error);
  // //     }
  // // };
  // const fetchUserFavorites = async () => {
  //   try {
  //     if (Islogged) {
  //       const userFavoriteIds = userInfo.FavoriteAds || [];
  //       setUserFavorites(userFavoriteIds);
  //       dispatch(setFavorites(userFavoriteIds));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserFavorites();
  // }, [userInfo]);

  // // const toggleFavorite = (productAds) => {
  // //     if (Islogged) {
  // //         if (isFavorite(productAds._id)) {
  // //             dispatch(removeFavorite(productAds._id));
  // //             updateUserFavorites(userFavorites.filter((ad) => ad._id !== productAds._id));
  // //         } else {
  // //             dispatch(addFavorite(productAds));
  // //             updateUserFavorites([...userFavorites, productAds]);
  // //         }
  // //     }
  // // };
  // const toggleFavorite = (productAds) => {
  //   if (Islogged) {
  //     if (isFavorite(productAds._id)) {
  //       dispatch(removeFavorite(productAds._id));
  //       // updateUserFavorites(userFavorites.filter((ad) => ad._id !== productAds._id));
  //       axiosInstanceProducts.get(`/products/favId?favId=${productAds._id}`)
  //       updateUserFavorites(userFavorites.filter((id) => id !== productAds._id));
  //     } else {
  //       // dispatch(addFavorite(productAds));
  //       dispatch(addFavorite(productAds._id));
  //       updateUserFavorites([...userFavorites, productAds._id]);
  //       //  axiosInstanceProducts.get(`/products/favId?favId=${productAds._id}`)
  //     }
  //   }
  // };

  // // const updateUserFavorites = async (updatedFavorites) => {
  // //     try {
  // //         if (Islogged) {
  // //             let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  // //             const updatedUserData = { ...userInfo, FavoriteAds: updatedFavorites };
  // //             console.log(updatedUserData);
  // //             console.log(userInfo._id);
  // //             axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
  // //             setUserFavorites(updatedFavorites);
  // //         }
  // //     } catch (error) {
  // //         console.log(error);
  // //     }
  // // };

  // const updateUserFavorites = async (updatedFavoriteIds) => {
  //   try {
  //     if (Islogged) {
  //       let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  //       const updatedUserData = { ...userInfo, FavoriteAds: updatedFavoriteIds };
  //       // console.log(updatedUserData);
  //       // console.log(userInfo._id);
  //       axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
  //       setUserFavorites(updatedFavoriteIds);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // //end ot fav System

  const goToChat = (sellerid) => {
    navigate(`/chat/${sellerid}`);
  };
  const handleSubcategoryClick = async (subcategoryId, subcategoryTitle) => {
    try {
      const response = await axiosInstanceProducts.get(
        `/products/search?subCategoryID=${subcategoryId}`
      );
      const data = await response.data;
      navigate(`/search?SubCategorySearchTerm=${subcategoryId}`, {
        state: { results: data },
      });
      console.log(subcategoryTitle);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{singlePtoduct.title}</title>
      </Helmet>
      <div className="container mt-5">
        <div
          className="ms-1 my-1 my-md-4"
          style={{ fontSize: ".9vw" }}
          onClick={() =>
            handleSubcategoryClick(subCategory._id, subCategory.title)
          }
        >
          <Link to="/" className="text-decoration-none text-secondary" id="up">
            Home /
          </Link>
          <Link
            className="text-decoration-none text-secondary"
            to={`/search?searchTerm=${subCategory._id}`}
          >
            {category.name} /
          </Link>
          <Link
            className="text-decoration-none text-secondary"
            to={`/search?searchTerm=${subCategory._id}`}
          >
            {subCategory.title} /
          </Link>
          <Link
            className="text-decoration-none text-secondary"
            to={`/search?searchTerm=${subCategory._id}`}
          >
            {subCategory.title} in {location.title}
          </Link>
        </div>
        <div className="row">
          <div className="col-xxl-8">
            {/* marim */}
            <>
              <div
                id="carouselExampleIndicators"
                className="carousel slide gallery"
              >
                <div className="carousel-indicators">
                  {singlePtoductImages.map((img, i) => (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={i}
                      key={i}
                      className="active"
                      aria-current="true"
                      aria-label={`Slide ${i + 1}`}
                    ></button>
                  ))}
                </div>
                {loader ? (
                  <PageLoaderes />
                ) : (
                  <div
                    className="carousel-inner ps-0 ps-md-2 "
                    style={{ height: "25rem", backgroundColor: "#000" }}
                  >
                    {singlePtoductImages.map((img, i) => (
                      // (console.log(img))
                      <div
                        className={`carousel-item ms-md-5 ms-3 w-100 h-100 ${i === 0 ? "active" : ""
                          }`}
                        key={i}
                        style={{ backgroundColor: "#000" }}
                      >
                        <img
                          src={`${axiosInstanceProducts.defaults.baseURL}/${img}`}
                          alt={singlePtoductM.title}
                          className="d-block w-75 rounded imgo img-fluid ms-5 h-100"
                          onClick={() => imgoClick(img)}
                        />
                        {singlePtoductM.featured == true &&
                          singlePtoductM.bombed == true ? (
                          <>
                            <div className="badge col-3 col-md-1 m-3 p-1 card-img-overlay imaBadge">
                              Featured
                            </div>
                            <div className="badge col-3 col-md-1 m-3 ms-3 p-1 my-5 card-img-overlay imaBadge2">
                              Pump up
                            </div>{" "}
                          </>
                        ) : singlePtoductM.featured == true ? (
                          <div className="badge col-3 col-md-1 p-1 m-3 card-img-overlay imaBadge">
                            Featured
                          </div>
                        ) : singlePtoductM.bombed == true ? (
                          <div className="badge col-3 col-md-1 p-1 ms-3 my-3 card-img-overlay imaBadge2">
                            Pump up
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="carousel-control-prev main-add"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    id="carouselPT"
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next main-add"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    id="carouselNT"
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="mt-3 border rounded p-3">
                <div>
                  <div className="row">
                    <div className="col-6">
                      <h1 className="fw-bold" style={{ color: "#E00000" }}>
                        {singlePtoductM.currency} {singlePtoductM.price}
                      </h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end fs-4">
                      <BsShare className="me-3" />
                      {/* {Islogged ?
                        <div onClick={() => toggleFavorite(singlePtoductM)}>
                          {isFavorite(singlePtoductM._id) ? (
                            <BsSuitHeartFill className="fs-5 heart-icon" role='button' />
                          ) : (
                            <BsSuitHeart className="fs-5" role='button' />
                          )}
                        </div> :
                        <FavLogin />
                      } */}
                      {sellerid != userID && (
                        <Favorite id={singlePtoductM._id} />
                      )}
                    </div>
                  </div>
                </div>
                <h5 className="fw-bold mt-3">{singlePtoductM.title}</h5>
                <div className="mt-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <div
                        className="d-flex fs-6 fw-semibold "
                        style={{ color: "#737577" }}
                      >
                        <BsGeoAlt className="me-2 align-self-center" />
                        <p className="m-0">{location.title}</p>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="m-0">{singlePtoductM.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 border rounded p-3">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h4>Details</h4>
                  </div>
                  <div className="col-3">
                    <p>Price Type</p>
                    <p>Brand</p>
                    <p>condition</p>
                    <p>Price</p>
                  </div>
                  <div className="col-3 fw-bold">
                    <p>
                      {singlePtoductM.PriceType
                        ? singlePtoductM.PriceType
                        : "____"}
                    </p>
                    <p>
                      {singlePtoductM.Brand ? singlePtoductM.Brand : "____"}
                    </p>
                    <p>
                      {singlePtoductM.condition
                        ? singlePtoductM.condition
                        : "____"}
                    </p>
                    <p>
                      {singlePtoductM.price ? singlePtoductM.price : "____"}
                    </p>
                  </div>
                  <div className="col-3">
                    <p>PaymentOption</p>
                    <p>Delivery</p>
                    <p>Video</p>
                    <p>Transmission</p>
                  </div>
                  <div className="col-3 fw-bold">
                    <p>
                      {singlePtoductM.PaymentOption
                        ? singlePtoductM.PaymentOption
                        : "____"}
                    </p>
                    <p>
                      {singlePtoductM.Deliverable == true
                        ? "available"
                        : "not available"}
                    </p>
                    <p>
                      {singlePtoductM.Video == true
                        ? "available"
                        : "not available"}
                    </p>
                    <p>
                      {singlePtoductM.Transmission == true
                        ? "available"
                        : "not available"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 border rounded p-3">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h4>Description</h4>
                  </div>
                  <div className="col-12">
                    <p>{singlePtoductM.description}</p>
                  </div>
                </div>
              </div>
            </>

            {/* Location */}
            <div className="mt-3 border rounded p-3">
              <div className="row">
                <div className="col-12 mb-2">
                  <h4>Location</h4>
                </div>
                {/* {Object.keys(singlePtoduct).length && ( */}
                <div className="row mx-auto">
                  <div className="col-12">
                    <div
                      className="d-flex fs-6 fw-semibold"
                      style={{ color: " black" }}
                    >
                      <BsGeoAlt className="me-2 align-self-center" />
                      <p className="m-0">
                        {location.title},{location.title}
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-12 mt-2 "
                    style={{ position: "relative" }}
                  >
                    <div className="loc-img " style={{ overflow: "hidden" }}>
                      {/* <div className="col-12 "> */}
                      <img
                        src={`http://localhost:5555/${location.image}`}
                        alt=""
                        className="w-100 rounde locationTransition"
                      />
                      {/* </div> */}
                    </div>
                    <button
                      className="d-flex fs-6 fw-semibold border border-danger-subtle justify-content-center loc-btn p-2 rounded"
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <BsGeoAlt className="me-2 align-self-center" />
                      <p className="m-0">See location</p>
                    </button>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            <div className="overlay2 col-xxl-12" style={{ zIndex: "1050" }}>
              <div className="overlay2">
                <img className="overlay-image2" src="" alt="" />
              </div>
            </div>
            <div className="mt-3">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <div className="d-flex fs-6 fw-semibold">
                    <p className="m-0">AD ID {adId}</p>
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <div className="d-flex fs-6 fw-bold">
                    <BsFlag
                      className="bi bi-flag me-2 align-self-center"
                      style={{ color: "#E00000" }}
                    />
                    <p className="m-0">Report this ad</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 border h-0"></div>
            {/* Realted ADS */}
            {userID !== sellerid && (
              <div className="mt-3  mb-5">
                <div className="row">
                  <div className="col-12 mb-3">
                    <h4>Related ads</h4>
                  </div>

                  {/*Related ads  */}
                  <div className="col-12 mb-2">
                    <div
                      id="carouselExampleCaptions"
                      className="carousel carousel-dark slide"
                      data-bs-ride="false"
                    >
                      {/* parent carousel */}

                      {/* Start */}
                      <div className="container" style={{ height: "20rem" }}>
                        <div className="carousel-inner">
                          {listPtoduct.length > 0 ? (
                            [...Array(Math.ceil(listPtoduct.length / 3))].map(
                              (_, loopIndex) => (
                                <div
                                  key={loopIndex}
                                  className={`carousel-item ${loopIndex === 0 ? "active" : ""
                                    }`}
                                >
                                  <div className="row">
                                    {listPtoduct
                                      .slice(loopIndex * 3, (loopIndex + 1) * 3)
                                      .map((productAds) => (
                                        <div
                                          key={productAds._id}
                                          className="col-4 px-0 mx-0"
                                          style={{ height: "35rem" }}
                                        >
                                          <div className="card border">
                                            {/* <Link  className='text-decoration-none' > */}
                                            <a href="#up"
                                              onClick={() =>
                                                relatedSigleAd(productAds._id)
                                              }
                                            >
                                              <img
                                                src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                                                className="card-img-top"
                                                alt="..."
                                                role="button"
                                              />
                                            </a>
                                            {productAds.featured == true &&
                                              productAds.bombed == true ? (
                                              <>
                                                <div className="badge col-6 col-md-3 m-3 p-1 card-img-overlay imaBadge">
                                                  Featured
                                                </div>
                                                <div className="badge col-6 col-md-3 ms-3 p-1 my-5 card-img-overlay imaBadge2">
                                                  Pump up
                                                </div>{" "}
                                              </>
                                            ) : productAds.featured == true ? (
                                              <div className="badge col-6 col-md-3 m-3 card-img-overlay imaBadge">
                                                Featured
                                              </div>
                                            ) : productAds.bombed == true ? (
                                              <div className="badge col-6 col-md-3 ms-3 my-3 card-img-overlay imaBadge2">
                                                Pump up
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-7 d-flex align-items-center pe-0">
                                                  <div className="d-flex fw-semibold fs-5">
                                                    <p
                                                      className="card-title"
                                                      style={{
                                                        color: "#E00000",
                                                      }}
                                                    >
                                                      {productAds.price}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-5 d-flex justify-content-end align-items-center ps-0">
                                                  <div className="d-flex fw-bold">
                                                    {/* {Islogged ?
                                                      <div onClick={() => toggleFavorite(productAds)}>
                                                        {isFavorite(productAds._id) ? (
                                                          <BsSuitHeartFill className="fs-5 heart-icon" role='button' />
                                                        ) : (
                                                          <BsSuitHeart className="fs-5" role='button' />
                                                        )}
                                                      </div> :
                                                      <FavLogin />
                                                    } */}
                                                    <Favorite
                                                      id={productAds._id}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <p
                                                className="card-text"
                                                style={{
                                                  maxHeight: "1.5rem",
                                                  overflow: "hidden",
                                                }}
                                                role="button"
                                                onClick={() =>
                                                  relatedSigleAd(productAds._id)
                                                }
                                              >
                                                {productAds.title}
                                              </p>
                                              <p className="card-text">
                                                {productAds.createdAt}
                                              </p>
                                              <p className="card-text">
                                                {productAds.locationid.title}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <div className="carousel-item active">
                              <p>No products available</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* End */}
                      <>
                        <button
                          className="carousel-control-prev adds"
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide="prev"
                        >
                          <span
                            id="carouselPB"
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          className="carousel-control-next adds"
                          type="button"
                          data-bs-target="#carouselExampleCaptions"
                          data-bs-slide="next"
                        >
                          <span
                            id="carouselNB"
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    </div>
                  </div>

                  {/*22  */}
                  <div className="col-12 mb-2">
                    <div
                      id="carouselExampleCaptions2"
                      className="carousel carousel-dark slide"
                      data-bs-ride="false"
                    >
                      <div className="carousel-inner">
                        {listPtoduct.map((productAds, index) => (
                          <div
                            key={productAds._id}
                            className={`carousel-item ${index === 0 ? "active" : ""
                              }`}
                          >
                            <div className="card border">
                              <img
                                src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                                className="card-img-top"
                                alt="..."
                                style={{ width: "100%", height: "20rem" }}
                                role="button"
                                onClick={() => {
                                  navigate(`/singlePage/${productAds._id}`);
                                  window.location.reload();
                                }}
                              />
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-7 d-flex align-items-center pe-0">
                                    <div className="d-flex fw-semibold fs-5">
                                      <p
                                        className="card-title"
                                        style={{ color: "#E00000" }}
                                      >
                                        {productAds.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-5 d-flex justify-content-end align-items-center ps-0">
                                    <div className="d-flex fw-bold">
                                      <Favorite id={productAds._id} />
                                      {/* <div onClick={() => toggleFavorite(productAds)}>

                                        {isFavorite(productAds._id) ? <BsSuitHeartFill style={{ color: "#E00000" }} /> : <BsSuitHeart />}
                                      </div> */}
                                      {/* {isFavorite(productAds._id) ? <BsSuitHeartFill onClick={() => toggleFavorite(productAds)} style={{color:"red"}} /> : <BsSuitHeart onClick={() => toggleFavorite(singlePtoduct)} />} */}
                                    </div>
                                  </div>
                                </div>
                                <p
                                  className="card-text"
                                  role="button"
                                  onClick={() => {
                                    navigate(`/singlePage/${productAds._id}`);
                                    window.location.reload();
                                  }}
                                >
                                  {productAds.title}
                                </p>
                                <p className="card-text">
                                  {productAds.locationid.title}
                                </p>
                                <p className="card-text">
                                  {productAds.createdAt}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev adds"
                        type="button"
                        data-bs-target="#carouselExampleCaptions2"
                        data-bs-slide="prev"
                      >
                        <span
                          id="carouselPB"
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next adds"
                        type="button"
                        data-bs-target="#carouselExampleCaptions2"
                        data-bs-slide="next"
                      >
                        <span
                          id="carouselNB"
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* chating and instructions */}
          <div className="col-xxl-4">

            {loader ? <PageLoaderes /> :
              (Islogged && (userID == sellerid)) ?

                <div className="p-4 border rounded">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <AiOutlineEye className="fs-2 mt-2 p-1 my-0 bg-secondary bg-opacity-10 rounded me-2" />
                      <div>
                        <div className="fw-bold">0</div>
                        <div className="font-small">Views</div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <TbPhone className="fs-2 mt-2 p-1 my-0 bg-secondary bg-opacity-10 rounded me-2" />
                      <div>
                        <div className="fw-bold">{tel}</div>
                        <div className="font-small">Tel</div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <BsChatDots className="fs-3 mt-2 p-1 my-0 bg-secondary bg-opacity-10 rounded me-2" />
                      <div>
                        <div className="fw-bold">0</div>
                        <div className="font-small">Chats</div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <BsSuitHeart className="fs-3 mt-2 p-1 my-0 bg-secondary bg-opacity-10 rounded me-2" />
                      <div>
                        <div className="fw-bold">{fav}</div>
                        <div className="font-small">Likes</div>
                      </div>
                    </div>
                  </div>
                  <div className="olx-light-yellow mt-4 rounded row">
                    <div className="col-9">
                      <div className="fw-bold my-2 font-small">
                        Your Ad is {singlePtoductM.productStatus}
                      </div>
                      <div className="my-2 font-small">
                        You published this ad on {createdAt}
                      </div>
                      {/* <button className="btn btn-outline-danger olx-btn px-4 mb-2">
                      Deactive Ad
                    </button> */}
                      {singlePtoductM.productStatus === 'accept' &&
                        <button className="btn btn-outline-danger olx-btn px-4 mb-2" onClick={() => deactive(singlePtoductM._id)}>Deactive Ad</button>
                      }
                      {singlePtoductM.productStatus === 'disabled' &&
                        <Link to={`/post/${singlePtoductM._id}`} className="btn btn-outline-danger olx-btn px-4 mb-2">Republish</Link>
                      }
                    </div>
                    <div className="col-3 mt-3">
                      <img
                        src="../../../images/iconWarning.svg"
                        alt="icon Warning"
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
                :
                // loader ? <PageLoaderes /> :
                <div
                  className=" justify-content-between align-items-center border rounded px-2 py-3"
                  style={{ flexWrap: "wrap" }}
                >
                  <div className="row me-0">
                    <div className="mt-2 fs-2 pt-1 ms-3 pb-2 userIcone text-center">
                      {userIcone}
                    </div>
                    <div className="col-9">
                      <div className="ms-2">
                        <h6 className="fw-bold">{user.username}</h6>
                        <p className="m-0">member since {user.createdAt}</p>
                        <Link
                          className="text-decoration-none"
                          to={`/userStore/${user._id}`}
                        >
                          <h6 style={{ color: "#E00000", fontWeight: "bold" }}>
                            See profile <FaAngleRight />
                          </h6>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                 <img src="../../../assets/Images/584-400x300.jpeg" className="rounded comp-logo-img" alt="" />
                        </div> */}
                  <div className="w-100">
                    {(singlePtoduct.contactMethod == "Phone Number" || singlePtoduct.contactMethod == 'Both') && !showPhone && (
                      <div
                        style={{
                          backgroundColor: "#E00000",
                          color: "white",
                          cursor: "pointer",
                        }}
                        className="d-flex justify-content-center align-items-center fs-5 fw-semibold rounded pt-2 pb-2 mx-1 mt-3 showPhone"
                        onClick={ShowPhoneNumber}
                      >
                        <BsTelephone className="me-2" />
                        <p className="m-0" onClick={() => setModalShow(true)}>
                          Show Phone Number
                        </p>
                      </div>
                    )}

                    {showPhone && Islogged ? (
                      <div
                        style={{
                          backgroundColor: "#E00000",
                          color: "white",
                          cursor: "pointer",
                        }}
                        className="d-flex justify-content-center align-items-center fs-5 fw-semibold rounded pt-2 pb-2 mx-1 mt-3 showPhone"
                        onClick={ShowPhoneNumber}
                      >
                        <BsTelephone className="me-2" />
                        <p className="m-0">{singlePtoduct.phoneNumber}</p>
                      </div>
                    ) : showPhone && !Islogged ? (
                      <>
                        <div onClick={() => setModalShow(true)}>
                          <div
                            style={{
                              backgroundColor: "#E00000",
                              color: "white",
                              cursor: "pointer",
                            }}
                            className="d-flex justify-content-center align-items-center fs-5 fw-semibold rounded pt-2 pb-2 mx-1 mt-3 showPhone"
                            onClick={ShowPhoneNumberLogOut}
                          >
                            <BsTelephone className="me-2" />
                            <p className="m-0">Show Phone Number</p>
                          </div>
                        </div>

                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </>
                    ) : (
                      ""
                    )}

                    {(singlePtoduct.contactMethod == 'Dubizzle Chat' || singlePtoduct.contactMethod == 'Both') ? (
                      <>
                        {Islogged ? (
                          <div
                            className="d-flex justify-content-center align-items-center fs-5 fw-semibold rounded 
                pt-2 pb-2 mx-1 mt-3 border border-danger chato"
                            onClick={() => {
                              goToChat(user._id);
                            }}
                          >
                            <IoChatbubblesOutline
                              className="me-2"
                              style={{ color: "#E00000" }}
                            />
                            <p className="m-0">Chat</p>
                          </div>
                        ) : (
                          <>
                            <div
                              className="d-flex justify-content-center align-items-center fs-5 fw-semibold rounded 
                  pt-2 pb-2 mx-1 mt-3 border border-danger chato"
                              onClick={() => setModalShow(true)}
                            >
                              <IoChatbubblesOutline
                                className="me-2"
                                style={{ color: "#E00000" }}
                              />
                              <div>
                                <p className="m-0">Chat</p>
                              </div>
                            </div>
                            <MyVerticallyCenteredModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

            }

            <div className="border rounded mt-3 p-3">
              <h4>Your safety matters to us!</h4>
              <ul>
                <li>
                  Only meet in public / crowded places for example metro
                  stations and malls.
                </li>
                <li>
                  Never go alone to meet a buyer / seller, always take someone
                  with you.
                </li>
                <li>
                  Check and inspect the product properly before purchasing it.
                </li>
                <li>
                  Never pay anything in advance or transfer money before
                  inspecting the product.
                </li>
              </ul>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="overlay col-xxl-12" style={{ zIndex: "1050" }}>
                <div className="overlay">
                  <img className="overlay-image" src="" alt="" />
                  <div className="pagination">
                    <button className="prev">
                      <BsChevronCompactLeft />
                    </button>
                    <button className="next">
                      <BsChevronCompactRight />
                    </button>
                  </div>
                  <p id="image-number" className="image-number"></p>
                  <span className="close-overlay">X</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
