import { BsChat, BsSuitHeart } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BiBook } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineCreditCard } from "react-icons/ai";
import { GiNothingToSay } from "react-icons/gi";
import { FiHelpCircle } from "react-icons/fi";
import "./UserMenu.css";
import { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import { IDContext } from "../../Context/IDContext";
import { LanguageContext } from "../../Context/Language";

export default function UserMenu() {
  let [token, setToken] = useState({});
  let [dropMenu, setDropMenu] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate()
  const { Language } = useContext(LanguageContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleToggle = () => {
    setDropMenu(!dropMenu);
  };

  const { user } = useContext(IDContext);
  const { Islogged, setIslogged } = useContext(AuthContext);
  useEffect(() => {
    setToken(localStorage.getItem("authInfo"));
    // let userInfo =JSON.parse(localStorage.getItem("userInfo"));
    // if(userInfo){
    //   setUser({"username":userInfo.name,"email":userInfo.email})
    // }
  }, [])

  useEffect(
    function () {
      if (token) {
        setIsLoggedIn(true);
      }
    },
    [token]
  );

  const logout = () => {
    localStorage.removeItem("authInfo")
    localStorage.removeItem("userInfo")
    localStorage.removeItem("bayPackages")
    localStorage.removeItem("__paypal_storage__")
    localStorage.removeItem("token")
    setDropMenu(false)
    setIslogged(false);
    navigate("/")
  }

  const goToChat = () => {
    navigate("/chat")
  }

  // console.log(user);
  return (
    <>
      <BsChat className="fs-5  mx-3" onClick={goToChat} role="button" />
      <IoMdNotificationsOutline className="fs-4 mx-1" />
      <span className="pic-profile ms-3">{user.username[0]}</span>
      <span>
        {!dropMenu ? (
          <MdKeyboardArrowDown
            role="button"
            className="ms-1 me-2"
            onClick={handleToggle}
          />
        ) : (
          <MdKeyboardArrowUp role="button"
            className="ms-1 me-2"
            onClick={handleToggle}
          />
        )}
      </span>
      {(dropMenu && Language === 'العربية') && (
        <div className="col-2 dropUser user-menu-container">
          <div className="row py-2">
            <div className="col-4 d-flex justify-content-end">
              <div className="user-avatar d-flex justify-content-center align-items-center">
                <p className="fs-3">{user.username[0]}</p>
              </div>
            </div>
            <div className="col-8">
              <div className="user-info">
                <p className="m-0">Hello,</p>
                <small><p className="m-0 fw-bold fs-6">{user.username}</p></small>
                <NavLink
                  className="m-0 text-dark"
                  role="button"
                  to="/editProfile"
                  onClick={handleToggle}
                >
                  <small>View and edit your profile</small>
                </NavLink>
              </div>
            </div>
          </div>
          <div
            role="button" onClick={handleToggle}
            className="fav-men3 mb-2 user-menu wallet-class"
          >
            <div className="d-flex px-3">
              <img
                src="../../../assets/wallet.svg"
                className="me-2"
                alt=""
              />
              <div>
                <p className="m-0"><small>Dubizzle Wallet</small></p>
                <p className="m-0"><small>balance: 0 EGP</small></p>
              </div>
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/myads`} className="text-decoration-none text-dark" >
              <BiBook className="me-2" />
              <small>My ads</small>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link className="link-of-favorite" to={`/myfavorites`}>
              <BsSuitHeart className="me-2" />
              <small>Favorites & Saved searches</small>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <GrDeliver className="me-2" />
              <small>Delivery orders</small>
            </div>
          </div>
          <div onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/choosePackage`} className="text-decoration-none text-dark" >
              <div>
                <BiFoodMenu className="me-2" />
                <small>Buy business packages</small>
              </div>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/boughtpackages`} className="text-decoration-none text-dark" >
              <div>
                <AiOutlineCreditCard className="me-2" />
                <small>Bought Packages & Billing</small>
              </div>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <GiNothingToSay className="me-2" />
              <small>Blog</small>
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <FiHelpCircle className="me-2" />
              <small>Help</small>
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-2 px-3 user-menu">
            <Link className="link-of-favorite" to={`/setting`}>
              <GiSettingsKnobs className="me-2 rotate-90" />
              <small>Settings</small>
            </Link>
          </div>
          <div role="button" className="fav-menu mb-3 px-3 user-menu" onClick={logout}>
            <div>
              <RiLogoutBoxLine className="me-2" />
              <small>Logout</small>
            </div>
          </div>
        </div>
      )}
      {(dropMenu && Language !== 'العربية') && (
        <div className="col-2 dropUser2 user-menu-container">
          <div className="row  py-2">
            <div className="col-4 d-flex justify-content-end">
              <div className="user-avatar d-flex justify-content-center align-items-center">
                <p className="fs-2">{user.username[0]}</p>
              </div>
            </div>
            <div className="col-8">
              <div className="user-info">
                <p className="m-0 fs-5">اهلا</p>
                <p className="m-0">{user.username}</p>
                <NavLink
                  className="m-0 text-dark"
                  role="button"
                  to="/editProfile"
                  onClick={handleToggle}
                >
                  كل ما في تلفزيونات وصوتيات
                </NavLink>
              </div>
            </div>
          </div>
          <div
            role="button" onClick={handleToggle}
            className="fav-men3 mb-2 user-menu wallet-class"
          >
            <div className="d-flex px-3">
              <img
                src="../../../assets/wallet.svg"
                className="ms-2 fs-4"
                alt=""
              />
              <div>
                <p className="m-0">محفظه دوبيزيل</p>
                <p className="m-0">الرصيد 0 ج.م</p>
              </div>
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/myads`} className="text-decoration-none text-dark" >
              <BiBook className="ms-2 fs-4" /> اعلاناتي
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link className="link-of-favorite" to={`/myfavorites`}>
              <BsSuitHeart className="ms-2 fs-4" /> الأعلانات المفضله و عمليات البحث المحفوظه
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <GrDeliver className="ms-2 fs-4" />  طلبات التوصيل
            </div>
          </div>
          <div onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/choosePackage`} className="text-decoration-none text-dark" >
              <div>
                <BiFoodMenu className="ms-2 fs-4" /> شراء باقات خاصه
              </div>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link to={`/boughtpackages`} className="text-decoration-none text-dark" >
              <div>
                <AiOutlineCreditCard className="ms-2 fs-4" />
                الباقات و الفواتير المشتراه
              </div>
            </Link>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <GiNothingToSay className="ms-2 fs-4" />
              مدونه
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <div>
              <FiHelpCircle className="ms-2 fs-4" />
              المساعده
            </div>
          </div>
          <div role="button" onClick={handleToggle} className="fav-menu mb-3 px-3 user-menu">
            <Link className="link-of-favorite" to={`/setting`}>
              <GiSettingsKnobs className="ms-2 fs-4 rotate-90" />
              الأعدادات
            </Link>
          </div>
          <div role="button" className="fav-menu mb-3 px-3 user-menu" onClick={logout}>
            <div>
              <RiLogoutBoxLine className="ms-2 fs-4" />
              تسجيل الخروج
            </div>
          </div>
        </div>
      )}
    </>
  );
}
