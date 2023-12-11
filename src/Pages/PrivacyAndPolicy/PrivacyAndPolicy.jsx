import { Link } from "react-router-dom";
import NavLayOut from "../../Components/nav/nav";
import { TbHexagonLetterZ } from "react-icons/tb";
import { Helmet } from "react-helmet";
const PrivacyAndPolicy = () => {
    const date = new Date('11/17/2023').toDateString();
    // console.log(date);
    return (
        <>
            <Helmet>
                <title>Privacy Policy</title>
            </Helmet>
            <div className="border-bottom">
                <NavLayOut />
                <div className="container p-5">
                    <Link className="olx-color text-decoration-none">Dubizzle Egypt <span className="text-dark">{'>'}
                    </span> Legal & Privacy information
                        <span className="text-dark"> {'>'} </span> Privacy Policies</Link>
                    <div className="row mt-5">
                        <div className="col-3">
                            <p className="fw-bold">Articles in this section</p>
                            <p className="olx-color">Privacy Policy</p>
                        </div>
                        <div className="col-7 border-bottom">
                            <h2 className="fw-bold">Privacy Policy</h2>
                            <div className="mt-4 text-secondary"> <small >{date} . Updated</small></div>
                            <p>Dubizzle Limited (referred to as "we" "us" "our" or "Dubizzle") take your privacy very seriously and are
                                committed to protecting the privacy of all visitors and subscribers to our website www.dubizzle.com.eg
                                (the “Website”) or any application we make available via an app store (the “App”, together with the
                                Website, the “Platform”), and the corresponding services available through the Platform (the “Platform
                                Services”).</p>
                            <p>Below we set out our privacy policy (the “Policy”), which will outline how we process any Personal
                                Information you provide us. References to "Personal Information" mean information that will allow us
                                to identify you.</p>
                            <p>Please read this Policy carefully, as it contains important information on who we are and how we collect,
                                store, use and share your information. By accessing the Platform or using our Platform Services or
                                otherwise indicating your consent, you agree to, and where required, consent to the collection, use
                                and transfer of your information as set out in this policy. If you do not accept the terms of this
                                policy, you must not use the Platform and/or the Services. This Policy supplements other notices
                                and policies and is not intended to override them.</p>
                            <p>This Policy: (i) applies only to the Platform and not to websites or applications of other companies or
                                organisations; and (ii) specifically addresses our obligations pursuant to local law.</p>
                            <p>References to "users", "you", “yourself” or "your" is a reference to individuals using our Platforms or
                                Platform Services.</p>
                            <p>Our Platforms are not intended for anyone under the age of 18 (referred to herein as “Children” or
                                “Child”). We do not knowingly collect or process Personal Information relating to Children. If you become
                                aware that your Child has provided us with Personal Information without your written consent, please
                                contact us at cs@dubizzle.com.eg and we will, upon verification, delete such Personal Information.</p>
                            <p>On our Platform, we define a “Good” as a physical item that Clients either want or possess. On the other
                                hand, a “Service” is intangible, yet still valuable and sought after by Clients, together referred to
                                as “Goods and Services“.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container p-5 d-flex justify-content-between">
                    <Link to={`/`} className="text-dark text-decoration-none">Dubizzle Egypt</Link>
                    <div><TbHexagonLetterZ className="fs-2 me-2" />
                        <span className="text-decoration-underline">Powered by Zendesk</span></div>
                </div>
            </footer>
        </>
    );
}

export default PrivacyAndPolicy;
