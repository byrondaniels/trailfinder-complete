import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ReactStars from 'react-stars'

const ProfileHikingProject = ({ trails }) => {
    return (
        <div className='profile-hiking-project'>
            <h2 className='text-primary my-1'>Hikes on Wish List</h2>
            {trails === null ? (
                <Spinner />
            ) : (
                    trails.map((stringTrail, i) => {
                        const trail = JSON.parse(stringTrail.hikeData);
                        return (
                            <div key={i} className='indiv-hike bg-white p-1 my-1'>
                                <div id='profile-hike-img' style={{
                                    backgroundImage: `url(${trail.imgSmallMed})`
                                }} />
                                <div>
                                    <h4>
                                        <a
                                            href={trail.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        > {trail.name} </a>
                                    </h4>
                                    <p>{trail.summary}</p>
                                </div>
                                <div className="stars">
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        value={trail.stars}
                                        edit={false}
                                        color2={'#ffd700'} />
                                    <span>({trail.starVotes} votes)</span>
                                </div>
                            </div>
                        )
                    })
                )}
        </div>
    );
};

ProfileHikingProject.propTypes = {
    trails: PropTypes.array.isRequired,
};

export default ProfileHikingProject;