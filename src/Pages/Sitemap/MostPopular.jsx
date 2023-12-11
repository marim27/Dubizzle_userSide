import { Link } from "react-router-dom";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import { useEffect, useState } from "react";
// import { Location } from '@angular/common';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoriesAction } from "../../store/slices/categories";
import { subcategoriesAction } from "../../store/slices/subCategories";
import PageLoaderes from "../../Components/PageLoaderes/PageLoaderes";

const MostPopular = () => {


    const dispatch = useDispatch();
    const loader = useSelector((state) => state.loader.loader)
    const navigate = useNavigate();

    const categories = useSelector((state) => state.categories.categories);

    // console.log(Language );
    useEffect(() => {
        dispatch(categoriesAction());
        dispatch(subcategoriesAction());
    }, []);

    // console.log(categories);
    // console.log(subcategories); // 24
    const handleSubcategoryClick = async (subcategoryId, subcategoryTitle) => {
        try {
            const response = await axiosInstanceProducts.get(`/products/search?subCategoryID=${subcategoryId}`);
            const data = await response.data;
            navigate(`/search?SubCategorySearchTerm=${subcategoryId}`, { state: { results: data } });
            console.log(subcategoryTitle);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };


    let [locations, setLocations] = useState([]);
    useEffect(() => {
        axiosInstanceProducts
            .get("/location")
            .then((res) => {
                setLocations(res.data.data.data);
                // console.log(res.data.data.data);
                // console.log(locations);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(locations);
    return (
        <div className="p-2">
            <div>
                <h4 className="text-center">Categories</h4>
                <div className="text-center my-4 text_small">Browse through some of our most popular categories.</div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center col-6 ms-5 ps-5 my-4">
                        <Link to={`/search?CategorySearchTerm=6508d313ca916f00eef8462b&location=Egypt`} className="col-3 text-decoration-none text-dark">
                            <div className="col-3 box rounded ms-5">
                                <div className="box-50">
                                    <img src="../../../svg/property-for-rent.svg" height={'25px'} className="w-100 mt-2" alt="property" />
                                </div>
                            </div>
                            <div className="text-center text_small fw-bold text-secondary">Properties</div>
                        </Link>
                        <Link to={`/search?CategorySearchTerm=6508d287ca916f00eef84626&location=Egypt`} className="col-3 text-decoration-none text-dark">
                            <div className="col-3 box rounded ms-5">
                                <div className="box-50">
                                    <img src="../../../svg/vehicles.svg" height={'25px'} className="w-100 mt-2" alt="vehicles" />
                                </div>
                            </div>
                            <div className="text-center text_small fw-bold text-secondary">Vehicles</div>
                        </Link>
                        <Link to={`/search?CategorySearchTerm=64d3d823e324108e7f9be88d&location=Egypt`} className="col-3 text-decoration-none text-dark">
                            <div className="col-3 box rounded ms-5">
                                <div className="box-50">
                                    <img src="../../../svg/electronics.svg" height={'20px'} className="w-75 ms-1 mt-2" alt="electronics" />
                                </div>
                            </div>
                            <div className="text-center text_small fw-bold text-secondary">Electronics & Home Appliances</div>
                        </Link>
                        <Link to={`/search?CategorySearchTerm=650c6df9ded05436c6ee9c57&location=Egypt`} className="col-3 text-decoration-none text-dark">
                            <div className="col-3 box rounded ms-5">
                                <div className="box-50">
                                    <img src="../../../svg/furniture.svg" height={'25px'} className="w-100 mt-2" alt="furniture" />
                                </div>
                            </div>
                            <div className="text-center text_small fw-bold text-secondary">Home Furniture - Decor</div>
                        </Link>
                        <Link to={`/search?CategorySearchTerm=64d3d823e324108e7f9be88f&location=Egypt`} className="col-3 text-decoration-none text-dark">
                            <div className="col-3 box rounded ms-5">
                                <div className="box-50">
                                    <img src="../../../svg/fashion.svg" height={'25px'} className="w-100 mt-2" alt="fashion" />
                                </div>
                            </div>
                            <div className="text-center text_small fw-bold text-secondary">Fashion & Beauty</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <h4 className="text-center mt-4">Locations</h4>
                <div className="text-center my-4 text_small">Browse through some of our most popular locations.</div>
                <div className="d-flex justify-content-center">
                    <div className="row">
                        {loader ? (
                            <PageLoaderes />
                        ) : (
                            locations.map((location) => (
                                <div
                                    key={location._id}
                                    className="col-6 col-md-6 col-lg-3 d-flex flex-column">
                                    <div className=" mb-2">
                                      <a href={`/search?location=${location.title}`} className="text-decoration-none text-dark">
                                        {location.title}</a>  
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    </div>
            </div>



        </div>

    );
}


export default MostPopular;
