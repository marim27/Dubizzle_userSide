import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavLayOut = () => {

    let navigate = useNavigate();
    let goBack = () => {
      navigate(-1);
    };
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary pt-0">
          <Container fluid>
            <Navbar.Brand href="#home">
              <NavLink
                onClick={() => {
                  goBack();
                }}
                className="text-decoration-none text-dark"
              >
                <AiOutlineArrowLeft className="fs-4 mt-3 me-2" />
              </NavLink>
              <NavLink to="/">
                <img
                  src="https://www.dubizzle.com.eg/assets/logo_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                  className="dubizzle"
                />
              </NavLink>
            </Navbar.Brand>
          </Container>
        </Navbar>
        </div>
    );
}

export default NavLayOut;
