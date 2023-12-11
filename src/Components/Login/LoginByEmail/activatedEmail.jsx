import React, { useEffect } from 'react';
import "./activatedEmail.css";
import axiosInstanceUser from "../../../axiosConfig/DubizzleDB";
import { useParams } from 'react-router-dom';
import MyVerticallyCenteredModal from '../Login';
const LoginByEmail = () => {
  let { id } = useParams();
  // console.log(id)

  useEffect(() => {
    const updateduser = async () => {
      let finsUserEmail = await axiosInstanceUser.get(`/users/${id}`);
      // console.log(finsUserEmail.data.data.user.userStatus);
      if (finsUserEmail.data.data.user.userStatus == 'pending') {
        await axiosInstanceUser.patch(`users/activate/${id}`, { userStatus: 'accept' })
          .then((res) => {
            console.log("data updated successfully user Status : ", res.data.updateduser.userStatus);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    updateduser()
  }, []);

  return (
    <div>
      <div className='text-center fs-5 fw-bold activated-email'>
        <div className='text-danger'>Congrats! </div>
        <div className='my-4'>Your Dubizzle account has been successfully activated.</div>

        <div className="d-flex justify-content-center">You can <div className="mx-2 text-danger"><Login /></div> now.</div>
      </div>
    </div>
  );
}



function Login() {
  const [modalShow, setModalShow] = React.useState(false);
  
  return (
    <>
      <button
        className="nav-link active fw-bold fs-5 text-center"
        aria-current="page"
        onClick={() => setModalShow(true)}
      >
        Login
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default LoginByEmail;
