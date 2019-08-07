import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'



<<<<<<< HEAD
const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, location, skills, externalImg } }) => {
    return (
        <div className='profile bg-light'>
            <div className='round-img profile-img-2' style={{
                backgroundImage: `url(${externalImg ? externalImg : avatar})`
            }} />
            <div>
                <h2>{name}</h2>
                <p>{status}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
=======
const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills, externalImg } }) => {
    return (
        <div className='profile bg-light'>
            <img src={externalImg ? externalImg : avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span> at {location}</span>}</p>
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e

                <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>

            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className='fas fa-check' /> {skill}
                    </li>
                ))}


            </ul>
        </div>
    )
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired

}


export default ProfileItem;