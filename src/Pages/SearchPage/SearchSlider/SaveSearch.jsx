import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import "../SearchPage.css";
import { Badge, Row } from "react-bootstrap";
import axiosInstance from "../../../axiosConfig/DubizzleDB";
import { AuthContext } from "../../../Context/auth";
import { useDispatch } from "react-redux";
import axiosInstanceProducts from "../../../axiosConfig/DubizzleDB";
import { addFavoriteSearch, setFavoritesSearch } from "../../../store/slices/FavoriteSearchSlice";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from './../../../Components/Login/Login';

function MyVerticallyCenteredModal2(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const SearchTerm = queryParams.get("searchTerm");
  const Location = queryParams.get("location");
  let minPrice = queryParams.get("minPrice");
  let maxPrice = queryParams.get("maxPrice");
  const SubCategorySearchTerm = queryParams.get("SubCategorySearchTerm");
  const [SubCategory, setSubCategory] = useState('');
  const CategorySearchTerm = queryParams.get("CategorySearchTerm");
  const [Category, setCategory] = useState('');
  const URL = window.location.href;
  let Price = null;


  if (minPrice !== null && maxPrice !== null) {
    Price = `${minPrice} to ${maxPrice}`;
  } else if (minPrice === null && maxPrice) {
    minPrice = 0;
    Price = `${minPrice} to ${maxPrice}`;
  } else if (maxPrice === null && minPrice) {
    maxPrice = 1000000000;
    Price = `${minPrice} to ${maxPrice}`;
  }

  console.log(Price);

  if (SubCategorySearchTerm) {
    axiosInstance
      .get(`/subcategories/${SubCategorySearchTerm}`)
      .then((res) => {
        console.log(res.data.data.subCategory.title);
        setSubCategory(res.data.data.subCategory.title)
        setTitle([SearchTerm, Location, res.data.data.subCategory.title, Category]
          .filter(value => value !== null && value !== undefined && value !== "")
          .join(", "))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (CategorySearchTerm) {
    axiosInstance
      .get(`/categories/${CategorySearchTerm}`)
      .then((res) => {
        console.log(res.data.name);
        setCategory(res.data.name)
        setTitle([SearchTerm, Location, res.data.data.subCategory.title, Category]
          .filter(value => value !== null && value !== undefined && value !== "")
          .join(", "))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const defaultTitle = [SearchTerm, Location, SubCategory, Category]
    .filter(value => value !== null && value !== undefined && value !== "")
    .join(", ");

  const [title, setTitle] = useState(defaultTitle);
  console.log(title);

  const searchParams = {
    URL,
    title,
    filters: {
      // SearchTerm,
      // Location,
      // theminmax,
      // SubCategory,
      // CategorySearchTerm
      ...(SearchTerm && { SearchTerm }),
      ...(Location && { Location }),
      ...(Price && { Price }),
      ...(SubCategory && { SubCategory }),
      ...(Category && { Category }),
    }
  };

  // FavSystem
  const { Islogged } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const [userFavoritesSearch, setUserFavoritesSearch] = useState([]);
  
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
      axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
        console.log(res.data.data.user);
        setUserInfo(res.data.data.user);
        setUserFavoritesSearch(res.data.data.user.FavoriteSearch)
      });
    }
  }, []);

  const fetchUserFavoriteSearch = async () => {
    try {
      if (Islogged) {
        const userFavorites = userInfo.FavoriteSearch || [];
        setUserFavoritesSearch(userFavorites);
        dispatch(setFavoritesSearch(userFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserFavoriteSearch();
  }, [userInfo]);

  const isFavorite = (savedId) => userFavoritesSearch.some((saved) => saved.URL === savedId);

  const navigate = useNavigate();
  const AddFavoriteSearch = (SearchParams) => {
    if (Islogged) {
      const filteredFilters = Object.fromEntries(
        Object.entries(SearchParams.filters).filter(([, value]) => {
          return value !== null && value !== undefined;
        })
      );
      
      let filteredSearchParams = {
        ...SearchParams,
        filters: filteredFilters
      };
      console.log(filteredSearchParams);

      if(!isFavorite(filteredSearchParams.URL)){
        console.log(filteredSearchParams);  
        dispatch(addFavoriteSearch(filteredSearchParams));
        updateUserFavorites([...userFavoritesSearch, filteredSearchParams]);
        navigate("/myfavorites")
      }

      props.onHide();
    }
  };

  const updateUserFavorites = async (updatedSearchFavorites) => {
    try {
      if (Islogged) {
        let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
        const updatedUserData = { ...userInfo, FavoriteSearch: updatedSearchFavorites };
        console.log(updatedUserData);
        console.log(userInfo._id);
        axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData)
        setUserFavoritesSearch(updatedSearchFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //end ot fav System
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="container ">
        <div className="row text-center">
          <Modal.Header closeButton className="border-0 fs-5"></Modal.Header>
          <Modal.Body>
            <h6 className="mt-0 pt-0 mb-3">Saved Search</h6>
            {/* <input type="text" className="form-control my-3" value={title} /> */}
            <input
              type="text"
              className="form-control my-3"
              placeholder={defaultTitle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Row className="mx-0">
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {SearchTerm}
              </Badge>
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {Location}
              </Badge>
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {minPrice}
              </Badge>
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {maxPrice}
              </Badge>
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {SubCategory}
              </Badge>
              <Badge pill bg="secondary" className="fs-6 fw-normal py-2 me-2 mb-3" style={{ width: "auto" }}>
                {Category}
              </Badge>
            </Row>
            <button className="btn btn-red form-control" onClick={() => AddFavoriteSearch(searchParams)} >
              Save this Search
            </button>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}

function SaveSearch() {
  const [modalShow, setModalShow] = React.useState(false);
  const [userFavoritesSearch, setUserFavoritesSearch] = useState([]);
  const { Islogged } = useContext(AuthContext);

  const isFavorite = (savedId) => userFavoritesSearch.some((saved) => saved.URL === savedId);
  useEffect(() => {
    if (Islogged) {
      let userId = JSON.parse(localStorage.getItem('userInfo'))._id;
      axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
        console.log(res.data.data.user);
        setUserFavoritesSearch(res.data.data.user.FavoriteSearch)
      });
    }
  }, []);
  return (
    <>
      <div
        className="btn border-danger w-auto mb-2 saved-search"
        id="Save_search "
        onClick={() => setModalShow(true)}
      >
        {
        !isFavorite(location.href)?
        <BsSuitHeart className=" text-danger me-2" />:
        <BsSuitHeartFill className="text-danger me-2" />
        }
        Save search
      </div>
      
{Islogged?
<MyVerticallyCenteredModal2
  show={modalShow}
  onHide={() => setModalShow(false)}
/>:
<MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
}

    </>
  );
}
export default SaveSearch;
MyVerticallyCenteredModal2.propTypes = {
  onHide: PropTypes.func.isRequired,
};