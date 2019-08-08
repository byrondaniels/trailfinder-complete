import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileHikes from './ProfileHikes';
import ProfileCourses from './ProfileCourses';
import { getProfileById } from '../../actions/profile';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <Link to='/profiles' className='btn btn-light'>
                            Back To Profiles
                        </Link>
                        {auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                                <Link to='/edit-profile' className='btn btn-dark'>
                                    Edit Profile
                                </Link>
                            )}
                        <div className='profile-grid my-1'>
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className='profile-exp bg-white p-2'>
                                <h2 className='text-primary'>Hikes</h2>
                                {profile.hikes.length > 0 ? (
                                    <Fragment>
                                        {profile.hikes.map(hikes => (
                                            <ProfileHikes
                                                key={hikes._id}
                                                hikes={hikes}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (<h4>No hikes completed</h4>)}
                            </div>

                            <div className='profile-cor bg-white p-2'>
                                <h2 className='text-primary'>Courses</h2>
                                {profile.courses.length > 0 ? (
                                    <Fragment>
                                        {profile.courses.map(course => (
                                            <ProfileCourses
                                                key={course._id}
                                                course={course}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (<h4>No courses found</h4>)
                                }
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getProfileById }
)(Profile);