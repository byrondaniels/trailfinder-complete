import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link, Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div id="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">TrailFinder</h1>
                    <p className="lead">
                        Create a profile, share hikes and check out where the best trails are
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                        <Link to="/trails-map" className="btn btn-dark">Explore Trails</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(Landing);