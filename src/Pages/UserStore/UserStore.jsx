import { Container, Row, Col, Card } from "react-bootstrap";
import "./UserStore.css";
import { HiOutlineShare } from "react-icons/hi";
import { useParams } from "react-router";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { Link } from "react-router-dom";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdDone } from 'react-icons/md'
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../../store/slices/FavoriteSlice";
import { AuthContext } from "../../Context/auth";
import FavLogin from "../../Components/Login/FavLogin";
import Favorite from "../../Components/Favorite/Favorite";

const UserStore = () => {
  let { id } = useParams();
  let [isVisible, setIsVisible] = useState(false);
  let [user, setUser] = useState({});
  let [userAds, setUserAds] = useState([])
  let [picture, setPicture] = useState('')
  useEffect(() => {
    const getuser = async () => {
      await axiosInstanceProducts.get(`/users/${id}`)
        .then((res) => {
          console.log(res.data.data.user);
          setUser(res.data.data.user);
          setPicture(res.data.data.user.username[0])
          axiosInstanceProducts.get(`/products/seller?seller=${id}`).then((ads) => {
            console.log(ads.data);
            let userAds = ads.data.filter((ad) => ad.productStatus === 'accept')
            setUserAds(userAds);
            setNumOfAds(userAds.length)
          })
        });
    };
    getuser();
  }, []);
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      const timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      const timeoutId2 = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      // clearTimeout(timeoutId);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }

  // let [favorites, setFavorites] = useState([]);
  let [numOfAds, setNumOfAds] = useState(0);
  // FavSystem
  // const { Islogged } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState([]);
  // useEffect(() => {
  //   if (Islogged) {
  //     let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
  //     axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
  //       console.log(res.data.data.user);
  //       setUserInfo(res.data.data.user);
  //       setFavorites(res.data.data.user.FavoriteAds)
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
  //       setFavorites(updatedFavorites)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { Islogged } = useContext(AuthContext);
  // const dispatch = useDispatch();
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
  //       updateUserFavorites(userFavorites.filter((id) => id !== productAds._id));
  //     } else {
  //       // dispatch(addFavorite(productAds));
  //       dispatch(addFavorite(productAds._id));
  //       updateUserFavorites([...userFavorites, productAds._id]);
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
  //       console.log(updatedUserData);
  //       console.log(userInfo._id);
  //       axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
  //       setUserFavorites(updatedFavoriteIds);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //end ot fav System
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={"2"}>
            <div className="img-profile mb-3">{picture}</div>
            <p className="text-center mb-3">Published ads - {numOfAds}</p>
            <button className="btn form-control btn-share px-1" onClick={copyText}>
              {isVisible ?
                <><MdDone className="text-red fs-4" />copied to clipboard</> :
                <><HiOutlineShare className="text-red fs-4" /> Share user profile</>}
            </button>
          </Col>
          <Col md={"10"}>
            <h2 className="fw-bold">{user?.username}</h2>
            <hr />
            <Row className="mt-3 mb-5 gap-4">
              {userAds.map((productAds) => (
                <div key={productAds._id} className="text-decoration-none" style={{ width: "19rem" }} >
                  <Card style={{ width: "19rem" }} className="ms-0 ">
                    <Link to={`/singlePage/${productAds._id}`}>
                      <Card.Img
                        variant="top"
                        style={{ height: "10rem" }}
                        src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                      />
                      {productAds.featured == true && productAds.bombed == true ?
                        <><div className="badge col-3 m-3 p-1 card-img-overlay imaBadge">Featured</div>
                          <div className="badge col-3 ms-3 p-1 my-5 card-img-overlay imaBadge2">Pump up</div> </> :
                        productAds.featured == true ? <div className="badge col-3 m-3 card-img-overlay imaBadge">Featured</div>
                          : productAds.bombed == true ? <div className="badge col-3 ms-3 my-3 card-img-overlay imaBadge2">Pump up</div> : ""}
                    </Link>
                    {console.log(productAds.images[0])}
                    <Card.Body>
                      <div className="d-flex  justify-content-between">
                        <Card.Title className="olx-color">
                          {productAds.price} {productAds.currency}
                        </Card.Title>
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
                        <Favorite id={productAds._id}/>
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
                      <div className="opacity-75">{productAds.locationid}</div>
                      <div className="opacity-75">{productAds.createdAt}</div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserStore;
