import { BsInstagram } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { LanguageContext } from "../../Context/Language";
import { Link } from "react-router-dom";

const Footer = () => {
  const { Language } = useContext(LanguageContext);
  return (
    <>

      <div>
        {Language === 'العربية' ? (
          <div className="bg-light container">
            {/* Footer 1 content */}
            <div className="row  py-3 foorter">
              {/* Footer 2 */}
              {/* <hr /> */}
              <div style={{ fontSize: "small" }} className="row ">
                {/* 1st */}
                <div className="col-6 col-md-2 mb-3 ">
                  <h6 className="pb-3">ABOUT US</h6>
                  <ul className="nav flex-column ">
                    <li className="nav-item mb-2">
                      <Link to={`/Our_Team`} className="nav-link p-0 text-dark">
                        {/* About Dubizzle Group */}
                        Our Team
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        Careers
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        Contact Us
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        Dubizzle for Businesses
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* 2nd */}
                <div className="col-6 col-md-2 mb-3">
                  <h6 className="pb-3">DUBIZZLE</h6>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        Help
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={`/Sitemap`} className="nav-link p-0 text-dark">
                        Sitemap
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={`/Terms_Of_Use`} className="nav-link p-0 text-dark">
                        Terms of use
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to={`/Privacy_And_Policy`} className="nav-link p-0 text-dark">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* 3rd */}
                <div className="col-6 col-sm-6 col-md-2 mb-3">
                  <h6 className="pb-3">COUNTRIES</h6>
                  <div className="nav">
                    <div className="d-flex flex-column pe-5">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Bahrain
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Jordan
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Kuwait
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Lebanon
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Oman
                        </a>
                      </li>
                    </div>
                    <div className="d-flex flex-column">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          UAE
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          Egypt
                        </a>
                      </li>
                    </div>
                  </div>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* Social */}
                <div className="col-12 col-md-3 col-sm-6 text-center text-dark">
                  <div className="fs-6 fw-bold mb-2 text-start">FOLLOW US</div>
                  <div className="d-flex flex-row">
                    {/* Facebook */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BiLogoFacebookCircle className="socialIcon" />
                      </div>
                    </a>
                    {/* Twitter */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <FaTwitter className="socialIcon" />
                      </div>
                    </a>
                    {/* Youtube */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BsYoutube className="socialIcon" />
                      </div>
                    </a>
                    {/* Instagram */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BsInstagram className="socialIcon" />
                      </div>
                    </a>
                    {/* Linked In */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <FaLinkedin className="socialIcon" />
                      </div>
                    </a>
                  </div>
                  <div className="d-flex flex-row mt-5">
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconAppStoreEN_noinline.a731d99c8218d6faa0e83a6d038d08e8.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconGooglePlayEN_noinline.9892833785b26dd5896b7c70b089f684.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconAppGallery_noinline.6092a9d739c77147c884f1f7ab3f1771.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-light container">
            {/* Footer 2 content */}
            <div className="row  py-3 foorter">
              {/* Footer 2 */}
              {/* <hr /> */}
              <div style={{ fontSize: "small" }} className="row ">
                {/* 1st */}
                <div className="col-6 col-md-2 mb-3 ">
                  <h6 className="pb-3">نبذة عنا</h6>
                  <ul className="nav flex-column p-0">
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        عن Dubizzle Group
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        وظائف دوبيزيل
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        تواصل معنا
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        دوبيزيل للأعمال
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* 2nd */}
                <div className="col-6 col-md-2 mb-3">
                  <h6 className="pb-3">دوبيزيل</h6>
                  <ul className="nav flex-column p-0">
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        مدونه
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        المساعه
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        خريطة الموقع
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        شروط الاستخدام
                      </a>
                    </li>
                    <li className="nav-item mb-2">
                      <a href="#" className="nav-link p-0 text-dark">
                        سياسه الخصوصيه
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* 3rd */}
                <div className="col-6 col-sm-6 col-md-2 mb-3">
                  <h6 className="pb-3 ">الدول</h6>
                  <div className="nav">
                    <div className="d-flex flex-column">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          البحرين
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          الاردن
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          الكويت
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          لبنان
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          عمان
                        </a>
                      </li>
                    </div>
                    {/* <div className="d-flex flex-column ms-3">
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          الامارات العربية المتحدة
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a href="#" className="nav-link p-0 text-dark">
                          مصر
                        </a>
                      </li>
                    </div> */}
                  </div>
                </div>
                <div className="d-none d-md-block col-md-1"></div>
                {/* Social */}
                <div className="col-12 col-md-3 col-sm-6 text-center text-dark">
                  <div className="fs-6 fw-bold mb-2 text-start">تابعنا</div>
                  <div className="d-flex flex-row">
                    {/* Facebook */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BiLogoFacebookCircle className="socialIcon" />
                      </div>
                    </a>
                    {/* Twitter */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <FaTwitter className="socialIcon" />
                      </div>
                    </a>
                    {/* Youtube */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BsYoutube className="socialIcon" />
                      </div>
                    </a>
                    {/* Instagram */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <BsInstagram className="socialIcon" />
                      </div>
                    </a>
                    {/* Linked In */}
                    <a href="">
                      <div className="rounded-circle border border-danger socialCont me-2">
                        <FaLinkedin className="socialIcon" />
                      </div>
                    </a>
                  </div>
                  <div className="d-flex flex-row mt-5">
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconAppStoreEN_noinline.a731d99c8218d6faa0e83a6d038d08e8.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconGooglePlayEN_noinline.9892833785b26dd5896b7c70b089f684.svg"
                        alt=""
                      />
                    </a>
                    <a href="">
                      <img
                        className="w-100 pe-2"
                        src="https://www.dubizzle.com.eg/assets/iconAppGallery_noinline.6092a9d739c77147c884f1f7ab3f1771.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;
