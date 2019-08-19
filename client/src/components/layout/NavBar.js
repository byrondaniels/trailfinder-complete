import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../../actions/auth'


const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks =
        <ul>
            <li>
                <Link to="/trails-map" >
                    <i className='fas fa-globe-americas ' />{' '}
                    <span className="hide-sm">Explore Trails</span>
                </Link>
            </li>
            <li> <Link to="/profiles" >Users</Link> </li>
            <li> <Link to="/posts" >Posts</Link> </li>

            <li>
                <Link to="/dashboard" >
                    <i className='fas fa-user ' />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>

            <li>
                <a href="#!" onClick={logout} >
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>

    const guestLinks =
        <ul>
            <li> <Link to="/trails-map" >Explore Trails</Link> </li>
            <li><Link to="/profiles" >Users</Link></li>
            <li><Link to="/register" >Register</Link></li>
            <li><Link to="/login" >Login</Link></li>
        </ul>


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-hiking" />{" "}
                    <span>TrailFinder</span>
                </Link>
            </h1>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </nav>
    )
};

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, { logout })(NavBar);