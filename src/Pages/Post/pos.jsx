import "./Post.css";
import { MdClose } from "react-icons/md";
import Container from "react-bootstrap/Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import NavLayOut from "../../Components/nav/nav";

export default function Post() {
    // to get id of subcategory form url
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subCategoryID = searchParams.get("subCategpory");
    const [locationList, setlocationList] = useState([]);
    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    // const [selectedLocation, setSelectedLocation] = useState("");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        currency: "EGP",
        images: [],
        condition: "",
        locationid: "",
        sellerid: user._id,
        Categoryid: "",
        subCategoryID: "",
        Brand: "",
        Deliverable: false,
        PriceType: "Price",
        phoneNumber: "",
        Chat: "",
        colorid: "",
        PaymentOption: "",
        Transmission: false,
        Video: false,
    });

    const [errors, setErrors] = useState({
        titleError: "",
        descriptionError: "",
        priceError: "",
        currencyError: "",
        imagesError: "",
        conditionError: "",
        locationidError: "",
        selleridError: "",
        BrandError: "",
        priceTypeError: "",
        phoneNumberError: "",
        ChatError: "Please Choose One Only ... !",
        // categoryidError: "",
        // subCategoryIDError: "",
        // PaymentOptionError: "",
        // deliverableError: "",
    });

    //color
    const [color, setColor] = useState([]);

    // console.log(color);

    useEffect(() => {
        // get location
        axiosInstanceProducts
            .get("/location")
            .then((res) => {
                setlocationList(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        // set category from subcategory
        axiosInstanceProducts
            .get(`/subcategories/${subCategoryID}`)
            .then((res) => {
                setcategory(res.data.data.subCategory.CategoryID);
                setsubCategory(res.data.data.subCategory);
                //set category && subcategory && seller ids to the data object of the product
                setProduct({
                    ...product,
                    Categoryid: res.data.data.subCategory.CategoryID._id,
                    subCategoryID: res.data.data.subCategory._id,
                    // sellerid: user._id,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // color
        axiosInstanceProducts
            .get("/color")
            .then((response) => {
                setColor(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(user._id);
    }, []);


    function validation(event) {
        //title
        if (event.target.name === "title") {
            setProduct({ ...product, title: event.target.value });
            setErrors({
                ...errors,
                titleError:
                    event.target.value.length === 0
                        ? "Title is Required"
                        : /^[A-Za-z0-9\u0600-\u06FF][A-Za-z0-9\s\u0600-\u06FF!@#$%^&*()_+{}:;"'<>,.?/|\\-]{4,}$/.test(
                            event.target.value
                        )
                            ? ""
                            : "Invalid Title Should Be At Least 5 Characters",
            });
        }
        //Brand
        if (event.target.name === "Brand") {
            setProduct({ ...product, Brand: event.target.value });
            setErrors({
                ...errors,
                BrandError:
                    event.target.value.length === 0
                        ? "Brand is Required"
                        : /^[A-Za-z0-9\u0600-\u06FF][A-Za-z0-9\s\u0600-\u06FF]{2,}$/.test(
                            event.target.value
                        )
                            ? ""
                            : "Invalid Brand Should Be At Least 3 Characters",
            });
        }
        //description
        if (event.target.name === "description") {
            setProduct({ ...product, description: event.target.value });
            setErrors({
                ...errors,
                descriptionError:
                    event.target.value.length === 0 ? "Description is Required" : "",
            });
        }

        //price
        if (event.target.name === "price") {
            setProduct({ ...product, price: event.target.value });
            setErrors({
                ...errors,
                priceError:
                    event.target.value.length === 0
                        ? "Pice is Required"
                        : /^[1-9]\d*$/.test(event.target.value)
                            ? ""
                            : "Invalid Price Should Be Greater Than Zero ",
            });
        }
        //phone Number
        if (event.target.name === "phoneNumber") {
            setProduct({ ...product, phoneNumber: event.target.value });
            setErrors({
                ...errors,
                phoneNumberError:
                    event.target.value.length === 0
                        ? "Mobile Phone Number is Required"
                        : /^0$/.test(event.target.value)
                            ? "Mobile Phone Number Can`t start with 0 "
                            : /^(10|11|12|15)\d{8}$/.test(event.target.value)
                                ? ""
                                : "Should Be At Least 10 Numbers",
            });
        }

        //location
        if (event.target.name === "locationid") {
            setProduct({ ...product, locationid: event.target.value });
            setErrors({
                ...errors,
                locationidError:
                    event.target.value.length === 0 ? "Location is Required" : "",
            });
        }

        //sellerid
        if (event.target.name === "sellerid") {
            setProduct({ ...product, sellerid: event.target.value });
            setErrors({
                ...errors,
                selleridError:
                    event.target.value.length === 0
                        ? "Name is Required"
                        : /^[A-Za-z0-9\u0600-\u06FF][A-Za-z0-9\s\u0600-\u06FF]{4,}$/.test(
                            event.target.value
                        )
                            ? ""
                            : "Invalid Name Should Be At Least 5 Characters",
            });
        }

        //images
        if (event.target.name === "images") {
            setErrors({
                ...errors,
                imagesError:
                    event.target.value.length === 0 ? "Images is Required" : "",
            });
        }

        //priceType
        if (event.target.name === "PriceType") {
            setProduct({ ...product, PriceType: event.target.value });
            // setErrors({
            //   ...errors,
            //   priceTypeError:
            //     event.target.value.length === 0 ? "Location is Required" : "",
            // });
        }
        if (event.target.name === "PaymentOption") {
            setProduct({ ...product, PaymentOption: event.target.value });
        }

        //color
        if (event.target.name === "colorid") {
            setProduct({ ...product, colorid: event.target.value });
        }
    }

    // marim
    const [imgArr, setImgArr] = useState([]);

    function uploadFile(files, formData) {
        [...files].forEach((file) => formData.append("images", file));
    }

    function saveImageArr(eve) {
        setImgArr((i) => [...i, ...Array.from(eve.target.files)]);
        // console.log(eve.target.files);
    }

    const removeImage = (index) => {
        setImgArr((prevImgArr) => {
            const updatedImgArr = [...prevImgArr];
            updatedImgArr.splice(index, 1);
            return updatedImgArr;
        });
        // console.log(imgArr);
    };

    function handleSubmit(event) {

        setImgArr((i) => [...i, ...Array.from(event.target.images.files)]);

        // Check if there are any errors in the errors state
        const hasErrors = Object.values(errors).some((error) => error !== "");
        // Check if there are any Fild is Empty
        const isEmpty = Object.values(product).some((product) => product === "");

        if (hasErrors || isEmpty) {
            // Prevent form submission if there are errors or any input empty

            event.preventDefault();
        } else {
            // console.log(product);

            const formData = new FormData();

            // Append the product data
            formData.append("title", product.title);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("locationid", product.locationid);
            formData.append("sellerid", product.sellerid);
            formData.append("Categoryid", product.Categoryid);
            formData.append("subCategoryID", product.subCategoryID);
            formData.append("Brand", product.Brand);
            formData.append("phoneNumber", `0${product.phoneNumber}`);
            formData.append("Chat", product.Chat);
            formData.append("condition", product.condition);
            formData.append("currency", product.currency);
            formData.append("PriceType", product.PriceType);
            formData.append("PaymentOption", product.PaymentOption);
            formData.append("colorid", product.colorid);
            formData.append("Deliverable", product.Deliverable);
            formData.append("Transmission", product.Transmission);
            formData.append("Video", product.Video);
            uploadFile(imgArr, formData);

            // console.log([...formData.entries()]);
            console.log(formData);

            axiosInstanceProducts
                .post("/products", formData)
                .then((res) => {
                    console.log("Post request successful", res.data);
                    navigate("/myads");
                })
                .catch((err) => {
                    console.error("Error during POST request:", err);
                });
        }
        event.preventDefault();
    }

    // Contact Method
    const [isActive, setIsActive] = useState(false);

    const radioActive = (value) => {
        setIsActive(value);
    };

    useEffect(() => {
        if (isActive == "Dubizzle Chat" || isActive == "Both") {
            setProduct({ ...product, Chat: true });
            setErrors({ ...errors, ChatError: "" });
        } else if (isActive == "Phone Number") {
            setProduct({ ...product, Chat: false });
            setErrors({ ...errors, ChatError: "" });
        } else if (isActive == "") {
            setErrors({ ...errors, ChatError: "Please Choose One Only ... ! " });
        }
    }, [isActive]);

    // Condition
    const [isCondition, setIsCondition] = useState("");

    const conditionActive = (value) => {
        setIsCondition(value);
    };

    useEffect(() => {
        if (isCondition == "New") {
            setProduct({ ...product, condition: "New" });
            setErrors({ ...errors, conditionError: "" });
        } else if (isCondition == "Used") {
            setProduct({ ...product, condition: "Used" });
            setErrors({ ...errors, conditionError: "" });
        } else if (isCondition == "") {
            setErrors({
                ...errors,
                conditionError: "Please Select a Condition ... ! ",
            });
        }
    }, [isCondition]);

    console.log(product);
    console.log(errors);

    return (
        <>
            <Helmet>
                <title>Dubizzle - Buy and Sell anywhere</title>
            </Helmet>
            <Container fluid className="p-0">
                <NavLayOut />
                <Container>
                    <h5 className="text-center my-3 font">POST YOUR AD</h5>
                    <form
                        className=""
                        encType="multipart/form-data"
                        method="post"
                        onSubmit={(event) => {
                            handleSubmit(event);
                        }}
                    >
                        <div className="card p-2 mb-4">
                            <div className="row p-2 border-bottom">
                                <h6 className="fs-5 mb-3 mt-2 font">SELECT CATEGORY</h6>
                                <span className="fs-sm">
                                    <span id="path">
                                        {category.name} / {subCategory.title}
                                    </span>
                                    <NavLink to="/attributes" className="text-black font ps-3">
                                        Change
                                    </NavLink>
                                </span>
                            </div>
                            <div className="row p-4 border-bottom">
                                <h5 className="font">INCLUDE SOME DETAILS</h5>
                                {/* title */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="adTitle"
                                        className={`form-label ${errors.titleError ? "text-danger" : ""
                                            }`}
                                    >
                                        Ad Title
                                    </label>
                                    <input
                                        type="text"
                                        id="adTitle"
                                        className={`form-control shadow-none border-3 py-2 ${errors.titleError
                                                ? "is-invalid"
                                                : !errors.titleError && product.title != ""
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        name="title"
                                        value={product.title}
                                        placeholder="Include condition, features and reason for selling"
                                        onChange={(e) => validation(e)}
                                        onBlur={(e) => validation(e)}
                                    />
                                    <span className="invalid-feedback text-start">
                                        {errors.titleError}
                                    </span>
                                </div>

                                {/* Brand */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="Brand"
                                        className={`form-label ${errors.BrandError ? "text-danger" : ""
                                            }`}
                                    >
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        id="Brand"
                                        className={`form-control shadow-none border-3 py-2 ${errors.BrandError
                                                ? "is-invalid"
                                                : !errors.BrandError && product.Brand != ""
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        name="Brand"
                                        value={product.Brand}
                                        placeholder="Mention the key features of your item (e.g. Brand, model, age, type)"
                                        onChange={(e) => validation(e)}
                                        onBlur={(e) => validation(e)}
                                    />
                                    <span className="invalid-feedback text-start">
                                        {errors.BrandError}
                                    </span>
                                </div>

                                {/* Color */}
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="color" className="form-label">
                                            Color
                                        </label>
                                        <Form.Select
                                            id="color"
                                            name="colorid"
                                            value={product.colorid}
                                            onChange={(e) => validation(e)}
                                        // onBlur={(e) => validation(e)}
                                        >
                                            <option value="" selected disabled>
                                                Select Color
                                            </option>
                                            {color.map((x) => (
                                                <option key={x._id} value={x._id}>
                                                    {x.colorName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </div>

                                {/* Condition */}
                                <div className="row px-4 ">
                                    <label
                                        htmlFor="Brand"
                                        className={`form-label ${errors.conditionError ? "text-danger" : ""
                                            }`}
                                    >
                                        Condition
                                    </label>
                                    <div
                                        className={
                                            (errors.conditionError
                                                ? "custom-red-border radio-btn mx-2"
                                                : "") +
                                            (isCondition === "New"
                                                ? " radio-btn radio-btn-active mx-2 p-3"
                                                : "radio-btn mx-2 p-3")
                                        }
                                        onClick={() => conditionActive("New")}
                                    >
                                        <div className="outer">
                                            <div className="inner"></div>
                                        </div>
                                        <p>New</p>
                                    </div>
                                    <div
                                        className={
                                            (errors.conditionError
                                                ? "custom-red-border radio-btn mx-2"
                                                : "") +
                                            (isCondition === "Used"
                                                ? " radio-btn radio-btn-active mx-2 p-3"
                                                : "radio-btn mx-2 p-3")
                                        }
                                        onClick={() => conditionActive("Used")}
                                    >
                                        <div className="outer">
                                            <div className="inner"></div>
                                        </div>
                                        <p>Used</p>
                                    </div>

                                    <p className="mt-2 text-red">
                                        <span>{errors.conditionError}</span>
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className={`form-label ${errors.descriptionError ? "text-danger" : ""
                                            }`}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        style={{ height: "180px" }}
                                        className={`form-control shadow-none border-3 py-3 ${errors.descriptionError
                                                ? "is-invalid"
                                                : !errors.descriptionError && product.description != ""
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        placeholder="Include condition, features, and reason for selling"
                                        value={product.description}
                                        onChange={(e) => validation(e)}
                                        onBlur={(e) => validation(e)}
                                    />
                                    <span className="invalid-feedback text-start">
                                        {errors.descriptionError}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="row p-4 border-bottom">
                                <label
                                    className={`form-label ${errors.priceError ? "text-danger" : ""
                                        }`}
                                >
                                    Price
                                </label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="price-addon">EGP</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        id="price"
                                        name="price"
                                        className={`form-control rounded-3 shadow-none border-3 py-2 ${errors.priceError
                                                ? "is-invalid"
                                                : !errors.priceError && product.price !== ""
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        placeholder="Include condition, features, and reason for selling"
                                        value={product.price}
                                        onChange={(e) => validation(e)}
                                        onBlur={(e) => validation(e)}
                                        aria-describedby="price-addon"
                                    />
                                    <span className="invalid-feedback text-start">
                                        {errors.priceError}
                                    </span>
                                </InputGroup>
                                {/*  Price type */}
                                {/* <Form.Check
                    type="checkbox"
                    id="xxx"
                    label="Negotiable"
                    className=" shadow-none border-0 py-3"
                  /> */}
                                <div className="d-flex">
                                    <div className="d-flex flex-column col-4">
                                        <div className="mb-3 fw-bold">Price Type</div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="Negotiable"
                                                name="PriceType"
                                                type="radio"
                                                value="Negotiable"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="Negotiable" className="">
                                                Negotiable
                                            </label>
                                        </div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="Exchange"
                                                name="PriceType"
                                                type="radio"
                                                value="Exchange"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="Exchange" className="">
                                                Exchange
                                            </label>
                                        </div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="Free"
                                                name="PriceType"
                                                type="radio"
                                                value="Free"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="Free" className="">
                                                Free
                                            </label>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="mb-3 fw-bold">Payment Option</div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="Cash"
                                                name="PaymentOption"
                                                type="radio"
                                                value="Cash"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="Cash" className="">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="Visa"
                                                name="PaymentOption"
                                                type="radio"
                                                value="Visa"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="Visa" className="">
                                                Visa
                                            </label>
                                        </div>
                                        <div className="m-2 d-flex align-items-end">
                                            <input
                                                className=""
                                                id="PaymentFree"
                                                name="PaymentOption"
                                                type="radio"
                                                value="Free"
                                                onChange={(e) => validation(e)}
                                            />
                                            <label htmlFor="PaymentFree" className="">
                                                Free
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Images */}
                            <div className=" border-bottom">
                                <div className="p-4">
                                    <h5 className="font">UPLOAD UP TO 16 PHOTOS</h5>
                                    <div className="p-3">
                                        <>
                                            <div className="">
                                                <div className="d-flex m-1 flex-row  container">
                                                    <div className="row col-12">
                                                        {imgArr.map((image, index) => (
                                                            <div key={index} className="image m-1">
                                                                <div
                                                                    onClick={() => removeImage(index)}
                                                                    style={{ position: "absolute" }}
                                                                >
                                                                    <span>
                                                                        <MdClose className="fs-4 font xIcone" />
                                                                    </span>
                                                                </div>
                                                                <img
                                                                    className="image"
                                                                    src={URL.createObjectURL(image)}
                                                                    alt="Selected"
                                                                />
                                                            </div>
                                                        ))}
                                                        {imgArr.length < 16 && (
                                                            <div className="img">
                                                                <label htmlFor="images" role="button">
                                                                    {/* <div className=""> */}
                                                                    <div className="imageDiv image">
                                                                        <img
                                                                            src="./assets/iconAddPhoto.svg"
                                                                            className=""
                                                                            width="35px"
                                                                        />
                                                                    </div>
                                                                    {/* </div> */}
                                                                    <input
                                                                        onChange={(e) => saveImageArr(e)}
                                                                        type="file"
                                                                        name="images"
                                                                        multiple
                                                                        id="images"
                                                                        className="inputs imgs photo"
                                                                        // onChange={(e) => saveImageArr(e)}
                                                                        accept="image/*"
                                                                    />
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                    <p className="fs-l mt-2">
                                        For the cover picture we recommend using the landscape mode.
                                    </p>
                                </div>
                            </div>
                            {/* Location */}
                            <div className="row p-4 border-bottom">
                                <h5 className="font">{"YOUR AD'S LOCATION"}</h5>
                                <div className="mb-3">
                                    <label
                                        htmlFor="location"
                                        className={`form-label ${errors.locationidError ? "text-danger" : ""
                                            }`}
                                    >
                                        Location
                                    </label>
                                    <Form.Select
                                        id="locationid"
                                        className={`form-control shadow-none border-3 py-2 ${errors.locationidError
                                                ? "is-invalid"
                                                : !errors.locationidError &&
                                                    product.locationidError !== "" &&
                                                    product.locationid != ""
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        name="locationid"
                                        value={product.locationid}
                                        onChange={(e) => validation(e)}
                                        onBlur={(e) => validation(e)}
                                    >
                                        <option value="" disabled>
                                            Select Location
                                        </option>
                                        {locationList.map((x) => (
                                            <option key={x._id} value={x._id}>
                                                {x.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <span className="invalid-feedback text-start">
                                        {errors.locationidError}
                                    </span>
                                </div>
                            </div>

                            {/* Seller Name */}
                            <div className="row p-4">
                                <h5 className="font">REVIEW YOUR DETAILS</h5>
                                <div className="d-flex">
                                    <img
                                        src="./assets/logo2.png"
                                        className="rounded-circle m-2 h-75"
                                        width="94px"
                                    />
                                    <div className="form-control border-0 pe-0 pt-3">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="name"
                                                className={`form-label ${errors.selleridError ? "text-danger" : ""
                                                    }`}
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                // name="sellerid"
                                                className={`form-control shadow-none border-3 py-2 ${errors.selleridError
                                                        ? "is-invalid"
                                                        : !errors.selleridError && product.sellerid !== ""
                                                            ? "is-valid"
                                                            : ""
                                                    }`}
                                                placeholder="Include condition, features, and reason for selling"
                                                // value={product.sellerid}
                                                value={user.given_name}
                                            // onChange={(e) => validation(e)}
                                            // onBlur={(e) => validation(e)}
                                            />
                                            <span className="invalid-feedback text-start">
                                                {errors.selleridError}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Seller Mobile Phone Number*/}
                            <div className="row px-4">
                                <div className="row p-4">
                                    <label
                                        className={`form-label ${errors.phoneNumberError ? "text-danger" : ""
                                            }`}
                                    >
                                        Mobile Phone Number
                                    </label>
                                    <InputGroup className="mb-3  ">
                                        <InputGroup.Text id="price-addon">+20</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className={`form-control shadow-none border-3 py-2 rounded-2 ${errors.phoneNumberError
                                                    ? "is-invalid"
                                                    : !errors.phoneNumberError &&
                                                        product.phoneNumber !== ""
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                            placeholder="Include condition, features, and reason for selling"
                                            value={product.phoneNumber}
                                            onChange={(e) => validation(e)}
                                            onBlur={(e) => validation(e)}
                                        />
                                        <span className="invalid-feedback text-start">
                                            {errors.phoneNumberError}
                                        </span>
                                    </InputGroup>
                                </div>
                            </div>

                            {/* Contact Method */}
                            <div className="row px-4 border-bottom mb-4">
                                <p className="fs-4 font">Contact Method</p>
                                <div
                                    className={
                                        (errors.ChatError
                                            ? "custom-red-border radio-btn mx-2"
                                            : "") +
                                        (isActive === "Phone Number"
                                            ? " radio-btn radio-btn-active mx-2"
                                            : "radio-btn mx-2")
                                    }
                                    onClick={() => radioActive("Phone Number")}
                                >
                                    <div className="outer">
                                        <div className="inner"></div>
                                    </div>
                                    <p>Phone Number</p>
                                </div>
                                <div
                                    className={
                                        (errors.ChatError
                                            ? "custom-red-border radio-btn mx-2"
                                            : "") +
                                        (isActive === "Dubizzle Chat"
                                            ? " radio-btn radio-btn-active mx-2"
                                            : "radio-btn mx-2")
                                    }
                                    onClick={() => radioActive("Dubizzle Chat")}
                                >
                                    <div className="outer">
                                        <div className="inner"></div>
                                    </div>
                                    <p>Dubizzle Chat</p>
                                </div>
                                <div
                                    className={
                                        (errors.ChatError
                                            ? "custom-red-border radio-btn mx-2"
                                            : "") +
                                        (isActive === "Both"
                                            ? " radio-btn radio-btn-active mx-2"
                                            : "radio-btn mx-2")
                                    }
                                    onClick={() => radioActive("Both")}
                                >
                                    <div className="outer ">
                                        <div className="inner"></div>
                                    </div>
                                    <p>Both</p>
                                </div>
                                <p className="mt-2 text-red">
                                    <span>{errors.ChatError}</span>
                                </p>
                            </div>
                            <div className="row px-4 ms-1">
                                <input
                                    type="submit"
                                    value="Post now"
                                    className={
                                        Object.values(errors).some((error) => error !== "")
                                            ? "btn btn-danger post disabled"
                                            : "btn  post"
                                    }
                                    disabled={Object.values(errors).some((error) => error !== "")}
                                />
                            </div>
                        </div>
                    </form>
                </Container>
            </Container>
        </>
    );
}