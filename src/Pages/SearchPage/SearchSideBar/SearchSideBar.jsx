
// import { Link } from 'react-router-dom';
// import { FiMapPin } from 'react-icons/fi';


// const SearchSideBar = () => {
//   return (
//     <>
//       <div className="line">
//         <div className="col-4 d-flex flex-column border-bottom">
//           <Link className="text-decoration-none text-dark fw-bold ">Cars for Sale</Link>
//           <Link className="text-decoration-none text-dark fw-bold font_size">Filters</Link>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold">CATEGORIES</div>
//           <Link className="text-decoration-none text-black fs-6">All categories</Link>
//           <Link className="text-decoration-none font_size">Vehicles</Link>
//           <Link className="text-decoration-none fw-bold font_size">Cars for Sale</Link>
//           <Link className="text-decoration-none font_size">Cars for Rent</Link>
//           <Link className="text-decoration-none font_size">Tyres, Batteries, Oils, & Accessories</Link>
//           <Link className="text-decoration-none font_size">Car Spare Parts</Link>
//           <Link className="text-decoration-none font_size">Motorcycles & Accessories</Link>
//           <Link className="text-decoration-none font_size">Boats - Watercraft</Link>
//           <Link className="text-decoration-none font_size">Heavy Trucks, Buses & Other Vehicles</Link>
//         </div>

//         <div className="d-flex flex-column mt-4 me-3">
//           <div href="#" className="fw-bold mb-4">LOCATIONS</div>
//           <div className="mb-3">
//             <div className="searchable-dropdown2">
//               <div className="search-container2">
//                 <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                 <input type="text" className="search-input2 form-control fs-4 ps-5" placeholder="Search location..."
//                   id="location-search2" />
//                 <span className="fw-bolder fs-5 arrow"><i className="fa-solid fa-angle-up"></i></span>
//               </div>
//               <ul className="options2">
//                 <li data-value="London" className="d-flex justify-content-between">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
//                     <path className="px-5"
//                       d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661 0-2.984 2.804-5.602 6-5.602m0-2c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
//                       style={{ fill: "red" }} />
//                   </svg>
//                   London
//                 </li>
//                 <li data-value="Boston" className="d-flex justify-content-between">
//                   <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                   Boston
//                 </li>
//                 <li data-value="Mumbai" className="d-flex justify-content-between">
//                   <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                   Mumbai
//                 </li>
//                 <li data-value="New York" className="d-flex justify-content-between">
//                   <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                   New York
//                 </li>
//                 <li data-value="Toronto" className="d-flex justify-content-between">
//                   <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                   Toronto
//                 </li>
//                 <li data-value="Paris" className="d-flex justify-content-between">
//                   <FiMapPin className="fa-solid fa-location-dot search-icon fs-4" />
//                   Paris
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <a href="#" className="text-decoration-none text-dark fw-bold font_size2 ms-4 mb-3">Egypt</a>
//           <a href="#" className="text-decoration-none font_size2 mb-3 ms-5">Cairo</a>
//           <a href="#" className="text-decoration-none font_size2 mb-3 ms-5">Giza</a>
//           <a href="#" className="text-decoration-none font_size2 mb-3 ms-5">Alexandria</a>
//           <a href="#" className="text-decoration-none font_size2 mb-3 ms-5">Damietta</a>
//           <a href="#" className="text-decoration-none font_size2 mb-3 ms-5">Dakahlia</a>
//           <a href="#" className="text-decoration-none mb-3 ms-5">View more</a>
//         </div>

//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold">BRAND</div>
//           <Link className="text-decoration-none font_size2 mb-3 ms-5"><img src="../../../../../public/images/SearchImg/chery.png" className="col-1 me-1" alt="" />Chery</Link>
//           <Link className="text-decoration-none font_size2 mb-3 ms-5"><img src="../../../../../public/images/SearchImg/chevrolet.png" className="col-1 me-1" alt="" />Chevrolet</Link>
//           <Link className="text-decoration-none font_size2 mb-3 ms-5"><img src="../../../../../public/images/SearchImg/hyundai.png" className="col-1 me-1" alt="" />Hyundai</Link>
//           <Link className="text-decoration-none font_size2 mb-3 ms-5"><img src="../../../../../public/images/SearchImg/kia.png" className="col-1 me-1" alt="" />Kia</Link>
//           <Link className="text-decoration-none font_size2 mb-3 ms-5"><img src="../../../../../public/images/SearchImg/mg.png" className="col-1 me-1" alt="" />MG</Link>
//           <Link className="text-decoration-none ms-5 mb-3">View more</Link>
//         </div>

