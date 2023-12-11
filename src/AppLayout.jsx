import { Outlet } from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { useContext } from 'react';
import { LanguageContext } from './Context/Language';

const AppLayout = () => {
  const { Language } = useContext(LanguageContext)

    return (
      <div>
        <div dir={`${(Language == 'العربية') ? 'ltr' : 'rtl'}`}>
        <NavBar />
        <Outlet />
        <div className="container-fluid bg-light">
          <Footer />
        </div>
        </div>
      </div>
    );
}

export default AppLayout;
