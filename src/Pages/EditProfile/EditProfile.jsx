import { Container, Row, Col, Form } from "react-bootstrap";
import { HiOutlineLightBulb } from "react-icons/hi";
import "./EditProfile.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/DubizzleDB";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const [userInfo, setUserInfo] = useState({});
  const [dayOptions, setDayOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const userId = userInfo?._id;
    console.log(userId);

    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1940 + 1 },
      (_, index) => currentYear - index
    );

    setDayOptions(days);
    setMonthOptions(months);
    setYearOptions(years);

    if (userId) {
      axiosInstance
        .get(`/users/${userId}`)
        .then((response) => {
          setUserInfo(response.data.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedDay = e.target.day.value;
    const selectedMonth = e.target.month.value;
    const selectedYear = e.target.year.value;
    const dateOfBirth = `${selectedDay}/${selectedMonth}/${selectedYear}`;
    console.log("Selected Date:", `${selectedDay}/${selectedMonth}/${selectedYear}`);

    const updatedUserData = {
      username: e.target.username.value,
      dateOfBirth: dateOfBirth,
      gender: e.target.gender.value,
      about: e.target.about.value,
      contactInfo: e.target.contactInfo.value,
    };

    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const userId = userInfo?._id;
    console.log(userId);
    if (userId) {
      axiosInstance
        .patch(`/users/${userId}`, updatedUserData)
        .then((response) => {
          console.log("User data updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <Container className="border my-5 p-4 rounded edit-profile">
          <h6 className="fw-bold">Edit profile</h6>
          <hr className="my-4" />

          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={"6"}>
                <Form.Group className="my-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="username" defaultValue={userInfo.username || ""} />
                </Form.Group>
                <Row className="my-2">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Group className="col">
                    <Form.Select name="day" defaultValue={userInfo.dateOfBirth?.split("/")[0] || ""}>
                      <option value="">DD</option>
                      {dayOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Select name="month" defaultValue={userInfo.dateOfBirth?.split("/")[1] || ""}>
                      <option value="">MM</option>
                      {monthOptions.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Select name="year" defaultValue={userInfo.dateOfBirth?.split("/")[2] || ""}>
                      <option value="">YYYY</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Form.Group className="my-2">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" defaultValue={userInfo.gender || "Prefer not say"}>
                    <option value="Prefer not say">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not say">Prefer not say</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="my-2">
                  <Form.Control as="textarea" name="about" rows={3} placeholder="About me(optional)" defaultValue={userInfo.about || ""} />
                </Form.Group>
              </Col>
              <Col md={"5"}>
                <div className="border p-2">
                  <h6 className="fw-bold">
                    <HiOutlineLightBulb className="text-red fs-4" /> Why is it
                    important?
                  </h6>
                  <span>
                    Dubizzle is built on trust. Help other people get to know
                    you. Tell them about the things you like. Share your
                    favorite brands, books, movies, shows, music, food. And you
                    will see the results…
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="fw-bold">Contact information</h6>
            <Row className="my-3">
              <Col md={"6"}>
                <Form.Group>
                  <div className="form-control d-flex align-items-center py-0">
                    <span className="p-1 border-end">+20</span>
                    <input
                      type="number"
                      name="contactInfo"
                      placeholder="Phone number: 1XXXXXXXXX"
                      className="form-control border-0"
                      defaultValue={userInfo.contactInfo || ""}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={"6"}>
                <span className="msg">
                  This is the number for buyers contacts, reminders, and other
                  notifications.
                </span>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={"6"}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="enter your email"
                    value={userInfo.email || ""}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={"6"}>
                <span className="msg">
                  We won't reveal your email to anyone else nor use it to send
                  you spam
                </span>
              </Col>
            </Row>
            <hr className="my-4" />
            <div className="d-flex justify-content-between">
              <a className="text-dark fw-bold" role="button" onClick={() => navigate("/")}>
                Discard
              </a>              
              <input
                type="submit"
                value="Save changes"
                className="btn btn-red"
              />
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default EditProfile;
