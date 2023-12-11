import { Container, Row } from "react-bootstrap";
import "./FavoritePage.css";
import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAds } from "../../store/slices/subads";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../../store/slices/FavoriteSlice";
import { AuthContext } from "../../Context/auth";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";

const FavoritePage = () => {

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  // const fetchFavoriteProductDetails = async (favoriteIds) => {
  //   try {
  //     const productDetails = [];
  //     for (const productId of favoriteIds) {
  //       console.log(productId +" ya 3aaam");
  //       const response = await axiosInstanceProducts.get(`/products/${productId}`);
  //       if (response.data) {
  //         console.log(response.data.single+"NOOOOOOOOOOOO");
  //         productDetails.push(response.data.single);
  //       }
  //     }
  //     setFavoriteProducts(productDetails);
  //   } catch (error) {
  //     console.error("Error fetching favorite product details:", error);
  //   }
  // };

  const { Islogged } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userFavorites, setUserFavorites] = useState([]);
  const fetchFavoriteProductDetails = async (favoriteIds) => {
    try {
      const productDetails = [];
      for (const productId of favoriteIds) {
        try {
          const response = await axiosInstanceProducts.get(`/products/${productId}`);
          if (response.data && response.data.single) {
            productDetails.push(response.data.single);
          } else {
            console.log(`Product with ID ${productId} not found.`);
            dispatch(removeFavorite(productId));
            updateUserFavorites(userFavorites.filter((id) => id !== productId));
            setUserFavorites(userFavorites);
          }
        } catch (error) {
          console.error(`Error fetching details for product with ID ${productId}:`, error);
        }
      }
      setFavoriteProducts(productDetails);
    } catch (error) {
      console.error("Error fetching favorite product details:", error);
    }
  };


  // FavSystem
  // const [userInfo, setUserInfo] = useState([]);
  // useEffect(() => {
  //   if (Islogged) {
  //     let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
  //     axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
  //       console.log(res.data.data.user);
  //       setUserInfo(res.data.data.user);
  //     });
  //   }
  // }, []);
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
  //   }
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
  //       setUserFavorites(updatedFavorites)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
      axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
        console.log(res.data.data.user);
        setUserInfo(res.data.data.user);
      });
    }
  }, []);
  useEffect(() => {
    if (Islogged) {
      fetchFavoriteProductDetails(userFavorites);
    }
  }, [Islogged, userFavorites]);
  // const isFavorite = (AdId) => userFavorites.some((ad) => ad._id === AdId);
  const isFavorite = (productId) => userFavorites.includes(productId);
  // const fetchUserFavorites = async () => {
  //     try {
  //         if (Islogged) {
  //             const userFavorites = userInfo.FavoriteAds || [];
  //             setUserFavorites(userFavorites);
  //             dispatch(setFavorites(userFavorites));
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  const fetchUserFavorites = async () => {
    try {
      if (Islogged) {
        const userFavoriteIds = userInfo.FavoriteAds || [];
        setUserFavorites(userFavoriteIds);
        dispatch(setFavorites(userFavoriteIds));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserFavorites();
  }, [userInfo]);

  // const toggleFavorite = (productAds) => {
  //     if (Islogged) {
  //         if (isFavorite(productAds._id)) {
  //             dispatch(removeFavorite(productAds._id));
  //             updateUserFavorites(userFavorites.filter((ad) => ad._id !== productAds._id));
  //         } else {
  //             dispatch(addFavorite(productAds));
  //             updateUserFavorites([...userFavorites, productAds]);
  //         }
  //     }
  // };
  const toggleFavorite = (productAds) => {
    if (Islogged) {
      if (isFavorite(productAds._id)) {
        dispatch(removeFavorite(productAds._id));
        // updateUserFavorites(userFavorites.filter((ad) => ad._id !== productAds._id));
        updateUserFavorites(userFavorites.filter((id) => id !== productAds._id));
      } else {
        // dispatch(addFavorite(productAds));
        dispatch(addFavorite(productAds._id));
        updateUserFavorites([...userFavorites, productAds._id]);
      }
    }
  };

  // const updateUserFavorites = async (updatedFavorites) => {
  //     try {
  //         if (Islogged) {
  //             let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  //             const updatedUserData = { ...userInfo, FavoriteAds: updatedFavorites };
  //             console.log(updatedUserData);
  //             console.log(userInfo._id);
  //             axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
  //             setUserFavorites(updatedFavorites);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  const updateUserFavorites = async (updatedFavoriteIds) => {
    console.log(updatedFavoriteIds+" ana ahhhhooooo");
    try {
      if (Islogged) {
        let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
        const updatedUserData = { ...userInfo, FavoriteAds: updatedFavoriteIds };
        console.log(updatedUserData);
        console.log(userInfo._id);
        axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
        setUserFavorites(updatedFavoriteIds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //end ot fav System
  return (
    <>
      <Container className="mt-5">
        <p className="text-secondary">Profile</p>
        <h5 className="fw-bold">Favourites & Saved searches</h5>
        <div className="d-flex">
          <Link to="/myfavorites" className="fw-bold text-red active-fav">
            Favourites
          </Link>
          <Link to="/savedsearches" className="fw-bold fav">
            Saved searches
          </Link>
        </div>
        <Row className="mt-3 mb-5 gap-4">
          {favoriteProducts.map((productAds) => (
            <div key={productAds._id} className="text-decoration-none" style={{ width: "19rem" }} >
              <Card style={{ width: "19rem" }} className="ms-0 ">
                <Link to={`/singlePage/${productAds._id}`}>
                  <Card.Img
                    variant="top"
                    style={{ height: "10rem" }}
                    src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                  />
                  {productAds.featured == true && productAds.bombed == true ?
                    <><div className="badge col-3 m-3 card-img-overlay imaBadge">Featured</div>
                      <div className="badge col-3 ms-3 my-5 card-img-overlay imaBadge2">Pump up</div> </> :
                    productAds.featured == true ? <div className="badge col-3 m-3 card-img-overlay imaBadge">Featured</div>
                      : productAds.bombed == true ? <div className="badge col-3 ms-3 my-3 card-img-overlay imaBadge2">Pump up</div> : ""}
                </Link>
                <Card.Body>
                  <div className="d-flex  justify-content-between">
                    <Card.Title className="olx-color">
                      {productAds.price} {productAds.currency}
                    </Card.Title>
                    <div onClick={() => toggleFavorite(productAds)}>
                      {isFavorite(productAds._id) ? (
                        <BsSuitHeartFill className="fs-5 heart-icon" />
                      ) : (
                        <BsSuitHeart className="fs-5" />
                      )}
                    </div>
                    {/* <BsSuitHeart className='fs-5' /> */}
                  </div>
                  <Link
                    to={`/singlePage/${productAds._id}`}
                    className="link-of-product-title"
                  >
                    <Card.Text
                      style={{ maxHeight: "1.5rem", overflow: "hidden" }}
                    >
                      {productAds.title}
                    </Card.Text>
                  </Link>
                  {/* <div className='opacity-75'><PiCompassBold /></div> */}
                  <div className="opacity-75">{productAds.locationid.title || productAds.locationid}</div>
                  <div className="opacity-75">{productAds.createdAt}</div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FavoritePage;
