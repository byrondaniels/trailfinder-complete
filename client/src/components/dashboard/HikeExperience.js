import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

import { connect } from 'react-redux';
import { deleteHike } from '../../actions/profile'


const HikeExperience = ({ identifier, hikes, deleteHike }) => {

  const hikeList = hikes.map((hike, index) => (

    <tr key={index}>
      <td>{hike.name}</td>
      <td className="hide-sm">{hike.location}</td>
      <td className="hide-sm">{hike.length}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{moment.utc(hike.from)}</Moment> -{' '}
        {hike.to === null ?
          (' - Day Trip') : (<Moment format="YYYY/MM/DD">{moment.utc(hike.to)}</Moment>)}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteHike(hike._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Hikes {identifier}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Length (km)</th>
            <th className="hide-sm">{identifier} Date(s)</th>
            <th />
          </tr>
        </thead>
        <tbody>{hikeList}</tbody>
      </table>
    </>
  );
};

HikeExperience.propTypes = {
  identifier: PropTypes.string.isRequired,
  hikes: PropTypes.array.isRequired,
  deleteHike: PropTypes.func.isRequired
};

export default connect(null, { deleteHike })(HikeExperience);