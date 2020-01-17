import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
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
    <Navbar bg="primary" expand="md">
      <Navbar.Toggle
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto">
          <Link className="nav-link" style={{ color: "white" }} to={"/f40/"}>
            Home
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Profile"}
            style={{ color: "white" }}
          >
            Profile
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Tasks"}
            style={{ color: "white" }}
          >
            Tasks
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Score"}
            style={{ color: "white" }}
          >
            Score
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Assessments"}
            style={{ color: "white" }}
          >
            Assessments
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Attendance"}
            style={{ color: "white" }}
          >
            Attendance
          </Link>
          <Link
            className="nav-link"
            to={"/f40/Courses"}
            style={{ color: "white" }}
          >
            {" "}
            Courses{" "}
          </Link>
        </Nav>
      </Navbar.Collapse>
      <span className="navbar-text mr-2" style={{ color: "white" }}>
        Hi {user}!
      </span>
      <Link
        className="btn btn-outline-danger"
        to={"/f40/"}
        onClick={() => logout()}
      >
        {" "}
        Logout{" "}
      </Link>
    </Navbar>
  );
};

export default MyNavbar;
