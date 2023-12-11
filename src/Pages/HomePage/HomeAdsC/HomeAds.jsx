import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
// import { PiCompassBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAds } from '../../../store/slices/subads';
import axiosInstanceProducts from './../../../axiosConfig/DubizzleDB';
// import PageLoaderes from '../../../Components/PageLoaderes/PageLoaderes';
import { addFavorite, removeFavorite, setFavorites } from '../../../store/slices/FavoriteSlice';
import './HomeAds.css'
import { AuthContext } from '../../../Context/auth';
import { LanguageContext } from '../../../Context/Language';
import FavLogin from '../../../Components/Login/FavLogin';
import Favorite from '../../../Components/Favorite/Favorite';
import { IDContext } from '../../../Context/IDContext';




const HomeAds = () => {

    const { Language, setLanguage } = useContext(LanguageContext);
    const {user} = useContext(IDContext)
    const subcategories = useSelector(
        (state) => state.subcategories.subcategories
    );
    // // test
    //     const getUser = JSON.parse(localStorage.getItem("userInfo"))
    // useEffect(() => {
    //    console.log(getUser._id);
    //    axiosInstanceProducts.get('/products').then((products) => {console.log(products.data);})

    // }, []);
    /////////

    const { Islogged } = useContext(AuthContext);
    const cars = useSelector((state) => state.ads.ads);
    // const loader = useSelector((state) => state.loader.loader)
    // console.log(loader);
    // console.log(cars);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAds())
    }, []);

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
    return (
        <div className="mb-5">
            {/* Cars for Sale */}
            {cars.map((allAds) => (
                <div key={allAds._id}>
                    <div className="col-12 row my-3">
                        <div className="col-6 col-md-8 col-lg-10 fs-5 fw-bold">
                            {Language == "English" ? allAds.ARsubCategoryName : allAds.subCategoryName}
                        </div>
                        <Link
                            to={`/search?SubCategorySearchTerm=${allAds.subcategoryID}`}
                            className="col-6 col-md-4 col-lg-2 olx-color fw-bold text-decoration-none ps-5"
                        >
                            {Language == "English" ? "عرض المزيد" : "view more"} {Language === "English" ? <FaAngleLeft /> : <FaAngleRight />}
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between row">
                        {allAds.products.map((productAds) => (
                            <div
                                key={productAds._id}
                                className="text-decoration-none card m-0 p-0 mb-3 responsiveCard"
                            >
                                <Link to={`/singlePage/${productAds._id}`}>
                                    <img
                                        className="card-img w-100 card-img"
                                        style={{ height: "12rem" }}
                                        src={`${axiosInstanceProducts.defaults.baseURL}/${productAds.images[0]}`}
                                    />
                                    {productAds.featured == true &&
                                        productAds.bombed == true ? (
                                        <>
                                            <div className="badge col-4 col-md-3 m-3 card-img-overlay imaBadge">
                                                Featured
                                            </div>
                                            <div className="badge col-4 col-md-3 ms-3 my-5 card-img-overlay imaBadge2">
                                                Pump up
                                            </div>{" "}
                                        </>
                                    ) : productAds.featured == true ? (
                                        <div className="badge col-3 m-3 card-img-overlay imaBadge">
                                            Featured
                                        </div>
                                    ) : productAds.bombed == true ? (
                                        <div className="badge col-3 ms-3 my-3 card-img-overlay imaBadge2">
                                            Pump up
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </Link>
                                <div className="card-body">
                                    <div className="d-flex  justify-content-between">
                                        <div className="olx-color card-title">
                                            {productAds.price} {productAds.currency}
                                        </div>
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
                                        {productAds.sellerid != user._id &&
                                            <Favorite id={productAds._id}/>
                                        }
                                    </div>
                                    <Link
                                        to={`/singlePage/${productAds._id}`}
                                        className="link-of-product-title"
                                    >
                                        <div
                                            style={{ maxHeight: "1.5rem", overflow: "hidden" }}
                                            className="card-text"
                                        >
                                            {productAds.title}
                                        </div>
                                    </Link>
                                    <div className="opacity-75">{productAds.locationid}</div>
                                    <div className="opacity-75">{productAds.createdAt}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomeAds;
