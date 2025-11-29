import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';


const Login = () => {

    const [emailId, setEmailId] = React.useState("basil@gmail.com");
    const [password, setPassword] = React.useState("basil@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitform = async () => {
        console.log("Login clicked");
        try {
            const res = await axios.post(BASE_URL+'/login', {
                emailId: emailId,
                password: password
            }, { withCredentials: true }
            );
            console.log(res);
            dispatch(addUser(res.data));
            navigate('/');
            
        } catch (error) {
            console.error(error);
            alert("Login Failed");
        }

    }

    return (
        <div className='flex justify-center'>
            <div className="card card-border bg-neutral w-96 mt-10">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <label className="form-control w-full max-w-xs my-2 mb-2">
                            <div className="label">
                                <span className="label-text py-2">EmailId:</span>
                            </div>
                            <input
                                type="text"
                                value={emailId}
                                onChange={e => setEmailId(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text py-2">Password</span>
                            </div>
                            <input
                                type="text"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                    </div>

                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={submitform}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login