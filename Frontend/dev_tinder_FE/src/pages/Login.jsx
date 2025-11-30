import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';


const Login = () => {

    const [emailId, setEmailId] = React.useState("basil@gmail.com");
    const [password, setPassword] = React.useState("basil@123");
    const [isLoginForm, setIsLoginForm] = React.useState(true);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [gender, setGender] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitform = async () => {
        console.log("Login clicked");
        try {
            const res = await axios.post(BASE_URL + '/login', {
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

    const handleSignup = async () => {
        console.log("Signup clicked");
        try {   
            const res = await axios.post(BASE_URL + '/signup', {
                firstName: firstName,
                lastName: lastName,
                emailId: emailId,
                password: password,
                age: age,
                gender: gender
            }, { withCredentials: true });

            console.log(res);
            dispatch(addUser(res?.data?.data));

            navigate('/profile');
        }
        catch (error) {
            console.error(error);
            alert("Signup Failed");
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="card card-border bg-neutral w-96 my-10">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <label className="form-control w-full max-w-xs my-2 mb-2">
                                    <div className="label">
                                        <span className="label-text py-2">First Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2 mb-2">
                                    <div className="label">
                                        <span className="label-text py-2">Last Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2 mb-2">
                                    <div className="label">
                                        <span className="label-text py-2">Age:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2 mb-2">
                                    <div className="label">
                                        <span className="label-text py-2">Gender:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </>
                        )}
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
                        <button className="btn btn-primary" onClick={isLoginForm ? submitform : handleSignup}>{isLoginForm? "Login" : "Signup"}</button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <p className='text-center' onClick={()=> setIsLoginForm(!isLoginForm)}>{!isLoginForm? "New User? Signup here" : "Existing User? Login here"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login