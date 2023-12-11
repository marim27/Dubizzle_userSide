import { Link, Outlet } from "react-router-dom";
import "./Sitemap.css";
import { Helmet } from "react-helmet";
const Sitemap = () => {
    return (
        <>
         <Helmet>
        <title>Sitemap Most Popular</title>
      </Helmet>
        <section className="container p-5">
         <div className="col-4 d-flex justify-content-between border-bottom pb-3">
            <Link to={`/Sitemap/Most_Popular`} className="text-dark text-decoration-none">MOST POPULAR</Link>
            <Link className="text-dark text-decoration-none">CATEGORIES</Link>
            <Link className="text-dark text-decoration-none">PROVINCES</Link>
            <Link className="text-dark text-decoration-none">CITIES</Link>
            </div>   
        <Outlet/>
        </section>
        </>
    );
}

export default Sitemap;
