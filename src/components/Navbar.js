import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import DataContext from "../context/data/dataContext";

const MyNavbar = () => {
  const userContext = useContext(UserContext);
  const { user, logout } = userContext;

  const dataContext = useContext(DataContext);
  const {
    getEvents,
    getNotifications,
    getProfile,
    getTasks,
    getScore,
    getAssessments,
    getAttendance,
    getCourses
  } = dataContext;

  useEffect(() => {
    getEvents();
    getNotifications();
    getProfile();
    getTasks();
    getScore();
    getAssessments();
    getAttendance();
    getCourses();
    //eslint-disable-next-line
  }, []);

  return (
    <nav className="navbar navbar-dark navbar-expand-md m-primary-bg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <Link className="nav-link " to={"/f40/"}>
            Home
          </Link>
          <Link className="nav-link " to={"/f40/Profile"}>
            Profile
          </Link>
          <Link className="nav-link " to={"/f40/Tasks"}>
            Tasks
          </Link>
          <Link className="nav-link " to={"/f40/Score"}>
            Score
          </Link>
          <Link className="nav-link " to={"/f40/Assessments"}>
            Assessments
          </Link>
          <Link className="nav-link " to={"/f40/Attendance"}>
            Attendance
          </Link>
          <Link className="nav-link " to={"/f40/Courses"}>
            {" "}
            Courses{" "}
          </Link>
        </div>
      </div>
      <span className="navbar-text  mr-2">Hi {user}!</span>
      <Link className="btn btn-danger" to={"/f40/"} onClick={() => logout()}>
        {" "}
        Logout{" "}
      </Link>
    </nav>
  );
};

export default MyNavbar;
