import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./AppLayout";
import HomePage from "./Pages/HomePage/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage";
import Attributes from "./Pages/Attributes/Attributes";
import Post from "./Pages/Post/Post";
import SellLayout from "./SellLayout";
import NotFound from "./Components/Not-Found/NotFound";
import ErrorPage from "./Components/errorPage/errorPage";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchBar from "./Components/SeachBar/SearchBar";
import EditProfile from "./Pages/EditProfile/EditProfile";
// import UserMenu from "./Components/UserMenu/UserMenu";
import ChoosePackage from "./Pages/Packages/choosePackage";
// import GoogleRedirect from "./Components/Login/LoginByGoogle/GoogleRedirect";
import CheckOut from "./Pages/checkOut/checkOut";
import Setting from "./Pages/Setting/Setting";
import { useState } from "react";
import { AuthProvider } from './Context/auth'
import UserStore from "./Pages/UserStore/UserStore";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";
import SavedSearchPage from "./Pages/FavoritePage/SavedSearchPage";
import { LocationContextProvider } from "./Context/LocationContext";
import PaymentContainer from "./Components/Payment/paymentContainer";
import BoughtPackages from "./Pages/BoughtPackages/boughtpackages";
import { IDContextProvider } from "./Context/IDContext";
import MyAds from "./Pages/MyAds/MyAds";
import Chat from './Pages/Chat/Chat'
import { LanguageProvider } from "./Context/Language";
import LoginByEmail from './Components/Login/LoginByEmail/activatedEmail';
import Guard from "./Components/Guard/Guard";
import GuardEdite from "./Components/Guard/GuardEdite";
import PrivacyAndPolicy from "./Pages/PrivacyAndPolicy/PrivacyAndPolicy";
import TermsOfUse from "./Pages/TermsOfUse/TermsOfUse";
import OurTeam from "./Pages/OurTeam/OurTeam";
import Sitemap from "./Pages/Sitemap/Sitemap";
import MostPopular from "./Pages/Sitemap/MostPopular";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      { path: "/search", element: <SearchPage />, errorElement: <ErrorPage /> },
      {
        path: "/singlePage/:id",
        element: <SingleProductPage />,
        errorElement: <ErrorPage />,
      },
      { path: '/editProfile', element:<Guard ><EditProfile /></Guard> , errorElement: <ErrorPage /> },
      { path: "/searchbar", element: <SearchBar />, errorElement: <ErrorPage /> },
      { path: "/userStore/:id", element: <UserStore />, errorElement: <ErrorPage /> },
      { path: "/myads", element:<Guard><MyAds /></Guard> , errorElement: <ErrorPage /> },
      { path: "/chat", element:<Guard><Chat /></Guard> , errorElement: <ErrorPage /> },
      { path: "/chat/:id", element:<Guard><Chat /></Guard> , errorElement: <ErrorPage /> },
      { path: "/myfavorites", element:<Guard><FavoritePage /></Guard> , errorElement: <ErrorPage /> },
      { path: "/savedsearches", element: <Guard><SavedSearchPage /></Guard>, errorElement: <ErrorPage /> },
      { path: "/setting", element: <Guard><Setting /></Guard>, errorElement: <ErrorPage /> },
      { path: "/payments", element: <Guard><PaymentContainer /></Guard>, errorElement: <ErrorPage /> },
      { path: "/boughtpackages", element: <Guard><BoughtPackages /></Guard>, errorElement: <ErrorPage /> },
      { path: "/activate/:id", element: <LoginByEmail />, errorElement: <ErrorPage /> },

      {
        path: '/Sitemap',
        element: <Sitemap />
        , errorElement: <ErrorPage />,
        children: [
            {   
                index: true,
                element: <MostPopular />
            },
                 { path: "/Sitemap/Most_Popular", element: <MostPopular />, errorElement: <ErrorPage /> },
        ]
    },

      { path: "*", element: <NotFound />, errorElement: <ErrorPage /> },
    ],
  },
  {
    // path: "/",
    element: <SellLayout />,
    children: [
      {
        path: "/attributes",
        element: <Guard><Attributes /></Guard>, errorElement: <ErrorPage />, },
      { path: "/post", element:<Guard><Post /></Guard> , errorElement: <ErrorPage /> },
      { path: "/post/:id", element:<GuardEdite><Post /></GuardEdite> , errorElement: <ErrorPage /> },
      {
        path: "/choosePackage",element:<Guard><ChoosePackage /></Guard> ,errorElement: <ErrorPage />,
      },
      { path: "/checkout", element:<Guard><CheckOut /></Guard> , errorElement: <ErrorPage /> },
      { path: "/payments", element:<Guard> <PaymentContainer /></Guard>, errorElement: <ErrorPage /> },
      { path: "/Privacy_And_Policy", element: <PrivacyAndPolicy />, errorElement: <ErrorPage /> },
      { path: "/Terms_Of_Use", element: <TermsOfUse />, errorElement: <ErrorPage /> },
      { path: "/Our_Team", element: <OurTeam />, errorElement: <ErrorPage /> },

    ],
  },
]);
function App() {
  const [Islogged, setIslogged] = useState((localStorage.getItem(`authInfo`)||localStorage.getItem(`token`)) ? true : false);
  const queryParams = new URLSearchParams(location.search);
  const defaultLocation = queryParams.get("location") || "Egypt";
  const [selectLocation, setSelectLocation] = useState(defaultLocation);
  const [user, setUser] = useState({
    _id:localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`))._id : "",
    username:localStorage.getItem(`userInfo`) ?( JSON.parse(localStorage.getItem(`userInfo`)).name||
    JSON.parse(localStorage.getItem(`userInfo`)).username) : "",
    email:localStorage.getItem(`userInfo`) ? JSON.parse(localStorage.getItem(`userInfo`)).email : ""
  });
  const [Language, setLanguage] = useState('العربية');

  return (
    <AuthProvider value={{ Islogged, setIslogged }} >
      <IDContextProvider value={{user, setUser}}>
      <Provider store={store}>
        <LocationContextProvider value={{ selectLocation, setSelectLocation }} >
          <HelmetProvider>
          <LanguageProvider value={{ Language, setLanguage }}>
            <RouterProvider router={router} />
            </LanguageProvider>
            <Helmet>
              <title>Dubizzle</title>
            </Helmet>
          </HelmetProvider>
        </LocationContextProvider>
      </Provider>
      </IDContextProvider>
    </AuthProvider>
  );
}

export default App;
