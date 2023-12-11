import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/slices/FavoriteSlice";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import FavLogin from "../Login/FavLogin";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";

export default function Favorite(args) {
  // FavSystem
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
  const isFavorite = () => userFavorites.includes(args.id);
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
  const toggleFavorite = () => {
    if (Islogged) {
      if (isFavorite(args.id)) {
        dispatch(removeFavorite(args.id));
        // updateUserFavorites(userFavorites.filter((ad) => ad._id !== productAds._id));
        updateUserFavorites(userFavorites.filter((id) => id !== args.id));
      } else {
        // dispatch(addFavorite(productAds));
        dispatch(addFavorite(args.id));
        updateUserFavorites([...userFavorites, args.id]);
      }
    }
  };

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
    <>
     {Islogged ? (
        <div onClick={() => toggleFavorite()}>
          {isFavorite() ? (
            <BsSuitHeartFill className="fs-5 heart-icon" role="button" />
          ) : (
            <BsSuitHeart className="fs-5" role="button" />
          )}
        </div>
      ) : (
        <FavLogin />
      )}
    </>
  );
}
