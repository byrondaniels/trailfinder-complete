import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addHike } from '../../actions/profile'



const AddHike = ({ addHike, history }) => {

    const [formData, setFormData] = useState({
        location: '',
        name: "",
        length: "",
        fromDate: "",
        toDate: "",
        description: "",
        status: ""
    })

    // const [toDateDisabled, toggleDisabled] = useState(false);

    const { location, name, length, fromDate, toDate, description, status } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        await addHike(formData, history)
    }



    return (
        <Fragment>
            <h1 className="large text-primary"> Add A Hike </h1>
            <p className="lead">
                <i className="fas fa-mountain"></i>
                {" "}Add any hikes you have completed or plan to complete
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" value={name} onChange={e => onChange(e)} placeholder="* Hike Name" name="name" required />
                </div>
                <div className="form-group">
                    <input type="text" value={location} onChange={e => onChange(e)} placeholder="* Location" name="location" required />
                </div>
                <div className="form-group">
                    <input type="number" value={length} onChange={e => onChange(e)} placeholder="* Length (in km)" name="length" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" value={fromDate} onChange={e => onChange(e)} name="fromDate" />
                </div>
                <div className="form-group">
                    <h4>To Date (only if overnight)</h4>
                    <input type="date" value={toDate} onChange={e => onChange(e)} name="toDate"
                        disabled={
                            // toDateDisabled 
                            false ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Hike Description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <select name='status' value={status} onChange={e => onChange(e)}>
                        <option value='0'>* Select Hike Status</option>
                        <option value='Planned'>Planned</option>
                        <option value='Completed'>Completed</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>

        </Fragment>
    )
};

AddHike.propTypes = {
    addHike: PropTypes.func.isRequired
}



export default connect(null, { addHike })(withRouter(AddHike));