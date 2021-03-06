import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';


const ProfileHikes = ({
    hikes: { title, location, toDate, fromDate, description }
}) => (
        <>

            <h3 className="text-dark">{"??????"}</h3>

            <p>
                <Moment format="YYYY/MM/DD">{moment.utc(fromDate)}</Moment> -{' '}
                {!toDate ? ' Day Trip' : <Moment format="YYYY/MM/DD">{moment.utc(toDate)}</Moment>}
            </p>

            <p><strong>Title: </strong> {title}</p>
            <p><strong>Location: </strong> {location}</p>
            <p><strong>Description: </strong> {description}</p>

        </>
    );

ProfileHikes.propTypes = {
    hikes: PropTypes.object.isRequired
};

export default ProfileHikes;