import React from 'react';
import { Link } from 'react-router-dom';


const DashboardActions = () => (

    <div className="dash-buttons">
        <Link
            to="/edit-profile"
            className="btn btn-light">
            <i className="fas fa-user-circle text-primary" /> Edit Profile</Link>
        <Link
            to="/add-hike"
            className="btn btn-light">
            <i className="fab fa-black-tie text-primary" /> Add Hike</Link>
        <Link
            to="/add-course"
            className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary" /> Add Course</Link>
    </div>

);

export default DashboardActions;