//         <div className="d-flex flex-column border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">AD TYPE</div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">For Sale</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Wanted Item</label>
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom my-3">
//           <div href="#" className="fw-bold ms-4 mb-3">FUEL TYPE</div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Benzine</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Diesel</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Electric</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Hybrid</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Natural Gas</label>
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold ms-4 mb-3">PRICE</div>
//           <div className="row mb-3 ms-5">
//             <input type="text" value="6,000" className="col-5 bg-secondary bg-opacity-25 fs-5 border-bottom my-2 border-0" />
//             <div className="col-1"></div>
//             <input type="text" value="8,000" className="col-5 bg-secondary bg-opacity-25 fs-5 border-bottom my-2 border-0" />
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold ms-4 mb-3 mt-3">PAYMENT OPTIONS</div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Cash</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Installments</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Exchange</label>
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold ms-4 mb-3 mt-3">YEAR</div>
//           <div className="row mb-3 ms-5">
//             <input type="text" value="1900" className="col-3 bg-secondary bg-opacity-25 fs-5 border-bottom my-2 border-0" />
//             <div className="col-1"></div>
//             <input type="text" value="2023" className="col-3 bg-secondary bg-opacity-25 fs-5 border-bottom my-2 border-0" />
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold ms-4 mb-3 mt-3">KILOMETERS</div>

//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">0 to 9999</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor=""> 100000 to 119999</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">10000 to 19999</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">More than 200000</label>
//           </div>
//           <div className="mb-3 ms-5">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">120000 to 139999</label>
//           </div>
//           <a href="#" className="text-decoration-none mb-3 ms-5">View more</a>
//         </div>
//         <div className="d-flex flex-column border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">TRANSMISSION TYPE</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Automatic</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Manual</label>
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom my-3">
//           <div href="#" className="fw-bold ms-4 mb-3">CONDITION</div>
//           <div>
//             <input type="checkbox" className="checkboxMargin form-check-input ms-4 mb-3" />
//             <label htmlFor="">Used</label>
//           </div>
//           <div>
//             <input type="checkbox" className="checkboxMargin form-check-input ms-4 mb-3" />
//             <label htmlFor="">New</label>
//           </div>
//         </div>
//         <div className="d-flex flex-column border-bottom">
//           <div href="#" className="fw-bold ms-4 mb-3">COLOR</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Black</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">White</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Gray</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Blue- Navy Blue</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Silver</label>
//           </div>

//           <a href="#" className="text-decoration-none ms-4 mb-3">View more</a>
//         </div>
//         <div className="d-flex flex-column border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">BODY TYPE</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Sedan</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">SUV</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Hatchback</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">4X4</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Coupe</label>
//           </div>
//           <a href="#" className="text-decoration-none ms-4 mb-3">View more</a>
//         </div>
//         <div className="d-flex flex-column border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">ENGINE CAPACITY (CC)</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">1600</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">1400 - 1500</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">1800 - 2000</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">1000 - 1300</label>
//             <div className="mt-3">
//               <input type="checkbox" className="checkboxMargin form-check-input" />
//               <label htmlFor="">More than 3000</label>
//             </div>
//           </div>
//           <a href="#" className="text-decoration-none ms-4 mb-3">View more</a>
//         </div>
//         <div className="d-flex flex-column border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">EXTRA FEATURES</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Air Conditioning</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">AM/FM Radio</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Power Windows</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Power Locks</label>
//           </div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Bluetooth System</label>
//           </div>
//           <a href="#" className="text-decoration-none ms-4 mb-3">View more</a>
//         </div>
//         <div className="border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">VIDEO</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Not Available</label>
//           </div>
//         </div>
//         <div className="border-bottom mt-3">
//           <div href="#" className="fw-bold ms-4 mb-3">VIRTUAL TOUR</div>
//           <div className="ms-4 mb-3">
//             <input type="checkbox" className="checkboxMargin form-check-input" />
//             <label htmlFor="">Not Available</label>
//           </div>
//         </div>
//       </div>
//     </>

//   );
// }

// export default SearchSideBar;

import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { IoMdLocate } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig/DubizzleDB";
import { LocationContext } from "../../../Context/LocationContext";

const handleFilterSubmit = (onFilterChange, searchTerm, minPrice, maxPrice, selectedLoc) => {
  let selectedLocation = selectedLoc === "Egypt" ? "Egypt" : selectedLoc;
  onFilterChange({ searchTerm, minPrice, maxPrice, location: selectedLocation });

  const queryParams = new URLSearchParams(window.location.search);
  // queryParams.set("searchTerm", searchTerm);
  if(minPrice !== 0){
    queryParams.set("minPrice", minPrice);
  }
  if(maxPrice !== 1000000000){
    queryParams.set("maxPrice", maxPrice);
  }
    queryParams.set("location", selectedLocation);
  
  const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};

