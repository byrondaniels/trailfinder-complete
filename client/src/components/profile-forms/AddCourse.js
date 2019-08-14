import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addCourse } from '../../actions/profile'


const AddCourse = ({ addCourse, history }) => {

    const [formData, setFormData] = useState({
        authority: '',
        name: "",
        category: "",
        completedDate: "",
        description: "",
    })

    const { authority, name, category, completedDate, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="res-width">

            <h1 className="large text-primary">Add Completed Courses</h1>

            <p className="lead">
                <i className="fas fa-map" />
                Add in any hiking, survival or mountaneering courses you have completed
            </p>
            <small>* = required field</small>

            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    addCourse(formData, history)
                }}>
                <div className="form-group">
                    <input
                        type="text"
                        value={authority}
                        onChange={e => onChange(e)}
                        placeholder="* Issuing Authority"
                        name="authority"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        onChange={e => onChange(e)}
                        placeholder="* Course Name"
                        name="name"
                        required
                    />
                </div>

                <div className="form-group">
                    <select name="category" value={category} onChange={e => onChange(e)} placeholder="Category of Course" >
                        <option value='0'>* Select Category of Course</option>
                        <option value='Hiking'>Hiking</option>
                        <option value='Mountaineering'>Mountaineering</option>
                        <option value='Survival'>Survival</option>
                        <option value='Climbing'>Climbing</option>
                        <option value='Photography'>Photography</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <h4>Completed Date</h4>
                    <input
                        type="date"
                        value={completedDate}
                        onChange={e => onChange(e)}
                        name="completedDate"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-primary my-1"
                />
                <Link
                    className="btn btn-light my-1"
                    to="/dashboard">
                    Go Back
                </Link>
            </form>

        </div>
    )
};

AddCourse.propTypes = {
    addCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default connect(null, { addCourse })(withRouter(AddCourse));