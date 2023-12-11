import { useContext, useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { Form, Button, Col } from "react-bootstrap";
import axiosInstanceProducts from "../../axiosConfig/DubizzleDB";
import './SearchBar.css';
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../Context/Language";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isInputActive, setInputActive] = useState(false);
    const navigate = useNavigate();
    const blurTimeoutRef = useRef(null);
    const { Language, setLanguage } = useContext(LanguageContext);

    useEffect(() => {
        if (isInputActive && searchTerm.trim() !== "") {
            const fetchSearchResults = async () => {
                try {
                    const response = await axiosInstanceProducts.get(`/products/search?title=${searchTerm}`);
                    const data = await response.data;
                    setResults(data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchSearchResults();
        } else {
            setResults([]);
        }
    }, [searchTerm, isInputActive]);
    const highlightSearchTerm = (text) => {
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, (match) => `<strong>${match}</strong>`);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstanceProducts.get(`/products/search?title=${searchTerm}`);
            const data = await response.data;
            navigate(`/search?searchTerm=${searchTerm}`, { state: { results: data } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    const handleResultItemClick = (clickedTerm) => {
        setSearchTerm(clickedTerm);
        handleFormSubmit(new Event("submit"));
    };
    const handleInputBlur = () => {
        blurTimeoutRef.current = setTimeout(() => {
            setInputActive(false);
        }, 200);
    };
    const handleInputFocus = () => {
        clearTimeout(blurTimeoutRef.current);
        setInputActive(true);
    };
    return (
        <>
            <Col lg={5}>
                <Form className="input-group" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        className="search-input fs-5 ps-2 rounded py-2 col"
                        placeholder="Find Cars, Mobile Phones and more..."
                        autoComplete="off"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {Language === 'العربية' ?
                        <Button
                            variant="danger"
                            className="cllbtn text-light fs-4"
                            type="submit"
                        >
                            <BsSearch
                                className="fa-solid fa-magnifying-glass"
                                style={{ color: "#f6f6f6" }}
                            />
                        </Button>
                        :
                        <Button
                            variant="danger"
                            className="cllbtn text-light fs-4 roundedBtn"
                            type="submit"
                        >
                            <BsSearch
                                className="fa-solid fa-magnifying-glass"
                                style={{ color: "#f6f6f6" }}
                            />
                        </Button>
                    }
                    {isInputActive && results.length > 0 && (
                        <ul className="search-ul rounded">
                            {results.map((product) => (
                                <li
                                    className="search-li py-3"
                                    role="button"
                                    key={product._id}
                                    onClick={() => handleResultItemClick(product.title)}
                                    dangerouslySetInnerHTML={{
                                        __html: highlightSearchTerm(product.title)
                                    }}
                                ></li>
                            ))}
                        </ul>
                    )}
                </Form>
            </Col>
        </>
    );
}
