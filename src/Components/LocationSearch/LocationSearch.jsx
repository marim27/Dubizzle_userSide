import "./LocationSearch.css";
import { IoMdLocate } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/DubizzleDB";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../../Context/LocationContext";
import { LanguageContext } from "../../Context/Language";

export default function LocationSearch() {
  const { selectLocation , setSelectLocation } = useContext(LocationContext);
  let [locations, setLocations] = useState([]);
  // const queryParams = new URLSearchParams(location.search);
  // const defaultLocation = queryParams.get("location") || "Egypt";
  const [selectedLoc, setSelectedLoc] = useState(selectLocation);
  // let [selectedLoc, setSelectedLoc] = useState("Egypt");
  const [dropMenu, setDropMenu] = useState(false);
  const [showData, setShowData] = useState(true);
  let [filterLocations, setFilterLocations] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const newLocation = selectLocation;
    setSelectedLoc(newLocation);
    // console.log(selectLocation+"9999999999999999999999999999999999999");
  }, [selectLocation]);

  useEffect(
    function () {
      axiosInstance
        .get("/location")
        .then((res) => {
          setLocations(res.data.data.data);
          // console.log(res.data.data.data);
          // console.log(locations);

        })
        .catch((err) => {
          console.log(err);
        });
      // setFilterLocations(locations)
    }, []
    
  );

  useEffect(
    function () {
      // console.log(locations);
      setFilterLocations(locations)

    }, [locations]
  )

  const handleToggle = () => {
    setDropMenu(!dropMenu);
  };

  const changeLocation = async (value) => {
    setSelectedLoc(value);
    // setSelectLocation(value)
    setDropMenu(false);
    value = value === 'Egypt' ? '' : value;
    try {
      const response = await axiosInstance.get(`/products/filter?location=${value}`);
      const data = await response.data;
      navigate(`/search?location=${value}`, { state: { results: data } });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }


  const searchLocation = (ev) => {
    // console.log(ev.target.value);
    let value = ev.target.value.toLowerCase();
    if (value != '') {
      setShowData(false);
      axiosInstance
        .get(`/location/title?title=${value}`)
        .then((res) => {
          console.log(res.data);
          setFilterLocations(res.data)
        })
        .catch((err) => {
          console.log(err);
        });

      // filterLocations = locations.filter((loc)=>loc.title.toLowerCase().includes(value))
      // setLocations(filterLocations)
      // console.log(filterLocations);
    } else {
      setShowData(true);
      setFilterLocations(locations)
    }
  }
  const { Language } = useContext(LanguageContext)

  return (
    <>
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
          {Language == 'العربية' ?  <input
              type="text"
              placeholder="search for location"
              className="form-control" id="loc-input" onChange={(event) => { searchLocation(event) }}
            />:
            <input
            type="text"
            placeholder="البحث عن الموقع"
            className="form-control" id="loc-input" onChange={(event) => { searchLocation(event) }}
          />
            }
          
          </div>
          {showData && <>
            <h6 className="p-2 m-0" role="button">
              <IoMdLocate className="fs-6 text-danger" />{Language == 'العربية' ?'Use Current Location':'استخدام الموقع الحالي' }   
            </h6>
            <p className="text-secondary p-2 m-0">
              
              {Language == 'العربية' ?'choose location':'اختيار موقع' }

              </p>
            <p className="text-danger p-2 m-0" role="button" onClick={() => { changeLocation("Egypt") }}>
            {Language == 'العربية' ?'See Ads in all Egypt':'شاهد الإعلانات في كل مصر' }
              </p>
          </>}
          {filterLocations.map((loc) => (
            <p className="text-dark p-2 loc m-0" role="button" key={loc._id} onClick={() => { changeLocation(loc.title) }}>
              {loc.title}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
