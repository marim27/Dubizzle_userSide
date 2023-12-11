import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MdEmail } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import "./Login.css";
import LoginByFacebook from "./LoginByFacebook/LoginByFacebook";
import LoginByGoogle from "./LoginByGoogle/LoginByGoogle";
import axiosInstanceUser from "../../axiosConfig/DubizzleDB";
import { bcrypt } from 'bcryptjs';
import { AuthContext } from "../../Context/auth";
import { IDContext } from "../../Context/IDContext";
import { useNavigate } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate()
  let [login, setLogin] = useState(true);
  let [email, setEmail] = useState("");
  // let [disable, setDisable] = useState(false);
  let [showEnterEmail, setShowEnterEmail] = useState(false);
  let [showLoginPassword, setShowLoginPassword] = useState(false);
  let [showRegisterPassword, setShowRegisterPassword] = useState(false);
  let [showEnd, setShowEnd] = useState(false);
  let [activate, setActivate] = useState(false);
  let [loginUser, setLoginUser] = useState({});
  const [userInf, setUserInf] = useState({
    email: '',
    logInPassword: '',
    confirmPassword: '',
    registerPassword: ''
  })
  const [userErr, setUserErr] = useState({
    emailErr: '',
    logInPasswordErr: '',
    confirmPasswordErr: '',
    registerPasswordErr: ''
  })
  let emailRegx = /[a-z0-9]{2,}@[a-z]{5,}(\.)[a-z]+/
  const passwordRegx = /^[0-9a-zA-Z]{6,}$/
  const loginForm = (eve) => {
    switch (eve.target.name) {
      case 'email':
        setUserInf({ ...userInf, email: eve.target.value })
        setEmail(eve.target.value)
        getUserByemail(eve.target.value)
        setUserErr({ ...userErr, emailErr: (emailRegx.test(eve.target.value) == false) } ||
          { ...userErr, emailErr: (eve.target.value.length == 0) })
        break;
      case 'logInPassword':
        setUserInf({ ...userInf, logInPassword: eve.target.value })
        setUserErr({ ...userErr, logInPasswordErr: (eve.target.value === '') ? "Plesse, Enter Your Password" : "" })
        break;
      case 'registerPassword':
        setUserInf({ ...userInf, registerPassword: eve.target.value })
        setUserErr({ ...userErr, registerPasswordErr: (eve.target.value === '') || (passwordRegx.test(eve.target.value) == false) })
        break;
      case 'confirmPassword':
        setUserInf({ ...userInf, confirmPassword: eve.target.value })
        setUserErr({ ...userErr, confirmPasswordErr: (eve.target.value === userInf.registerPassword) ? "" : "Passwords don't match" })
        break;
      default:
        return;
    }
  }
  // console.log(user);

  const getUserByemail = async (Email) => {
    try {
      let finsUserEmail = await axiosInstanceUser.get(`/users/email?email=${Email}`);
      setLoginUser(finsUserEmail.data);
      // console.log(finsUserEmail.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkOldPassword = async () => {
    if (userInf.password) {
      try {
        let isMatch = await bcrypt.compare(userInf.password, loginUser.password);
        // console.log(user.password, loginUser.password);
        console.log(isMatch);
        return isMatch;
      } catch (error) {
        // console.log(error);

        // console.log('error' + false);
        return false;
      }
    } else {
      return true
    }
  }

  const { user, setUser } = useContext(IDContext);
  const { Islogged, setIslogged } = useContext(AuthContext);
  const handelSubmit = async (eve) => {
    eve.preventDefault();
    if (loginUser.email) {
      await checkOldPassword()
      axiosInstanceUser.post(`users/login`, { email: userInf.email, password: userInf.logInPassword })
        .then((res) => {
          if (res.data.user.userStatus == 'accept') {
            setUser({ _id: loginUser._id, username: loginUser.username, email: loginUser.email });
            setIslogged(true);
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate('/')
          }
          console.log(res.data.user.userStatus);
          setShowLoginPassword(false);
          setActivate(true)
          // console.log(res.data);
        })
        .catch((err) => {
          setUserErr({ ...userErr, logInPasswordErr: "Invalid credentials." })
          //  console.log("Invalid credentials.");
          console.error(err);
        });
    } else if (loginUser.email == undefined) {
      axiosInstanceUser.post(`/users/register`, { email: userInf.email, password: userInf.registerPassword })
        .then((res) => {
          // if (res.data.userStatus == 'accept') {
          //   setUser({ _id: loginUser._id, username: loginUser.username, email: loginUser.email });
          //   setIslogged(true);
          //   localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          //   localStorage.setItem("token", JSON.stringify(res.data.token));
          //   // console.log(res.data.userStatus);
          // }
          // setLogin(false);
          // setShowEnterEmail(false);
          setShowRegisterPassword(false)
          // setShowLoginPassword(false);
          setShowEnd(true)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  // console.log(user);
  const enterEmail = () => {
    setLogin(false);
    setShowEnterEmail(true);
  };

  const deleteRegisterUser = async () => {
    let finsUserByEmail = await axiosInstanceUser.get(`/users/email?email=${userInf.email}`);
    console.log(finsUserByEmail.data._id);
    axiosInstanceUser.delete(`users/${finsUserByEmail.data._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLogin(false);
    setShowEnterEmail(true);
    setShowRegisterPassword(false)
    setShowLoginPassword(false);
    setShowEnd(false)
  };

  const enterPassword = () => {
    setLogin(false);
    setShowEnterEmail(false);
    if (loginUser.email) {
      setShowRegisterPassword(false)
      setShowLoginPassword(true);
    } else if (loginUser.message) {
      setShowLoginPassword(false);
      setShowRegisterPassword(true)
    }
  };

  const goBack = () => {
    setLogin(true);
    setShowEnterEmail(false);
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowEnd(false)
    setUserInf('')
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <div className="container ">
        <div className="row text-center ">
          <Modal.Header closeButton className="border-0 fs-5" onClick={goBack}>
            {login ?
              ''
              : showEnd ? '' :
                activate ? '' :
                  <AiOutlineArrowLeft onClick={goBack} className="cursor-pointer fs-3 text-secondary" />
            }
          </Modal.Header>
          <Modal.Body>
            {login && (
              <>
                <img
                  src="https://www.dubizzle.com.eg/assets/brandIconLogin_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                  alt=""
                />
                <h4 className="pt-5 fs-5 fw-bold"> Welcome to Dubizzle</h4>
                <p className="pt-5 fw-bold">
                  The trusted community of buyers and sellers.
                </p>
                <LoginByGoogle />
                <LoginByFacebook />
                <button className="btn-login" onClick={enterEmail}>
                  <MdEmail className="me-2" />
                  Continue with Email
                </button>
                <button className="btn-login">
                  <BsFillTelephoneFill className="me-2" /> Continue with Phone
                </button>
                <p className="sp1 mt-4 mb-0">
                  By continuing, you are accepting
                </p>
                <p className="sp1">
                  <span>Dubizzle Terms</span> of use and{" "}
                  <span>Privacy Policy</span>
                </p>
              </>
            )}
            <form
              method="post"
              onSubmit={(event) => { handelSubmit(event) }}>
              <img
                src="https://www.dubizzle.com.eg/assets/brandIconLogin_noinline.feed3f3b6aa25ca2e3207a2fcdcc0b69.svg"
                alt=""
              />
              {/*to enter user email */}
              {showEnterEmail && (
                <>
                  <h4 className="pt-5 fs-5 fw-bold"> Enter your Email</h4>
                  <input
                    onChange={(e) => loginForm(e)}
                    onBlur={(e) => loginForm(e)}
                    type="email"
                    value={userInf.email} name="email"
                    className={`form-control my-4 py-2 shadow-none${userErr.emailErr ? 'border-danger' : ''}`} placeholder="Email" />
                  <button onClick={enterPassword} className={`form-control fw-bold 
                  ${userErr.emailErr || !userInf.email ? 'text-secondary bg-light cursor-not-allowed' : 'olx-btn cursor-pointer'} `}
                    disabled={userErr.emailErr || !userInf.email ? true : false}>Next</button>
                  <p className="sp1 mt-5">
                    We won't reveal your email to anyone else nor use it to send you spam.
                  </p>
                </>
              )}
              {/*to enter user login password */}
              {showLoginPassword && (
                <>
                  <h4 className="pt-5 fs-5 fw-bold"> Enter your password</h4>
                  <div className="my-3">Welcome back <span className="fw-bold">{email}</span></div>

                  <input onChange={(eve) => { loginForm(eve) }}
                    onBlur={(e) => loginForm(e)}
                    type="password"
                    value={userInf.logInPassword} name="logInPassword"
                    className="form-control mt-4 py-2" placeholder="Password" />
                  <div className="text-small text-danger mb-4">{userErr.logInPasswordErr}</div>
                  <input type="submit" value="Log in"
                    className={`form-control fw-bold shadow-none
                    ${userErr.logInPasswordErr || !userInf.logInPassword ? 'text-secondary bg-light cursor-not-allowed'
                        : 'olx-btn cursor-pointer'} `}
                    disabled={userErr.logInPasswordErr || !userInf.logInPassword ? true : false}
                  />
                  <div className="forgot_password mt-5">FORGOT YOUR PASSWORD?</div>
                </>
              )}
              {/*to enter user register password & confirm Password*/}
              {showRegisterPassword && (
                <>
                  <h6 className="pt-5 fw-bold"> Create a password to log in faster next time</h6>
                  <div className="my-3"><small>You are creating a password for <span className="fw-bold">{email} </span>
                    .This will help you login faster next time</small></div>

                  <input onChange={(eve) => { loginForm(eve) }}
                    onBlur={(e) => loginForm(e)}
                    type="password"
                    value={userInf.registerPassword}
                    name="registerPassword"
                    className={`form-control mt-4 py-2 shadow-none ${userErr.registerPasswordErr ? 'border-danger' : ''}`}
                    placeholder="New Password" />
                  <div className={`text-small text-secondary ${userErr.registerPasswordErr ? 'text-danger' : ''}`}>
                    Use minimum 6 characters, and at least one letter and one number</div>

                  <input onChange={(eve) => { loginForm(eve) }}
                    onBlur={(e) => loginForm(e)}
                    type="password"
                    value={userInf.confirmPassword}
                    name="confirmPassword"
                    className={`form-control mt-4 py-2 shadow-none ${userErr.confirmPasswordErr ? 'border-danger' : ''}`}
                    placeholder="Confirm New Password" />
                  <div className="text-small text-danger mb-4">{userErr.confirmPasswordErr}</div>
                  <input type="submit" value="Log in"
                    className={`form-control fw-bold shadow-none
                    ${userErr.registerPasswordErr || userErr.confirmPasswordErr || !userInf.registerPassword || !userInf.confirmPassword ?
                        'text-secondary bg-light cursor-not-allowed' : 'olx-btn cursor-pointer'} `}
                    disabled={userErr.registerPasswordErr || userErr.confirmPasswordErr
                      || !userInf.registerPassword || !userInf.confirmPassword ? true : false} />

                  <div className="forgot_password mt-5">FORGOT YOUR PASSWORD?</div>
                </>
              )}
            </form>
            {/*Verification email and delete user*/}
            {showEnd && (
              <>
                <h4 className="pt-5 fs-5 fw-bold">Check Your Email</h4>
                <div className="my-3">We sent a register email Verification to </div>
                <span className="fw-bold">{email}</span>
                <FiEdit className="ms-2 fs-4 fw-bold cursor-pointer" onClick={deleteRegisterUser} />
              </>
            )}
            {activate && (
              <>
                <div className="fw-bold my-3">{email}</div>
                <h4 className="pt-5 fs-5 fw-bold">please, Check Your Email To Login</h4>
              </>
            )}
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;