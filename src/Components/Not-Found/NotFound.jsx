import './NotFound.css'
import { Helmet } from 'react-helmet';
const NotFound = () => {
    return (
        <>
         <Helmet>
        <title>Not found | Dubizzle Egypr (OLX)</title>
      </Helmet>
         <div className='row notFoundPage'>
            <div className='col-4'></div>
            <div className='col-4 w-auto'>
                <div className='oops'>Oops!</div>
                <div className='notFoundText'>We can't seem to find that.</div>
                <div className='notFoundText'> Try searching for it</div>
                <div className='mb-2'>Error 404</div>
            </div>
            <div className='col-3 ms-3 mt-5'><img src="../images/NotFound.webp" alt="not found" className='w-50'/></div>
         </div>
        </>
    );
}

export default NotFound;