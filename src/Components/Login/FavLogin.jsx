import React from "react";
import MyVerticallyCenteredModal from "./Login";
import { BsSuitHeart } from 'react-icons/bs';

function FavLogin() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <BsSuitHeart className="fs-5"
                role='button'
                onClick={() => setModalShow(true)}
            />
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default FavLogin;