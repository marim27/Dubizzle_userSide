import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
// import { LiaAngleRightSolid } from 'react-icons/lia';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axiosInstanceProducts from "../../../axiosConfig/DubizzleDB";
import { AuthContext } from "../../../Context/auth";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../../../store/slices/FavoriteSlice";
import FavLogin from "../../../Components/Login/FavLogin";
import MyVerticallyCenteredModal from "../../../Components/Login/Login";
import { IDContext } from "../../../Context/IDContext";
import Favorite from "../../../Components/Favorite/Favorite";

const SearchCards = ({ filters }) => {
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("searchTerm");
  const locationTerm = new URLSearchParams(location.search).get("location");
  const SubCategorySearchTerm = new URLSearchParams(location.search).get(
    "SubCategorySearchTerm"
  );
  const CategorySearchTerm = new URLSearchParams(location.search).get(
    "CategorySearchTerm"
  );
  const minSearchTerm = new URLSearchParams(location.search).get("minPrice");
  const maxSearchTerm = new URLSearchParams(location.search).get("maxPrice");
  const { results } = location.state || {};
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const goToChat = (sellerid) => {
    navigate(`/chat/${sellerid}`);
  };
  useEffect(() => {
    if (results && results.length > 0) {
      setSearchResults(results);
    }
  }, [results]);

  // useEffect(() => {
  //     console.log("Filters changed:", filters);
  //     const fetchData = async () => {
  //         try {
  //             console.log("Fetching data...");
  //             const response = await axiosInstanceProducts.get('products/filter', {
  //                 params: {
  //                     title: (SubCategorySearchTerm || CategorySearchTerm) ? '' : filters.searchTerm || searchTerm,
  //                     min: filters.minPrice,
  //                     max: filters.maxPrice,
  //                     location: filters.location || locationTerm,
  //                     subCategoryID: SubCategorySearchTerm,
  //                     Categoryid: CategorySearchTerm,
  //                 }
  //             });
  //             console.log("Data fetched successfully:", response.data);
  //             console.log("SubCato", SubCategorySearchTerm);
  //             setFilteredResults(response.data);
  //         } catch (error) {
  //             console.error('Error fetching filtered products:', error);
  //         }
  //     };
  //     fetchData();
  // }, []);

  useEffect(() => {
    console.log("Filters changed:", filters);
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const response = await axiosInstanceProducts.get('products/filter', {
                    params: {
                        // title: (SubCategorySearchTerm || CategorySearchTerm) ? '' : filters.searchTerm || searchTerm,
                        // title:filters.searchTerm,
                        title:searchTerm,
                        min: filters.minPrice || minSearchTerm,
                        max: filters.maxPrice || maxSearchTerm,
                        location: filters.location || locationTerm,
                        subCategoryID: SubCategorySearchTerm,
                        Categoryid: CategorySearchTerm,
                    }
                });
                console.log("Data fetched successfully:", response.data);
                console.log("the search tearm is : " + filters.searchTerm);
                console.log("SubCato", SubCategorySearchTerm);
                // if(searchTerm ==filters.searchTerm){
                //     console.log("ynhaaaaaaraaaay");
                // }
                // console.log(searchTerm);
                // console.log(filters.searchTerm);
                setFilteredResults(response.data);
            } catch (error) {
                console.error('Error fetching filtered products:', error);
            }
    };
    fetchData();
  }, [
    filters,
    searchTerm,
    locationTerm,
    SubCategorySearchTerm,
    CategorySearchTerm,
  ]);

  const displayResults =
    filters.minPrice || filters.maxPrice || filters.location
      ? filteredResults
      : searchResults;
  console.log("displayResults", displayResults);

  // FavSystem
  // const { Islogged } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState([]);
  // useEffect(() => {
  //     if (Islogged) {
  //         let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  //         axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
  //             console.log(res.data.data.user);
  //             setUserInfo(res.data.data.user);
  //         });
  //     }
  // }, []);
  // const [userFavorites, setUserFavorites] = useState([]);
  // const isFavorite = (AdId) => userFavorites.some((ad) => ad._id === AdId);
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
  // useEffect(() => {
  //     fetchUserFavorites();
  // }, [userInfo]);

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
  const {user} = useContext(IDContext)

  const { Islogged } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
      axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
        console.log(res.data.data.user);
        setUserInfo(res.data.data.user);
      });
    }
  }, []);
  const [userFavorites, setUserFavorites] = useState([]);
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
        updateUserFavorites(
          userFavorites.filter((id) => id !== productAds._id)
        );
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
    try {
      if (Islogged) {
        let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
        const updatedUserData = {
          ...userInfo,
          FavoriteAds: updatedFavoriteIds,
        };
        console.log(updatedUserData);
        console.log(userInfo._id);
        axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData);
        setUserFavorites(updatedFavoriteIds);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //end ot fav System
  return (
    <div>
      <div className="fw-bold fs-5 py-1">Ads</div>
      {displayResults.length > 0 ? (
        displayResults.map((product) => (
          <div key={product._id} className="card mb-3 col-12">
            <div className="row g-0">
              <Link to={`/singlePage/${product._id}`} className="col-md-4">
                <img
                  src={`${axiosInstanceProducts.defaults.baseURL}/${product.images[0]}`}
                  className="img-fluid card-img rounded-start w-100 overflow-hidden w-100"
                  style={{ height: "20rem" }}
                  alt="..."
                />
                {product.featured == true && product.bombed == true ? (
                  <>
                    <div className="badge col-3 col-md-1 m-3 p-1 card-img-overlay imaBadge">
                      Featured
                    </div>
                    <div className="badge col-3 col-md-1 ms-3 p-1 my-5 card-img-overlay imaBadge2">
                      Pump up
                    </div>{" "}
                  </>
                ) : product.featured == true ? (
                  <div className="badge col-3 col-md-1 p-1 m-3 card-img-overlay imaBadge">
                    Featured
                  </div>
                ) : product.bombed == true ? (
                  <div className="badge col-3 col-md-1 ms-3 p-1 my-3 card-img-overlay imaBadge2">
                    Pump up
                  </div>
                ) : (
                  ""
                )}
              </Link>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between card-title ">
                    <h5 className="fw-bold fs-4 olx-color">
                      {product.currency} {product.price}
                    </h5>
                    {product.sellerid != user._id &&
                    <Favorite id={product._id} />
                                        }
                  </div>
                  <p className="card-text">{product.title}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {product.description}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {product.location} &#x2022; {product.createdAt}
                    </small>
                  </p>
                  {product.sellerid != user._id &&
                  <div className="d-flex">
                    {(product.contactMethod=="Phone Number" || product.contactMethod == 'Both')&& (
                      <div className="col-2 btn border-danger rounded-2 p-2 me-3 text-white fw-bold cllbtn">
                        {" "}
                        Call
                      </div>
                    )}
                    {(product.contactMethod == 'Dubizzle Chat' || product.contactMethod == 'Both') ? (
                      <div className="col-4 ">
                        {Islogged ? (
                          <div
                            className="col-6 btn border-danger rounded-2 fw-bold p-2 chatbtn"
                            onClick={() => {
                              goToChat(product.sellerid);
                            }}
                          >
                            {" "}
                            Chat
                          </div>
                        ) : (
                          <>
                            <div
                              className="col-6 btn border-danger rounded-2 fw-bold p-2 chatbtn"
                              onClick={() => setModalShow(true)}
                            >
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
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                    }
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};
SearchCards.propTypes = {
  filters: PropTypes.shape({
    searchTerm: PropTypes.string,
    minPrice: PropTypes.string,
    maxPrice: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
export default SearchCards;
