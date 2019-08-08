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
                {``}
                {
                    blog && (
                        <a href={blog} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.twitter && (
                        <a href={`https://www.twitter.com/${social.twitter}`} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={`https://www.facebook.com/${social.facebook}`} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.linkedin && (
                        href={`https://www.linkedin.com/${social.linkedin}`} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.youtube && (
                        href={`https://www.youtube.com/${social.youtube}`} target='_blank' rel='noopener noreferrer'>
                            <i className='fas fa-globe fa-2x' />
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        href={`https://www.instagram.com/${social.instagram}`} target='_blank' rel='noopener noreferrer'>
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