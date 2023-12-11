import { Container, Row, Form } from "react-bootstrap";
import "./Setting.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/DubizzleDB";
import bcrypt from 'bcryptjs'
function Setting() {
  let [disable, setDisable] = useState(false);
  let [currentPassword, setCurrentPassword] = useState();
  let [newPassword, setNewPassword] = useState();
  let [confirmNewPassword, setConfirmNewPassword] = useState();

  const [errors, setErrors] = useState({
    currentPasswordError: "",
    newPasswordError: "",
    confirmNewPasswordError: "",
  });

  function validation(event) {
    //title
    if (event.target.name === "currentPassword") {
      setCurrentPassword(event.target.value);
      setErrors({
        ...errors,
        currentPasswordError:
          event.target.value.length === 0 ? "This field is Required" : "",
      });
    } else if (event.target.name === "newPassword") {
      setNewPassword(event.target.value);
      setErrors({
        ...errors,
        newPasswordError:
          event.target.value.length === 0
            ? "This field is Required"
            : event.target.value.length >= 8
            ? ""
            : "Use minimum 8 characters",
      });
    } else if (event.target.name === "confirmNewPassword") {
      setConfirmNewPassword(event.target.value);
      setErrors({
        ...errors,
        confirmNewPasswordError:
          event.target.value.length === 0
            ? "This field is Required"
            : event.target.value === newPassword
            ? ""
            : "Passwords don't match",
      });
    }
  }
  // Contact Method
  const [isActive, setIsActive] = useState();
  const [istrack, setTrack] = useState(false);
  let [user, setUser] = useState({});

  const radioActive = (value) => {
    setIsActive(value);
  };

  useEffect(() => {
    axiosInstance.patch(`/users/${user._id}`, {contactMethod: isActive});
  }, [isActive]);

  useEffect(() => {
    console.log(user);
    // axiosInstance.patch(`/users/${user._id}`, user);
  }, []);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      console.log(userInfo._id);
      axiosInstance.get(`/users/${userInfo._id}`).then((res) => {
        console.log(res.data.data.user);
        setUser(res.data.data.user);
        radioActive(res.data.data.user.contactMethod);
      });
    }
  }, []);

  useEffect(()=>{
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if(!hasErrors){
        if(newPassword && confirmNewPassword){
            if(user.password){
                if(currentPassword){
                    setDisable(true);
                }else{
                    setDisable(false); 
                }
            }else{
                setDisable(true);
            }
            
        }else{
            setDisable(false); 
        }
    }else{
        setDisable(false);  
    }
  },[errors, currentPassword, newPassword, confirmNewPassword])

  // edit password 
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try{ 
        let isValid = await checkOldPassword()
        console.log(isValid);
        if(isValid){
            axiosInstance.patch(`/users/${user._id}`, {password: newPassword , confirmPassword: confirmNewPassword}).then((res) => {
                console.log(res.data.data.user);
                // setUser(res.data.data.user);
                // radioActive(res.data.data.user.contactMethod);
                setUser(res.data.data.user);
              });
        
        }else{
            alert("Check your current password");
        }
    }catch(error){
        console.log(error);
    }
    
    // console.log(user.password, currentPassword);
    // if(currentPassword){
    //     axiosInstance.get(`/users/checkPassword`,{currentPassword:currentPassword, password:user.password}).then((res) => {
    //         console.log(res);
    //       });
    // }
    // setUser({ ...user, password: newPassword , confirmPassword: confirmNewPassword});
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  // check old password
  const checkOldPassword = async ()=>{
    if(user.password){
        try{
            let isMatch= await bcrypt.compare(currentPassword, user.password);
            console.log(isMatch);
            console.log(currentPassword, user.password );
            return isMatch;        
        }catch(error){
            console.log(error);
            return false;
        }
    }else{
        return true;
        
    }
  }

  console.log(user.password);

  return (
    <>
      <div className="container d-flex d-flex flex-column justify-content-center">
        <Container className="border mt-5 p-4 rounded edit-profile">
          <h6 className="fw-bold">My ads settings</h6>
          <hr className="my-4" />

          <Form>
            <Row>
              <p className="fs-4 font">Contact Method</p>
              <div
                className={
                  isActive === "Phone Number"
                    ? " radio-btn radio-btn-active mx-2"
                    : "radio-btn mx-2"
                }
                onClick={() => radioActive("Phone Number")}
              >
                <div className="outer">
                  <div className="inner"></div>
                </div>
                <p>Phone Number</p>
              </div>
              <div
                className={
                  isActive === "Dubizzle Chat"
                    ? " radio-btn radio-btn-active mx-2"
                    : "radio-btn mx-2"
                }
                onClick={() => radioActive("Dubizzle Chat")}
              >
                <div className="outer">
                  <div className="inner"></div>
                </div>
                <p>Dubizzle Chat</p>
              </div>
              <div
                className={
                  isActive === "Both"
                    ? " radio-btn radio-btn-active mx-2"
                    : "radio-btn mx-2"
                }
                onClick={() => radioActive("Both")}
              >
                <div className="outer ">
                  <div className="inner"></div>
                </div>
                <p>Both</p>
              </div>
            </Row>
          </Form>
        </Container>
        <Container className="border mt-3 mb-5 p-4 rounded edit-profile">
          <h6 className="fw-bold">Change password</h6>
          <hr className="my-4" />

          <Form onSubmit={handleFormSubmit}>
            <Row className="px-2">
              {user?.password && (
                <div className="my-2 p-0">
                  <input
                    type="password"
                    className={`form-control shadow-none border-3 ${
                      errors.currentPasswordError ? "is-invalid" : ""
                    }`}
                    name="currentPassword"
                    value={currentPassword}
                    placeholder="Current Password"
                    onChange={(e) => validation(e)}
                    onBlur={(e) => validation(e)}
                  />
                  <span className="invalid-feedback text-start">
                    {errors.currentPasswordError}
                  </span>
                </div>
              )}
              <div className="my-2 p-0">
                <input
                  type="password"
                  className={`form-control shadow-none border-3 ${
                    errors.newPasswordError ? "is-invalid" : ""
                  }`}
                  name="newPassword"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => validation(e)}
                  onBlur={(e) => validation(e)}
                />
                
                {!errors.newPasswordError ? (
                  <p className="msg m-0 p-0">Use minimum 8 characters</p>
                ) : (
                  <span className="invalid-feedback text-start">
                    {errors.newPasswordError}
                  </span>
                )}
              </div>
              <div className="my-2 p-0">
                <input
                  type="password"
                  className={`form-control shadow-none border-3 ${
                    errors.confirmNewPasswordError ? "is-invalid" : ""
                  }`}
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  placeholder="Confirm New Password"
                  onChange={(e) => validation(e)}
                  onBlur={(e) => validation(e)}
                />
                <span className="invalid-feedback text-start">
                  {errors.confirmNewPasswordError}
                </span>
              </div>
            </Row>
            <Row className="px-2 mt-2">
              <input
                type="submit"
                value="Change password"
                className={`btn mt-4 ${
                    !disable ? "disable" : "change-pass"
                  }`}
                disabled={!disable}
              />
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Setting;
