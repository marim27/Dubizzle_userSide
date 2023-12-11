import { Container, Row } from "react-bootstrap";
import "./FavoritePage.css";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { useDispatch } from "react-redux";
import { addFavoriteSearch, removeFavoriteSearch, setFavoritesSearch } from "../../store/slices/FavoriteSearchSlice";
const SavedSearchPage = () => {
    let [favoritesSearch, setFavoritesSearch] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    
    // FavSystem
    const { Islogged } = useContext(AuthContext);
    useEffect(() => {
      if (Islogged) {
        let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
        axiosInstanceProducts.get(`/users/${userId}`).then((res) => {
          console.log(res.data.data.user);
          setUserInfo(res.data.data.user)
          setFavoritesSearch(res.data.data.user.FavoriteSearch)
          setFavoritesSearch(res.data.data.user.FavoriteSearch)
        });
      }
    }, []);
    const dispatch = useDispatch()
    const [userFavorites, setUserFavorites] = useState([]);
    const isFavorite = (savedId) => userFavorites.some((saved) => saved.URL === savedId);
  
    const fetchUserFavorites = async () => {
      try {
        if (Islogged) {
          const userFavorites = userInfo.FavoriteSearch || [];
          setUserFavorites(userFavorites);
          dispatch(setFavoritesSearch(userFavorites));
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchUserFavorites();
    }, [userInfo]);
  
    const toggleFavorite = (saveSearch) => {
      if (Islogged) {
        console.log(saveSearch);
        console.log(userFavorites);
        console.log(favoritesSearch);
        if (isFavorite(saveSearch.URL)) {
          // dispatch(removeFavoriteSearch(saveSearch._id));
          updateUserFavorites(
            userFavorites.filter((ad) => ad.URL !== saveSearch.URL)
          );
        } else {
          dispatch(addFavoriteSearch(saveSearch));
          updateUserFavorites([...userFavorites, saveSearch]);
        }
      }
    };
  
    const updateUserFavorites = async (updatedFavorites) => {
      try {
        if (Islogged) {
          let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
          const updatedUserData = { ...userInfo, FavoriteSearch: updatedFavorites };
          console.log(updatedUserData);
          console.log(userInfo._id);
          axiosInstanceProducts.patch(`/users/${userId}`, updatedUserData);
          setUserFavorites(updatedFavorites);
          setFavoritesSearch(updatedFavorites)
        }
      } catch (error) {
        console.log(error);
      }
    };
//     let favoritesSearch = [
//     {
//       URL: "http://localhost:5173/search?searchTerm=%D8%B4%D8%A7%D8%B4%D9%87&location=Qena",
//       title:"شاشه Qena",
//       filters:{
//           SearchTerm: "شاشه",
//           Location: "Qena"
//       }
//     },
//     {
//       URL: "http://localhost:5173/search?SubCategorySearchTerm=6518b089dcc07776174fd5c3&location=Alexandria",
//       title:"Bicycles Alexandria",
//       filters:{
//         SubCategory: "Bicycles",
//         location: "Alexandria"
//       }
//     }
//   ];

//   const navigate = useNavigate()
  const GoToSearchPage=(url)=>{
    location.replace(url);
  }
  return (
    <>
      <Container className="mt-5">
        <p className="text-secondary">Profile</p>
        <h5 className="fw-bold">Favourites & Saved searches</h5>
        <div className="d-flex mb-2">
          <Link to="/myfavorites" className="fw-bold fav">
            Favourites
          </Link>
          <Link to="/favoritesSearch" className="fw-bold text-red active-fav">
            Saved searches
          </Link>
        </div>
        <Row className="mt-3 mb-5">
        {favoritesSearch.map((savedSearch) => (
          <div className="card saved-search-card p-3 ms-2 mb-4" key={savedSearch.URL}>
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold" role="button" onClick={()=>{GoToSearchPage(savedSearch.URL)}}>{savedSearch.title}</h6>
              <RiDeleteBin5Line role="button" onClick={()=>{toggleFavorite(savedSearch)}}/>
            </div>
            <table>
            {Object.keys(savedSearch.filters).map((key) => (
                <tr key={key}>
                <td>{key}</td>
                <th>{savedSearch.filters[key]}</th>
              </tr>
            ))}
            </table>
          </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedSearchPage;
