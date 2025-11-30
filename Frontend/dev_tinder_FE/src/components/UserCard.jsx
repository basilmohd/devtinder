import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,gender,photoUrl,age,about} = user;

    return (
        <div className="card bg-neutral w-96 shadow-sm">
            <figure className='containImage'>
                <img
                    src={photoUrl}
                    alt="Photo" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <span>{age} {gender}</span>
                <span>{about}</span>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard