import "./PopularCategories.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import axiosInstanceProducts from "../../../axiosConfig/DubizzleDB";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { categoriesAction } from "../../../store/slices/categories";
import { subcategoriesAction } from "../../../store/slices/subCategories";
import axiosInstanceProducts from './../../../axiosConfig/DubizzleDB';
import PageLoaderes from "../../../Components/PageLoaderes/PageLoaderes";
import { LanguageContext } from "../../../Context/Language";
const PopularCategories = () => {
  // const sub = useLoaderData();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.loader)
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.subcategories.subcategories);

  const { Language, setLanguage } = useContext(LanguageContext);

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
  return (
    <div>
      <section>
        <div className="row">
          <div className="col-12 fs-4 fw-bold my-3">Popular Categories</div>
          {/* <div
            // key={category._id}
            className="col-6 col-md-6 col-lg-3 d-flex flex-column"
          > */}
          {loader ? (
            <PageLoaderes />
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="col-6 col-md-6 col-lg-3 d-flex flex-column"
              >
                <div className="fw-bold fs-6 mb-2">
                  <img
                    src={`${axiosInstanceProducts.defaults.baseURL}/${category.image}`}
                    alt=""
                    className="mx-1"
                    width={16}
                  />
                  {Language === "English" ? category.arname : category.name}
                </div>
                {loader ? (
                  <PageLoaderes />
                ) : (
                  subcategories
                    .filter((sub) => sub.CategoryID === category._id)
                    .slice(0, 2)
                    .map((subcategory) => (
                      <>
                        <Link
                          key={subcategory._id}
                          to={`/search?searchTerm=${subcategory._id}`}
                          className="mb-2 text-decoration-none text-black ancor"
                          onClick={() =>
                            handleSubcategoryClick(
                              subcategory._id,
                              subcategory.title
                            )
                          }
                        >
                          {Language === "English"
                            ? subcategory.artitle
                            : subcategory.title}
                        </Link>
                      </>
                    ))
                )}
                <Link
                  to={`/search?CategorySearchTerm=${category._id}`}
                  className="d-flex fw-bold fs-6 olx-color mb-3 angle_a text-decoration-none"
                >
                  <div>
                  <a key={category._id}> {Language === "English" ? `كل ما فى ${category.arname}` : `All in ${category.name}`} </a>
                  </div>
                  <div className="angle_div ms-1">
                    {Language === "English" ? <FaAngleLeft /> : <FaAngleRight />}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularCategories;