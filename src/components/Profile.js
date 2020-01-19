import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import server from "../config/server";
import DataContext from "../context/data/dataContext";

const Profile = () => {
  //context data
  const dataContext = useContext(DataContext);
  const { profile, profile_loading, profile_error, getProfile } = dataContext;

  //get profile
  useEffect(() => {
    getProfile();
    //eslint-disable-next-line
  }, []);

  const [newpwd, setnewpwd] = useState({
    otp: "",
    pwd: ""
  });
  const { otp, pwd } = newpwd;
  const [isnewpwdModalOpen, togglenewpwdModal] = useState(false);

  const onnewpwdChange = e =>
    setnewpwd({
      ...newpwd,
      [e.target.name]: e.target.value
    });

  const onChangepwd = () => {
    let user = {};
    user.username = localStorage.getItem("user");

    axios
      .post(server + "/otprequest", user)
      .then(() => {
        togglenewpwdModal(!isnewpwdModalOpen);
      })
      .catch(err => console.log(err));
  };

  const submitnewpwd = e => {
    e.preventDefault();

    let userpwd = {};
    userpwd.username = localStorage.getItem("user");
    userpwd.password = pwd;
    userpwd.OTP = otp;

    axios
      .post(server + "/passwordchange", userpwd)
      .then(() => {
        togglenewpwdModal(!isnewpwdModalOpen);
      })
      .catch(err => console.log(err));
  };

  //function for showing achievements
  const Achievements = achievements => {
    if (achievements === undefined || achievements.length === 0) {
      return null;
    }
    return (
      <div className="col-12">
        <div>
          <h3 className="m-accent">Achievements</h3>
          <ol>
            {achievements.map((data, i) => {
              return <li key={i}>{data}</li>;
            })}
          </ol>
        </div>
      </div>
    );
  };

  //this will handle loading
  if (profile_loading) {
    return <Loading />;
  }

  //this will handle errors
  else if (profile_error) {
    console.log(profile_error);
    return <Error />;
  }

  //this will show profile
  return (
    <div className="container">
      <center>
        <h1 className="m-accent">My Profile</h1>
      </center>

      <div className="row justify-content-center m-2 shadow-sm border border-dark">
        <div className="col-12 col-md-6">
          <center>
            <img
              className="card-img rounded-circle top p-1"
              style={{ width: "250px", height: "250px" }}
              src={server + profile.id}
              alt={profile.name}
            />
          </center>
        </div>
        <div className="col-12 col-md-6 p-2">
          <div>
            <p></p>
            <br />
            <p>
              <b>Name: </b>
              {profile.name}
            </p>
            <p>
              <b>RollNo: </b>
              {profile.rollNo}
            </p>
            <p>
              <b>Batch: </b>
              {profile.batch}
            </p>
            <p>
              <b>Email: </b>
              {profile.mailId}
            </p>
            <button className="offset-3 btn btn-success" onClick={onChangepwd}>
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center m-2 shadow-sm border border-dark">
        <div className="col-12 col-md-6 p-2">
          <div>
            <h3 className="m-accent">Student Mentor Details</h3>
            <p>
              <b>Name: </b>
              {profile.studentMentorName}
            </p>
            <p>
              <b>Email: </b>
              {profile.studentMentorMail}
            </p>
            <p>
              <b>Contact No.: </b>
              {profile.studentMentorPhone}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 p-2">
          <div>
            <h3 className="m-accent">Faculty Mentor Details</h3>
            <p>
              <b>Name: </b>
              {profile.facultyMentorName}
            </p>
            <p>
              <b>Email: </b>
              {profile.facultyMentorMail}
            </p>
            <p>
              <b>Contact No.: </b>
              {profile.facultyMentorPhone}
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center m-2 shadow-sm border border-dark">
        {Achievements(profile.achievements)}
      </div>

      <Modal
        isOpen={isnewpwdModalOpen}
        toggle={() => togglenewpwdModal(!isnewpwdModalOpen)}
      >
        <ModalHeader toggle={() => togglenewpwdModal(!isnewpwdModalOpen)}>
          Change Password
        </ModalHeader>
        <ModalBody>
          <center className="h5" style={{ color: "green" }}>
            Check Your Email for OTP
          </center>
          <form onSubmit={submitnewpwd}>
            <div className="form-group row">
              <label className="form-label col-12">OTP</label>
              <div className="col-12">
                <input
                  type="text"
                  required
                  onChange={onnewpwdChange}
                  className="form-control"
                  value={otp}
                  name="otp"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label col-12">New password</label>
              <div className="col-12">
                <input
                  type="text"
                  required
                  onChange={onnewpwdChange}
                  className="form-control"
                  value={pwd}
                  name="pwd"
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => togglenewpwdModal(!isnewpwdModalOpen)}
            >
              Cancel
            </button>{" "}
            &nbsp;
            <button type="submit" className="btn btn-primary pl-4 pr-4">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Profile;