const SearchSideBar = ({ onFilterChange }) => {
  const { selectLocation , setSelectLocation } = useContext(LocationContext);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000);
  // const [selectedLoc, setSelectedLoc] = useState("Egypt");
  const [dropMenu, setDropMenu] = useState(false);
  const [showData, setShowData] = useState(true);
  const [filterLocations, setFilterLocations] = useState([]);
  // const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const defaultLocation = queryParams.get("location") || "Egypt";
  const [selectedLoc, setSelectedLoc] = useState(defaultLocation);
  // const searchTerm = queryParams.get("searchTerm");
  // console.log(searchTerm);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(location.search);
    if (selectedLoc == "Egypt") {
      // console.log("naaaaaaaaaaah");
    } else {
      currentSearchParams.set("location", selectedLoc);
      // console.log(currentSearchParams + "11111111111111111111111111111111111");
      const newUrl = `${window.location.pathname}?${currentSearchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedLoc])

  useEffect(() => {
    // let x = queryParams.get("searchTerm") || '';
    // console.log(x +"THIS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx");
    // setSearchTerm(queryParams.get("searchTerm") || '');
    setSearchTerm(queryParams.get("searchTerm") || '');
    // alert("search term from side bar is : " +searchTerm);
    axiosInstance
      .get("/location")
      .then((res) => {
        setFilterLocations(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(location.search);
  }, []);

// useEffect(() => {
//   setSearchTerm(queryParams.get("searchTerm") || '');
// }, [location.search]);

  useEffect(() => {
    let selectedLocation = selectedLoc === "Egypt" ? "Egypt" : selectedLoc;
    handleFilterSubmit(onFilterChange, searchTerm, minPrice, maxPrice, selectedLocation);
  }, [searchTerm, minPrice, maxPrice, selectedLoc]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleMinPriceKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilterSubmit();
    }
  };

  const handleMaxPriceKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilterSubmit();
    }
  };

  const handleToggle = () => {
    setDropMenu(!dropMenu);
  };

  const changeLocation = async (value) => {
    setDropMenu(false);
    console.log(value + "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
    await setSelectLocation(value);
    setSelectedLoc(value);
    // console.log("selectedLocation : "+ selectedLocation);
    handleFilterSubmit();
  };

  const searchLocation = (ev) => {
    let value = ev.target.value.toLowerCase();
    if (value !== "") {
      setShowData(false);
      // setSelectedLoc(ev);
      // handleFilterSubmit();
      axiosInstance
        .get(`/location/title?title=${value}`)
        .then((res) => {
          setFilterLocations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowData(true);
      setFilterLocations([]);
    }
  };

  return (

    <div>
      <h5>Filters</h5>
      <div className="d-flex flex-column border-bottom my-3"></div>
      <Form.Label className="fw-semibold fs-5">Price</Form.Label>
      <Form>
        <div className="d-flex">
          <Form.Group controlId="minPrice">
            <Form.Control
              className="bg-opacity-25 fs-5 border-bottom border-0 me-2"
              style={{ backgroundColor: "#F7F8F8" }}
              type="number"
              placeholder="min"
              value={minPrice}
              onChange={handleMinPriceChange}
              onKeyDown={handleMinPriceKeyDown}
            />
          </Form.Group>
          <Form.Group controlId="maxPrice">
            <Form.Control
              className="bg-opacity-25 fs-5 border-bottom border-0 ms-2 mb-3"
              style={{ backgroundColor: "#F7F8F8" }}
              type="number"
              placeholder="max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              onKeyDown={handleMaxPriceKeyDown}
            />
          </Form.Group>
        </div>
        <Form.Label className="fw-semibold fs-5">LOCATIONS</Form.Label>
        <div className="form-control ps-2 m-0 d-flex justify-content-between align-items-center loc-filter">
          <h6 className="m-0">
            <IoLocationOutline className="fs-5 text-danger" /> {selectedLoc}
          </h6>
          <span>
            {!dropMenu ? (
              <MdKeyboardArrowDown className="fs-4" onClick={handleToggle} />
            ) : (
              <MdKeyboardArrowUp className="fs-4" onClick={handleToggle} />
            )}
          </span>
        </div>
        {dropMenu && (
          <div className="form-control location p-0">
            <div className="m-2">
              <input
                type="text"
                placeholder="search for location"
                value={selectedLoc}
                className="form-control"
                id="loc-input"
                onChange={(event) => {
                  searchLocation(event)
                }}
              />
            </div>
            {showData && (
              <>
                <h6 className="p-2 m-0" role="button">
                  <IoMdLocate className="fs-6 text-danger" /> Use Current Location
                </h6>
                <p className="text-secondary p-2 m-0">choose location</p>
                <p
                  className="text-danger p-2 m-0"
                  role="button"
                  onClick={() => {
                    changeLocation("Egypt");
                  }}
                >
                  See Ads in all Egypt
                </p>
              </>
            )}
            {filterLocations.map((loc) => (
              <p
                className="text-dark p-2 loc m-0"
                key={loc._id}
                role="button"
                onClick={() => {
                  changeLocation(loc.title);
                }}
              >
                {loc.title}
              </p>
            ))}
          </div>
        )}
        <Button variant="primary" onClick={handleFilterSubmit} className="d-none">
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

SearchSideBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchSideBar;

