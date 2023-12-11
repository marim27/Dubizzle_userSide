import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/auth';
import MyVerticallyCenteredModal from '../Login/Login';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../errorPage/errorPage';
import NotFound from '../Not-Found/NotFound';
import axiosInstanceProducts from '../../axiosConfig/DubizzleDB';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import PageLoaderes from '../PageLoaderes/PageLoaderes';
import NavLayOut from '../nav/nav';

const GuardEdite = ({ children }) => {
    const [modalShow, setModalShow] = useState(true);
    const { Islogged } = useContext(AuthContext);
    const { id } = useParams();
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstanceProducts.get(`/products/${id}`);
                setUserId(response.data.single.sellerid._id);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (Islogged) {
        const user = JSON.parse(localStorage.getItem('userInfo'))._id;
        if (isLoading) {
            return <>
                <NavLayOut />
                <div className='m-5 p-5'>
                    <PageLoaderes />
                </div>
            </>
        } else if (user !== userId) {
            return (
                <>
                    <NavBar />
                    <NotFound />
                    <Footer />
                </>
            );
        } else {
            return children;
        }
    } else {
        navigate(-1);
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
};

export default GuardEdite;