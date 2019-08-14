import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

import { deleteCourse } from '../../actions/profile'


const Course = ({ courses, deleteCourse }) => {

  const coursesList = courses.map(item => (
    <tr key={item._id}>
      <td className="hide-sm">{item.name}</td>
      <td>{item.authority}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{moment.utc(item.completedDate)}</Moment>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteCourse(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Courses Completed</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Authority</th>
            <th className="hide-sm">Completed Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{coursesList}</tbody>
      </table>
    </>
  );
};

Course.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default connect(null, { deleteCourse })(Course);