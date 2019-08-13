import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <div className="res-width">
            {loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <h1 className='large text-primary'>Hikers</h1>
                        <p className='lead'> <i className='fab fa-connectdevelop' /> Browse and connect with other hikers</p>
                        <div className='profiles'>
                            {profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : (<h4>No profiles found...</h4>)}
                        </div>
                    </Fragment>
                )}
        </div>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfiles }
)(Profiles); 