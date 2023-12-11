import { Link } from "react-router-dom";
import NavLayOut from "../../Components/nav/nav";
import { TbHexagonLetterZ } from "react-icons/tb";
import { Helmet } from "react-helmet";
const TermsOfUse = () => {
    const date = new Date('11/17/2023').toDateString();
    return (
        <>
         <Helmet>
                <title>Terms of Use</title>
            </Helmet>
            <div className="border-bottom">
                <NavLayOut />
                <div className="container p-5">
                    <Link className="olx-color text-decoration-none">Dubizzle Egypt <span className="text-dark">{'>'}
                    </span> Legal & Privacy information
                        <span className="text-dark"> {'>'} </span> Terms of Use</Link>
                    <div className="row mt-5">
                        <div className="col-3">
                            <p className="fw-bold">Articles in this section</p>
                            <p className="olx-color"> What are Terms of Use?</p>
                        </div>
                        <div className="col-7 border-bottom">
                            <h2 className="fw-bold"> What are Terms of Use?</h2>
                            <div className="mt-4 text-secondary"> <small >{date} . Updated</small></div>
                            <div className="fw-bold my-4">1. ACCEPTANCE</div>
                            <p>EMPG Egypt LLC, a limited liability company (company registration number: 94972) with its office at
                                Plot 176, Sector two, 5th settlement, New Cairo, Egypt, and their affiliates and/or branches
                                (hereinafter together "dubizzle") provide a collection of online resources which include classified
                                advertisements and forums (collectively, the "Service") on the website dubizzle.com.eg, related
                                sites and the mobile application of the platform (collectively, the "Website").</p>
                            <p>You hereby understand, acknowledge, and agree that you are solely responsible for the obligation to
                                register with the Egyptian Tax Authority in the event of displaying goods, services and other
                                taxable activities; with tax registration and compliance with the laws of the Egyptian Tax Authority
                                being your personal responsibility without any liability from the dubizzle Egypt website and
                                platform.</p>
                            <p className="my-4">You hereby understand, acknowledge, and agree that the unified tax registration
                                number of the taxpaying entity must be disclosed when advertising goods, services and other taxable
                                activities. This is an essential and mandatory part of the advert, showing the unified tax registration
                                number in the box specified for that end, and providing it in your account settings under Personal
                                Information in order to comply with the framework of Minister of Finance’s Decision No. 345 in 2021
                                to prevent tax evasion. </p>
                            <div className="fw-bold my-4">2. DESCRIPTION OF SERVICE AND CONTENT POLICY </div>
                            <p>1 . 1 . Dubizzle is the next generation of free online classifieds. We act as an online marketplace
                                platform to allow our users who comply with these Terms to offer, sell, and buy products and
                                services listed on the Website. Although you may be able to conduct payment and other transactions
                                through the Website, using third-party vendors, dubizzle is not in any way involved in such
                                transactions. As a result, and as discussed in more detail in these Terms, you hereby acknowledge
                                and agree that dubizzle is not a party to such transactions, has no control over any element of
                                such transactions, and shall have no liability to any party in connection with such transactions.
                                You use the Service and the Website at your own risk.</p>
                            <p>2 . You understand that dubizzle does not control, and is not responsible for ads, directory
                                information, business listings/information, messages between users, including without limitation
                                e-mails sent from outside dubizzle’s domain or other means of electronic communication, whether
                                through the Website or another Third Party Website (defined below) or offerings, comments, user
                                postings, files, images, photos, video, sounds, business listings/information and directory
                                information or any other material made available through the Website and the Service ("Content"),
                                and that by using the Website and the Service, you may be exposed to Content that is offensive,
                                indecent, inaccurate, misleading, or otherwise objectionable. You acknowledge and agree that you
                                are responsible for and must evaluate, and bear all risks associated with, the use of any Content,
                                that you may not rely on said Content, and that under no circumstances will dubizzle be liable
                                in any way for the Content or for any loss or damage of any kind incurred as a result of the
                                browsing, using or reading any Content listed, emailed or otherwise made available via the
                                Service. You acknowledge and agree that dubizzle permits such goods and services to be displayed
                                and offered on the Website that conform with the Terms stated herein, however, dubizzle does
                                not pre-screen or approve any Content, but that dubizzle has the right, in its sole and
                                absolute discretion, to refuse, delete or move any Content that is or may be available
                                through the Service, for violating these Terms and such violation being brought to dubizzle’s
                                knowledge or for any other reason or no reason at all. Furthermore, the Website and Content
                                available through the Website may contain links to other third-party websites ("Third Party
                                Websites"), which are completely unrelated to dubizzle . If you link to Third Party Websites,
                                you may be subject to those Third-Party Websites’ terms and conditions and other policies.
                                dubizzlemakes no representation or guarantee as to the accuracy or authenticity of the
                                information contained in any such Third-Party Website, and your linking to any other
                                websites is completely at your own risk and dubizzle disclaims all liability thereto.</p>
                            <div className="fw-bold my-4">3. FEATURED ADS</div>
                            <p>dubizzle may offer a service known as "Featured Ads" where users may pay a non-refundable fee to have
                                their ads posted in selected locations on the Website, thus potentially increasing an ads'
                                visibility. In order to purchase a Featured Ad, you may be required to transmit certain information
                                through a third-party service provider, including but not limited to a third-party payment service
                                provider, which may be governed by its own terms of use and other policies. dubizzle makes no
                                representation or guarantee as to the safety or security of the information transmitted to any
                                Third-Party service provider, and your linking to any Third-Party service is completely at your
                                own risk, and dubizzle disclaims all liability related thereto.</p>
                            <p>Featured Ads are subject to the Terms listed herein, as well as additional terms of service.</p>
                            <div className="fw-bold my-4">4. CONDUCT</div>
                            <p>You agree not to post, email, host, display, upload, modify, publish, transmit, update or share any
                                information on the Website, or otherwise make available Content:</p>
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

export default TermsOfUse;
