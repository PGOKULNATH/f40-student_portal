import React, {useContext, useEffect} from 'react';
import Loading from './Loading';
import {Button,Accordion} from 'react-bootstrap';
import axios from 'axios';
import server from '../config/server';
import DataContext from '../context/data/dataContext';

const Tasks = () =>{

    const dataContext = useContext(DataContext);
    const { tasks, tasks_loading, tasks_error, getTasks } = dataContext;

    useEffect(() => {
      getTasks();
      //eslint-disable-next-line
    },[]);

    const checkAttachments = (attachmentArray, taskType, topic) => {

      var obj1 = attachmentArray.filter(task => task.rollNo === localStorage.getItem('user'));

      if(obj1.length){
        var obj = obj1[0];
        return(
          <form onSubmit={handleSubmitClear}>
            <input type="hidden" name="taskType" value={taskType} />
            <input type="hidden" name="topic" value={topic} />
            <div className="row form-group">
              <div className="col-12 col-md-2"><b style={{padding:"25px 0px", margin:'0px',fontSize:'20px', textShadow:'1px 1px gray'}}>Attachment: </b></div>
              <div className="col-12 col-md-10" style={{padding : '0px 25px'}}>
                <div className="row" style={{border:'1px solid gray',borderRadius:'5px'}}>
                  <a href={server + obj.attachmentId} rel="noopener noreferrer" className="col-10 col-md-11" style={{padding:'5px 10px',textDecoration:'none', backgroundColor:'#dbd9d9'}} target="_blank">{obj.attachmentId.slice(7)}</a>
                  <button type="submit" name="submit" className="btn btn-secondary col-2 col-md-1">&times;</button>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-md-2"><b style={{padding:"25px 0px", margin:'0px',fontSize:'20px', textShadow:'1px 1px gray'}}>Feedback: </b></div>
              <div className="col-12 col-md-10" style={{fontSize:'20px'}}>
                {obj.feedback}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3 offset-md-2">
                <button type="submit" name="submit" className="btn btn-primary btn-block">Unsubmit</button>
              </div>
            </div>
          </form>
        );
      }
      else{
        return(
          <form onSubmit={handleSubmit}>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 col-md-2 form-label">Attachment: </label>
              <div className="col-12 col-md-10"><input type="file" style={{border:'1px solid #dedede',padding:'2px'}} className="form-control-file" name="attachment" required/></div>
            </div>
            <div className ="form-group row">
              <label style={{padding:'2px', fontWeight:'bold', fontSize:'20px', textShadow:'1px 1px gray'}} className="col-12 col-md-2 form-label">Feedback: </label>
              <div className="col-12 col-md-10"><input type="text" name="feedback" className="form-control" required/></div>
            </div>
            <input type="hidden" name="taskType" value={taskType} />
            <input type="hidden" name="topic" value={topic} />
            <div className="row">
              <div className="col-12 col-md-3 offset-md-2">
                <button type="submit" name="submit" className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          </form>
        );
      }
    }

    const handleSubmit = (event) => {
      const headers={"Content-Type": "multipart/form-data","X-Access-Token":localStorage.getItem('token')}
      event.preventDefault();
      var formData = new FormData(event.target);
      axios.post(server+'/uploadtask?rollNo='+localStorage.getItem('user'),formData,{headers}).then(res=>console.log(res));
      setTimeout(() => {
        window.location.reload(false);
      }, 3000)
    }

    const handleSubmitClear = (event) => {
      const headers={"Content-Type":"application/x-www-form-urlencoded","X-Access-Token":localStorage.getItem('token')}
      event.preventDefault();
      var formData = new FormData(event.target);
      axios.post(server+'/uploadtask?rollNo='+localStorage.getItem('token')+'&clear=true',formData,{headers}).then(res=>console.log(res));
      setTimeout(() => {
        window.location.reload(false);
      }, 3000)
    }

    if(tasks_loading){
      return <Loading/>
    }

    else if(tasks_error){
      return <h1>Something goes wrong</h1>
    }

    return(
      <Accordion className="container">
        <center><h2>Tasks</h2></center>
      {
        tasks.map(task=>{
          return(
            <div className="row" key={task._id} style={{border:'1px solid #3f99d9',margin:'10px',borderRadius:'5px',boxShadow:'0px 0px 2px 2px #57ebe4'}}>
              <div className="col-12" style={{padding:'0px',margin:'0px'}}>
                <Accordion.Toggle as={Button} className="col-12" eventKey={task._id} style={{fontSize : '20px'}}>
                  <p style={{float:'left'}}><b style={{color:"black"}}>Topic : </b>{task.topic}</p>
                  <p style={{float:'right', padding: '10px 20px'}} className="badge badge-light">{task.taskType[0].toUpperCase() + task.taskType.slice(1)}</p>
                  <p style={{clear: 'both'}}/>
                  <p style={{float:'left'}}><b style={{color:"black"}}>Uploaded at : </b><span style={{color : "#1a4f0d"}}>{task.uploadTime}</span></p>
                  <p style={{float:'right'}}><b style={{color:'black'}}>Deadline : </b><span style={{color : "#87000b"}}>{task.deadline}</span></p>
                </Accordion.Toggle>
              </div>
              <Accordion.Collapse eventKey={task._id} className="col-12" style={{padding:'10px',margin:'5px'}}>
                <div className="col-12">
                {checkAttachments(task.attachments,task.taskType,task.topic)}
                </div>
              </Accordion.Collapse>
            </div>
          );
        })
      }
      </Accordion>
    );
}

export default Tasks;
