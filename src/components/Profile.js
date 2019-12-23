import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import server from '../config/server';
import { Card } from "react-bootstrap";
import DataContext from '../context/data/dataContext';

const Profile = () => {

  const dataContext = useContext(DataContext);
  const { profile, profile_loading, profile_error, getProfile } = dataContext;

  useEffect(() => {
    getProfile();
    //eslint-disable-next-line
  },[]);

  const Achievements = (achievements) => {
    if (achievements === undefined || achievements.length === 0) {
      return null;
    }
    return (
      <Card className="col-12" >
        <div>
          <b>Achievements</b>
          <ol>
            {achievements.map(data => {
              return <li key={profile._id}>{data}</li>;
            })}
          </ol>
        </div>
      </Card>
    );
  };

  if(profile_loading){
      return <Loading/>
    }

  else if(profile_error){
    console.log(profile_error);
    return <h1>Something goes wrong</h1>
  }

  return(
    <div className="container">
      <center>
        <h1>My Profile</h1>
      </center>

      <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }} >
        <Card className="col-12 col-md-6">
          <center>
            <img
              className="card-img rounded-circle top"
              style={{ width: "250px", height: "300px" }}
              src={server + profile.id}
              alt={profile.name}
            />
          </center>
        </Card>
        <div className="col-10 offset-2 col-md-5 offset-md-1">
          <div>
            <p></p><br />
            <p><b>Name: </b>{profile.name}</p>
            <p><b>RollNo:</b>{profile.rollNo}</p>
            <p><b>Batch:</b>{profile.batch}</p>
            <p><b>Email:</b>{profile.mailId}</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-cente" style={{ border: "1px solid black", margin: "10px", padding: "5px"}}>
        <Card className="col-12 col-md-6">
          <div>
          <h3>Student Mentor Details</h3>
            <p><b>Name:</b>{profile.studentMentorName}</p>
            <p><b>Email:</b>{profile.studentMentorMail}</p>
            <p><b>Contact No.:</b>{profile.studentMentorPhone}</p>
          </div>
        </Card>
        <Card className="col-12 col-md-6">
          <div>
            <h3>Faculty Mentor Details</h3>
            <p><b>Name:</b>{profile.facultyMentorName}</p>
            <p><b>Email:</b>{profile.facultyMentorMail}</p>
            <p><b>Contact No.:</b>{profile.facultyMentorPhone}</p>
          </div>
        </Card>
      </div>

      <div className="row justify-content-center" style={{ border: "1px solid black", margin: "10px", padding: "5px" }}>
        {Achievements(profile.achievements)}
      </div>

    </div>
  );
};

export default Profile;
