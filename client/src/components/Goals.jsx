import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';

const Goals = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userGoal, setUserGoal] = useState("");
  const [count, setCount] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [editGoalId, setEditGoalId] = useState();
  const [editGoalText, setEditGoalText] = useState("");

  const editHandler = async (list) => {
    setDisplayForm(true);
    setEditGoalId(list._id);
    setEditGoalText(list.goal);
  }

  const goalEditHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`/updategoal/${editGoalId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        goalEdit: editGoalText
      })
    });

    const data = await res.json();
    setCount(count+1);

    if(res.status !== 200) {
      toast.error(data.error, {position: "top-right", autoClose:5000});
    }
    else {
      setDisplayForm(false);
      toast.success(data.message, {position: "top-right", autoClose:5000});
    }
  }

  const deleteHandler = async (list) => {
    const res = await fetch(`/deletegoal/${list._id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    setCount(count+1);

    if(res.status !== 200) {
      toast.error("Error in deleting. Please try again!", {position: "top-right", autoClose:5000});
    }
    else {
      toast.success(data.message, {position: "top-right", autoClose:5000});
    }
  }

  const inputHandler = (e) => {
    setUserGoal(e.target.value);
  }

  const goalHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        goal: userGoal
      })
    });

    const data = await res.json();

    if(res.status === 400 || !data) {
      toast.error(data.error, {position: "top-right", autoClose:5000});
    }
    else {
      toast.success(data.message, {position: "top-right", autoClose:5000});
      setUserGoal("");
    }
  }

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUser(data);

    } catch(err) {
      console.log(err);
      <Spinner />
      navigate('/login');
    }

  }

  useEffect(() => {
    callAboutPage();
  }, [userGoal, count]);
  return (
    <>
      {user ?
      <div className='container mt-5'>
        <ToastContainer />
        <form method="POST">
          <div className='form-group mb-3'>
            <label htmlFor='goal'><i className="zmdi zmdi-plus-circle"></i></label>
            <input
              className='ms-2'
              type='text'
              name='goal'
              value={userGoal}
              onChange={inputHandler}
              autoComplete='off'
              placeholder='Enter your goal'
            />
          </div>

          <div className='form-group'>
            <input type='submit' name='register' className='form-submit mt-3' value='Add Goal' onClick={goalHandler}/>
          </div>
        </form>
        <hr className='mt-5'/>

        <div className='mt-3 mb-4'>
          <h2>{user.name} Goals</h2>
        </div>

        {user.goals.map((item) => (
        <div key={item._id} className='row mb-3'>
          <span className='col-md-6 my-md-0 my-3'>{item.goal}</span>
          <span className='col-md-2 col-2 text-primary' role='button' onClick={() => editHandler(item)}><i className="zmdi zmdi-edit"></i></span>
          <span className='col-md-2 col-2 text-primary' role='button' onClick={() => deleteHandler(item)}><i className="zmdi zmdi-delete"></i></span>
          <hr className='col-md-9 mt-2'/>
        </div>
        ))}

        {displayForm &&
        <>
        <form method="POST" className={displayForm ? 'edit-form col-lg-3' : 'edit-form close'}>
          <h5 className='text-end text-dark close-btn' role='button' onClick={() => {setDisplayForm(false)}}>X</h5>
          <div className='form-group mb-3'>
            <label htmlFor='goalEdit'><i className="zmdi zmdi-plus-circle"></i></label>
            <input
              className='ms-2'
              type='text'
              name='goalEdit'
              value={editGoalText}
              onChange={(e) => {setEditGoalText(e.target.value)}}
              autoComplete='off'
              placeholder='Edit your goal'
            />
          </div>

          <div className='form-group'>
            <input type='submit' name='register' className='form-submit mt-3' value='Edit Goal' onClick={goalEditHandler}/>
          </div>
        </form>
        </>}

      </div> : <Spinner />}
    </>
  )
}

export default Goals;