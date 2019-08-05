import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileHikes = ({
    hikes: { title, location, to, from, description }
}) => (
        <div>
            <h3 className="text-dark">{"??????"}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
                {!to ? ' Day Trip' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
            </p>
            <p><strong>Position: </strong> {title}</p>
            <p><strong>Location: </strong> {location}</p>
            <p><strong>Description: </strong> {description}</p>
        </div>
    );

ProfileHikes.propTypes = {
    hikes: PropTypes.object.isRequired
};

export default ProfileHikes;