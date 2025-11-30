import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
    axios.post(BASE_URL+'/logout', {}, { withCredentials: true })
    .then((res) => {
      if(res.status === 200){
       dispatch(removeUser());
       navigate('/login')
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const editProfile = () => {
    navigate('/profile');
  }

  const gotoConnections = () => {
    navigate('/connections');
  }

  const gotoRequests = () => {
    navigate('/requests');
  }

  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={()=>{navigate('/')}}>👩‍💻Dev Tinder</a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="flex items-center">
            <div>
              <span className="text-white mr-4">Welcome {user.firstName}</span>
            </div>
            <div className="dropdown dropdown-end mx-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between" onClick={editProfile}>
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a onClick={gotoConnections}>Connections</a></li>
                <li><a onClick={gotoRequests}>Requests</a></li>
                <li><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar