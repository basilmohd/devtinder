import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from '../components/UserCard';
import Toast from '../components/Toast';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [age, setAge] = React.useState(user.age);
    const [gender, setGender] = React.useState(user.gender);
    const [about, setAbout] = React.useState(user.about);
    const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl);
    const [error, setError] = React.useState(null);
    const [showToast, setShowToast] = React.useState(false);

    const dispatch = useDispatch();

    const submitform = async () => {
        try {
            console.log("Edit Profile clicked");
            const resp = await axios.patch(BASE_URL + '/profile/update',
                { firstName, lastName, age, gender, about, photoUrl }, { withCredentials: true });
            console.log(resp);
            dispatch(addUser(resp?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
        catch (err) {
            console.error(err);
            setError(err.response.data.message);
        }
    };

    return (
        <>
            {showToast && (
                <Toast message={"Data Saved Successfully"}></Toast>
            )
            }
            <div className='flex justify-center gap-10 mt-10 mb-20'>
                <div className="card card-border bg-neutral w-96 ">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
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
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text py-2">Last Name: </span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text py-2">Photo Url: </span>
                                </div>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={e => setPhotoUrl(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text py-2">Age: </span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text py-2">Gender: </span>
                                </div>
                                <input
                                    type="text"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text py-2">About: </span>
                                </div>
                                <input
                                    type="text"
                                    value={about}
                                    onChange={e => setAbout(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                        </div>
                        <div>
                            <span className='red error'>{error}</span>
                        </div>

                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={submitform}>Update Profile</button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }}></UserCard>
            </div>
        </>
    )
}

export default EditProfile;