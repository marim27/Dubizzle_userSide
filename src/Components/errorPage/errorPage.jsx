import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className='container text-center' style={{margin:'8rem 0'}}>
            <img src="../../../assets/error.png" alt="" />
            <p className='opacity-75'>Something is wrong</p>
            <p className='opacity-50'>We are having some difficulties, try again</p>
            <Link to='/'><button className='btn btn-outline-danger'>Go to the home page</button></Link>
        </div>
    );
}

export default ErrorPage;
