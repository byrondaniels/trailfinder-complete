import React from 'react';
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { externalImg, status, location, blog, social, user: { name, avatar } } }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <div className='round-img profile-img' style={{
                backgroundImage: `url(${avatar ? avatar : externalImg})`
            }} />
            <h1 className="large">{name} from {location}</h1>
            <p className="lead">{status}</p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {
                    blog && (
                        <a href={blog} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.twitter && (
                        <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.linkedin && (
                        <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.youtube && (
                        <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
            </div>
        </div>
    )
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;