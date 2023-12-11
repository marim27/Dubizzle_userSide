import HomeSlider from "./HomeSliderC/HomeSlider";
import PopularCategories from "./PopularCategoriesC/PopularCategories";
import HomeAds from "./HomeAdsC/HomeAds";
import AppD from "../../Components/Application/AppD";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/DubizzleDB";
import { LocationContext } from "../../Context/LocationContext";
import { AuthContext } from "../../Context/auth";
import { IDContext } from "../../Context/IDContext";
import "./HomePage.css";
import { FaAngleUp } from "react-icons/fa6";
const HomePage = () => {
  const { selectLocation , setSelectLocation } = useContext(LocationContext);
  const { user, setUser } = useContext(IDContext);
  // console.log('user', user)
  const addUser = (data) => {
    let user = { username: data.name, email: data.email };
    console.log(user);
    axiosInstance
      .get(`/users/email?email=${data.email}`)
      .then((res) => {
        // console.log(res);
        if (res.data) {
          data._id = res.data._id;
          localStorage.setItem("userInfo", JSON.stringify(data));
          setUser({_id:res.data._id,username:res.data.username,email:res.data.email});
        }else {
          axiosInstance.post(`/users`, user);
          axiosInstance.get(`/users/email?email=${data.email}`).then((res) => {
            if (res) {
              data._id = res.data._id;
              localStorage.setItem("userInfo", JSON.stringify(data));
              setUser({_id:res.data._id,username:res.data.username,email:res.data.email});
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      // window.location.reload();
  };
// console.log(user);
  // useEffect(() => {
  //   let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (userInfo) {
  //     userInfo._id = _id;
  //     localStorage.setItem("userInfo", JSON.stringify(userInfo));
  //   }
  // }, [_id]);
  const { Islogged, setIslogged } = useContext(AuthContext);
  useEffect(() => {
    setSelectLocation('Egypt');
    let params = {};
    let regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(location.href))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
      localStorage.setItem("authInfo", JSON.stringify(params));
      setIslogged(true);
    }
    window.history.pushState({}, document.title, "/");
    let info = JSON.parse(localStorage.getItem("authInfo"));
    // console.log(info);
    if (info) {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${info["access_token"]}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((userInfo) => {
          console.log("User Info:", userInfo);
          addUser(userInfo);
          // userInfo._id = _id;
          // localStorage.setItem("userInfo", JSON.stringify(userInfo));
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);
  useEffect(() => {
    const getUser= async() => {
      if(Islogged==true) {
    const Email=JSON.parse(localStorage.getItem(`userInfo`)).email
    // console.log(Email); 
    let ifUserDelete = await axiosInstance.get(`/users/email?email=${Email}`)
    console.log(ifUserDelete);
    console.log(ifUserDelete.data.message=='not user');
    if(ifUserDelete.data.message=='not user'){
      localStorage.removeItem("authInfo")
        localStorage.removeItem("userInfo")
        localStorage.removeItem("bayPackages")
        localStorage.removeItem("__paypal_storage__")
        localStorage.removeItem("token")
        localStorage.removeItem("favorites")
    }
  }
}
getUser()
}, []);
const [backToTopBtn,setBackToTopBtn]=useState(false)

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 1000) {
      setBackToTopBtn(true);
      // console.log('if', window.scrollY);
    } else if (window.scrollY < 1000) {
      setBackToTopBtn(false);
      // console.log('else', window.scrollY);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
// backToTop()
  return (
    <>
      <Helmet>
        <title>Dubizzle</title>
      </Helmet>
      <div className="container">
        <HomeSlider />
        {backToTopBtn&&
        <a href="#" id="a" className="d-flex justify-content-center text-decoration-none text-black" >
      <div className="col-md-3 col-4" >
        <div className="col-md-2 col-4 btn border-danger bg-white py-2 w-auto" id="back_to_top">
        <FaAngleUp className="olx-color me-2"/> Back to top
        </div>
      </div>
    </a>
        }
        <PopularCategories />
        
        <HomeAds />
      </div>
      <div className="container-fluid bg-light">
        <AppD />
      </div>
    </>
  );
};

export default HomePage;