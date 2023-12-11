import { LoginSocialFacebook } from "reactjs-social-login";
import axiosInstance from "../../../axiosConfig/DubizzleDB";

export default function LoginByFacebook() {
  const addUser = (data) => {
    let user = { username: data.name, email: data.email };
    console.log(user);
    localStorage.setItem('token',data.accessToken)
    
    axiosInstance.post(`/users`, user);

  };
  return (
    <>
      <LoginSocialFacebook
        appId="893974459058975"
        autoLoad={false}
        onResolve={(response) => {
          addUser(response.data);
          console.log('.............',response.data);
          console.log(`email is :  ${response.data.email} & name is : ${response.data.name}`);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <button className="btn-login">
          <img src="../../svg/facebook.svg" alt="" className="me-2" />
          Continue with Facebook
        </button>
      </LoginSocialFacebook>
    </>
  );
}
