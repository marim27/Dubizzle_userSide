import React, { useContext } from 'react'
// import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/auth';
import MyVerticallyCenteredModal from '../Login/Login';
import { useNavigate } from 'react-router-dom'
import ErrorPage from '../errorPage/errorPage';
export default function Guard({ children }) {
    const [modalShow, setModalShow] = React.useState(true);
    const navigate = useNavigate()
    const { Islogged } = useContext(AuthContext);
    if (Islogged) {
        return children
    } else {
        navigate(-1)
        return (
            <>
            <ErrorPage />
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        );
    }
}