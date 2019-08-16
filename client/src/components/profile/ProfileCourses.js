import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';


const ProfileCourse = ({
    course: { authority, name, category, completedDate, description }
}) => (
        <div>

            <h3 className="text-dark">{authority}</h3>

            <p> <Moment format="YYYY/MM/DD">{moment.utc(completedDate)}</Moment> </p>

            <p><strong>Name: </strong> {name}</p>
            <p><strong>Category: </strong> {category}</p>
            <p><strong>Description: </strong> {description}</p>

        </div>
    );

ProfileCourse.propTypes = {
    course: PropTypes.object.isRequired
};

export default ProfileCourse;