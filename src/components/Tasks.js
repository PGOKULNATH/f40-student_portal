import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { Button, Accordion } from "react-bootstrap";
import axios from "axios";
import server from "../config/server";
import DataContext from "../context/data/dataContext";

const Tasks = () => {
  //context data
  const dataContext = useContext(DataContext);
  const { tasks, tasks_loading, tasks_error, getTasks } = dataContext;

  //get all tasks for this student
  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  //function for posting attachment
  const postAttachement = task => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-negative-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">Topic : </b>
              {task.topic}
            </p>
            <p className="float-right p-3 badge badge-light">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>
            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey={task._id} className="col-12 p-2">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group row p-2">
                <b className="font-big text-dark col-12 col-md-2 form-label">
                  Attachment:{" "}
                </b>
                <div className="col-12 col-md-10">
                  <input
                    type="file"
                    className="form-control-file shadow-sm"
                    name="attachment"
                    required
                  />
                </div>
              </div>
              <div className="form-group row p-2">
                <b className="font-big text-dark col-12 col-md-2 form-label">
                  Feedback:{" "}
                </b>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    name="feedback"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <input type="hidden" name="taskType" value={task.taskType} />
              <input type="hidden" name="topic" value={task.topic} />
              <input type="hidden" name="taskId" value={task._id} />
              <div className="row">
                <div className="col-12 col-md-3 offset-md-2">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-primary btn-block"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Accordion.Collapse>
      </div>
    );
  };

  //function that can handle submit event during submission
  const handleSubmit = event => {
    const headers = {
      "Content-Type": "multipart/form-data",
      "X-Access-Token": localStorage.getItem("token")
    };
    event.preventDefault();
    var formData = new FormData(event.target);
    axios
      .post(
        server + "/uploadtask?rollNo=" + localStorage.getItem("user"),
        formData,
        { headers }
      )
      .then(res => console.log(res))
      .then(() =>
        setTimeout(() => {
          getTasks();
        }, 1000)
      );
  };

  //function for showing the attachment that already submited
  const showAttachement = task => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-positive-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">Topic : </b>
              {task.topic}
            </p>
            <p className="float-right badge badge-light p-3">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>
            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey={task._id} className="col-12 p-2 m-2">
          <div className="col-12">
            <form onSubmit={handleSubmitClear}>
              <input type="hidden" name="taskType" value={task.taskType} />
              <input type="hidden" name="topic" value={task.topic} />
              <input type="hidden" name="taskId" value={task._id} />
              <div className="row form-group p-2">
                <div className="col-12 col-md-2">
                  <b className="font-big text-dark">Attachment: </b>
                </div>
                <div className="col-12 col-md-10">
                  <div className="row rounded shadow-sm">
                    <a
                      href={server + task.attachment.url}
                      rel="noopener noreferrer"
                      className="font-big col-10 col-md-11"
                      target="_blank"
                    >
                      {task.attachment.url.slice(7)}
                    </a>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-secondary col-2 col-md-1"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
              <div className="row form-group p-2">
                <div className="col-12 col-md-2">
                  <b className="font-big text-dark">Feedback: </b>
                </div>
                <div className="font-big col-12 col-md-10">
                  {task.attachment.feedback}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-3 offset-md-2 p-2">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-primary btn-block"
                  >
                    Unsubmit
                  </button>
                </div>
                <div className="col-12 col-md-7">
                  <p className="badge badge-warning text-white float-right p-3 font-big">
                    {task.attachment.Score !== null
                      ? task.attachment.Score + "/100"
                      : "Not Graded"}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </Accordion.Collapse>
      </div>
    );
  };

  //function that can handle the unsubmit process
  const handleSubmitClear = event => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Access-Token": localStorage.getItem("token")
    };
    event.preventDefault();
    var formData = new FormData(event.target);
    axios
      .post(
        server +
          "/uploadtask?rollNo=" +
          localStorage.getItem("user") +
          "&clear=true",
        formData,
        { headers }
      )
      .then(res => console.log(res))
      .then(() =>
        setTimeout(() => {
          getTasks();
        }, 3000)
      );
  };

  //will loading during initial
  if (tasks_loading) {
    return <Loading />;
  }

  //any error can be handle by this
  else if (tasks_error) {
    console.log(tasks_error);
    return <Error />;
  }

  //this is will call either show attachment or post attachment functions
  return (
    <Accordion className="container">
      <center>
        <h2>Tasks</h2>
      </center>
      {tasks.map(task =>
        !task.attachment ? postAttachement(task) : showAttachement(task)
      )}
    </Accordion>
  );
};

export default Tasks;
