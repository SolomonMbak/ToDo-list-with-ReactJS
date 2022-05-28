import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'


function App() {
  
  const [toDo, setToDo] = useState([
    {"id": 1, "title": "Task 1", "status": false},
    {"id": 2, "title": "Task 2", "status": false}
  ]);

  // Temp states
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');


  const addTask = () =>{
      if(newTask) {
        let num =toDo.length + 1;
        let newEntry = { id:num, title:newTask, status:false }
        setToDo([...toDo, newEntry])
        setNewTask('');
      }
  }
  

  const deleteTask = (id) =>{
      let newTask = toDo.filter( task => task.id !== id )
      setToDo(newTask); 
  }


  const markTask = (id) =>{
      let newTask = toDo.map(task => {
          if (task.id === id){
            return({ ...task, status: !task.status })
          }
          return task;
      })
      setToDo(newTask);
  }



  const cancelUpdate = (id) =>{
    setUpdateData('');
  }


  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }


  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className='container App'>
      <br />
        <h2>The todo list</h2>
      <br />


      {/* Update task */}
      {updateData && updateData ? (
          <>
            <div className='row'>
              <div className='col'>
                <input className='form-control form-control-lg' 
                      value={ updateData && updateData.title } 
                      onChange={ (e) => changeTask(e) } />
              </div>
            <div className='col-auto'>
              <button 
                      onClick={updateTask} 
                      className='btn btn-lg btn-warning'
                      > Update Task </button>
              <button 
                      onClick={cancelUpdate}
                      className='btn btn-lg btn-danger mr-20'> Cancel </button>
            </div>
            </div>
          </>
      ) : (
              <>
                <br />
                  {/* Add task */}
                  <div className='row'>
                    <div className='col'>
                      <input
                            value={newTask}
                            onChange={ (e) => setNewTask(e.target.value) }
                            className='form-control form-control-lg'/>
                    </div>
                    <div className='col-auto'>
                      <button 
                              onClick={addTask}
                              className='btn btn-lg btn-success'> Add Task </button>
                    </div> 
                  </div>

              </>
      )}

<br />
<br />

    {toDo && toDo.length ? '' : 'No items in the list.'}

    {toDo && toDo
      .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>

            <div className='col taskBg'>

              <div className={ task.status ? 'done' : '' }>
                  <span className='taskNumbering'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
            </div>

            <div className='iconWrapper'>
                <span title='Task completed'
                      onClick={ (e) => markTask(task.id) } > <FontAwesomeIcon icon={faCircleCheck} /> </span>
                
                { task.status ? null : (
                <span title='Edit'
                      onClick={ () => setUpdateData({ id: task.id, title: task.title, status: task.status ? true : false }) } > <FontAwesomeIcon icon={faPen} /> </span>

                )}
                
                <span title='Delete'  
                      onClick={() => deleteTask(task.id)} > <FontAwesomeIcon icon={faTrashCan} /> </span>
            </div>


            </div>
          </React.Fragment>
        )
      })

    }
    </div>
  );
}

export default App;
